Vue.component('v-select-option', {
    template: '<option :value="value">{{label}}</option>',
    props: {
        value: {
            required: true
        },
        label: {
            type: String,
            default: 'label'
        }
    },
    mounted() {

    },
    methods: {}
});