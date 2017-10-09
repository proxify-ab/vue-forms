Vue.component('inputtext', {
    props: [
        'code',
    ],
    template: `
        <input type="text" class="form-control" :value="firstName" @input="updateCode($event.target.value)">      
     `,
    methods: {
        updateCode(code) {

            // sanitize
            // validation

            this.$emit('input', code);
        }
    }
});

