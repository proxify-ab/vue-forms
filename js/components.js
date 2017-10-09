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

