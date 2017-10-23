Vue.component('inputtext', {
    props: [
        'code',
    ],
    template: '<input type="text" class="form-control" :value="code" @input="updateCode($event.target.value)">',
    methods: {
        updateCode(code) {

            // sanitize
            // validation

            this.$emit('input', code);
        }
    }
});

Vue.component('devinput', {
    props: ['type','value', 'dev'],
    template: '<input :type="type" :value="value" :dev="dev">',
});