Vue.component('v-select-option', {
    template: '<option :value="value"><slot></slot></option>',
    props: {
        value: {
            required: true
        }
    },
    mounted() {

    },
    methods: {}
});