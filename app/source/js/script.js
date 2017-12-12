$(function () {

    Vue.prototype.$eventHub = new Vue();

    Vue.use(VeeValidate);

    if ($('#root')) {
        new Vue({
            el: '#root',
            data: {
                t1: '',
                t2: '',
                t3: '',
            },
            mounted() {

            },
            methods: {},
        });
    }
});