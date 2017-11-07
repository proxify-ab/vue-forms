Vue.component('select-option-box', {
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