$(function () {

    Vue.use(VeeValidate);

    new Vue({
        el: '#root',
        data: {
            contacts: [],
            contact: new Contact(),
            age: [20, 21, 22, 23, 24],
        },
        mounted() {
            this.contacts = [
                new Contact('iuhwef', 'wefwef', 'm', 20),
                new Contact('efwg', 'fweg', 'f', 22),
                new Contact('iuhwef', 'hrth', 'm', 24),
                new Contact('gerrhe', 'rehewrg', 'f', 21),
                new Contact('sdgsgtwe', 'wegwe', 'f', 22),
            ];
        },
        methods: {
            getContact: function (contact) {
                this.contact = contact;
            },
            addContact() {
                if (this.isValid() && this.contact.empty()) {
                    this.contacts.push(this.contact);
                    this.contact = new Contact();
                }
            },
            reset: function () {
                this.contact = new Contact();
            },
            isValid: function () {
                return this.$children.map(function (child) {
                    child.$validator.validateAll()
                        .then(response => {
                            return response;
                        })
                        .catch(response => {
                            return response;
                        });
                });
            }
        },
    });

});