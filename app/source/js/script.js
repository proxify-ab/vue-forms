$(function () {

    Vue.prototype.$eventHub = new Vue();

    Vue.use(VeeValidate);

    if ($('#root')) {
        new Vue({
            el: '#root',
            data: {
                t1: 'qwdwqd',
                t2: '',
                t3: '123123',
                t4: '',
                t5: '',
                t6: '',
                t7: '',
                s1: '',
                r1: ''
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