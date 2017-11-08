Vue.component('v-button', {
    template: '<button @click.prevent="click" :type="type" :class="classes" :id="id">{{value}}</button>',
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
        },
        click: Function,
    },
    mounted() {

    },
    methods: {}
});