$(function () {

    Vue.use(VeeValidate);

    let index = new Vue({
        el: '#root',
        data: {
            users: [],
            user: [],
            obj: {
                hidden: "hide",
                number: 123,
                text: 'text',
                date: '05/12/205',
                file: '',
                email: 'test@test.',
                password: 'pass',
                checkbox: false,
                radio: 'one',
                textarea: ''

            }
        },
        mounted: function () {
            axios.get('https://jsonplaceholder.typicode.com/users?_limit=10')
                .then(response => {
                    this.users = response.data;
                    this.user = this.users[0];
                })
                .catch(response => {
                    console.log(response.data);
                });

        },
        methods: {
            getUser: function (user) {
                this.user = user;
            },
            submit: function () {
                if (this.isValid()) {
                    this.$validator.validateAll();
                    axios.post('https://jsonplaceholder.typicode.com/users', this.user)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(response => {
                            console.log(response.data);
                        });
                }
            },
            isValid: function () {
                for (let i = 0; i < this.$children.length; i++) {
                    if (this.$children[i].$validator.errors.any()) {
                        return false;
                    }
                }
                return true;
            }
        },
    });

});