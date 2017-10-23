'use strict';

import gulp from 'gulp';
import jade from 'gulp-jade';
import stylus from 'gulp-stylus';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
// import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

const application = {
    app: './app/source',
    sourceJS: './app/source/js',
    sourceCss: './app/source/css',
    sourceImg: './app/source/img',
    sourceFonts: './app/source/fonts/*.*',
    bowerSrc: './bower_components',
    nodeSrc: './node_modules',
    dest: './app/dest',
    destJS: './app/dest/js/',
    destCSS: './app/dest/css/',
    destImg: './app/dest/img/',
    destFonts: './app/dest/fonts/'
};

let jadeFiles = [
    application.app + '/**/*.jade'
];

//Jade
gulp.task('jade', function () {
    return gulp.src(jadeFiles)
        .pipe(jade({
            pretty: false
        })) // pip to jade plugin
        .pipe(gulp.dest(application.dest))
        .pipe(connect.reload());
});

let stylusFiles = [
    application.app + '/stylus/main.styl'];

//compile & minify Stylus to source/css
gulp.task('stylus', function () {
    gulp.src(stylusFiles)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true,
            'include css': true
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.destCSS))
        .pipe(connect.reload());
});

let copyJSLib = [
    application.bowerSrc + '/jquery/dist/jquery.min.js',
    application.bowerSrc + '/bootstrap/dist/js/bootstrap.min.js',
    application.nodeSrc + '/vue/dist/vue.js',
    application.nodeSrc + '/vee-validate/dist/vee-validate.min.js',
    application.nodeSrc + '/axios/dist/axios.js',
];

//concat js files
gulp.task('jsLib', function () {
    return gulp.src(copyJSLib)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.destJS))
        .pipe(connect.reload());
});

let copyJSSource = [
    './app/source/js/**/*.js'
];

//concat js files
gulp.task('jsSrc', function () {
    return gulp.src(copyJSSource)
        .pipe(sourcemaps.write('.'))
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(application.destJS))
        .pipe(connect.reload());
});

//img minify
// gulp.task('imageMinify', function () {
//     gulp.src(application.sourceImg + '/**')
//         .pipe(imagemin({
//             progressive: true,
//             optimizationLevel: 7
//         }))
//         .pipe(gulp.dest(application.destImg))
//         .pipe(connect.reload());
// });

let fonts = [
    application.sourceFonts,
    application.bowerSrc + '/font-awesome/fonts/*.*'
];

gulp.task('fonts', function () {
    gulp.src(fonts)
        .pipe(gulp.dest(application.destFonts))
        .pipe(connect.reload());
});

gulp.task('json', function () {
    gulp.src(application.app + '/phones/*.json')
        .pipe(gulp.dest(application.dest + '/phones/'))
        .pipe(connect.reload());
});

//clean dest dir
gulp.task('clean', function () {
    return gulp.src(application.dest, {read: false})
        .pipe(rimraf());
});

//server
gulp.task('connectDev', function () {
    connect.server({
        root: [application.dest],
        port: 3000,
        livereload: true
    });
});


//watch
gulp.task('watch', function () {
    gulp.watch(jadeFiles, ['jade']);
    gulp.watch(application.app + '/stylus/**/*.styl', ['stylus']);
    gulp.watch(application.sourceImg + '/**', ['imageMinify']);
    gulp.watch(application.sourceJS + '/**/*.js', ['jsSrc']);
});

gulp.task('default', ['jade', 'stylus', 'jsLib', 'jsSrc', 'json', 'connectDev', 'watch', 'fonts']);
gulp.task('prod', ['clean']);
