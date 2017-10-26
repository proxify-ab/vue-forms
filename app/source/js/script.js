$(function () {

    const config = {
        errorBagName: 'errors', // change if property conflicts
        fieldsBagName: 'fields',
        delay: 0,
        locale: 'en',
        dictionary: null,
        strict: true,
        classes: true,
        classNames: {
            touched: 'touched', // the control has been blurred
            untouched: 'untouched', // the control hasn't been blurred
            valid: 'valid', // model is valid
            invalid: 'invalid', // model is invalid
            pristine: 'pristine', // control has not been interacted with
            dirty: 'dirty' // control has been interacted with
        },
        events: 'input|blur|submit',
        inject: true,
        validity: false,
        aria: true
    };


    Vue.use(VeeValidate, config);

    if ($('#root'))
        new Vue({
            el: '#root',
            data: {
                contacts: [],
                contact: new Contact(),
                age: [20, 21, 22, 23, 24],
                example:{
                    upper: 'Upper',
                    lower: 'Lower',
                    trim: '   trim    ',
                    number: 'number',
                    bool: true,
                    string: 'test',
                    title: 'title',
                    replace: 'abcdefgjklmnoprstqwyz',
                    address: ' Lgh Väg',
                    postalCode: '11111',
                    phoneNumber: '32321231321'
                }
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
                    if (this.isValid() && !this.contact.empty()) {
                        this.contacts.push(this.contact);
                        this.contact = new Contact();
                    }
                },
                reset: function () {
                    this.contact = new Contact();
                    this.$children.map(function (child) {
                        child.$validator.reset();
                    });
                },
                isValid: function () {
                    this.$children.map(function (child) {
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