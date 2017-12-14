$(function () {

    Vue.prototype.$eventHub = new Vue();

    Vue.use(VeeValidate);

    if ($('#root')) {
        new Vue({
            el: '#root',
            data: {
                t1: 'qwdwqd',
                t2: 'qw@qwd.dd',
                t3: '123123',
                t4: 'qwd',
            },
            mounted() {

            },
            methods: {
                complete() {
                    alert('Complete');
                }
            },
        });
    }
});