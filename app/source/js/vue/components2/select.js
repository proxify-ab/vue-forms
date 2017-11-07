Vue.component('select-box', {
    template: '<select :name="name" :id="id" :class="classes" class="form-control"><slot></slot></select>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {},
        id: {},
        classes: {}
    },
    mounted() {

    },
    methods: {}
});