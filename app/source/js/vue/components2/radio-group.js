Vue.component('radio-group-box', {
    template: '<div class="form-group"><slot></slot></div>',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    mounted() {

    },
    methods: {}
});