Vue.component('button-box', {
    template: '<button :type="type" @click.prevent="click">{{value}}</button>',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        value: {
            type: String,
            require: true
        },
        click: {
            type: Function,
            default: function () {
                alert('Click');
            }
        }
    },
    methods: {},
    computed: {}
});