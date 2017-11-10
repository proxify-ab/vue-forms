Vue.component('v-check-group', {
    template: '<div class="form-group row">' +
    '<div class="col-md-3" v-if="header">' +
    '<label>{{header}}</label>' +
    '</div>' +
    '<div class="col-md-9">' +
    '<slot></slot>' +
    '</div>' +
    '</div>',
    props: {
        name: {},
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        }
    },
    mounted() {
    },
    methods: {},
});