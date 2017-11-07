Vue.component('button-box', {
    template: '<button :type="type" :class="classes" :id="id">{{value}}</button>',
    props: {
        type: {
            type: String,
            validate: value => {
                return ['button', 'submit'].indexOf(value) > -1;
            },
            required: true
        },
        classes: {},
        id: {},
        value:{
            type: String
        }
    },
    mounted() {

    },
    methods: {}
});