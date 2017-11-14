Vue.component('v-button', {
    template: '<div class="form-group" :class="classes"><button @click.prevent="clicked" :type="type" :class="classesBtn" :id="id"><slot></slot></button></div>',
    props: {
        type: {
            type: String,
            validate: value => {
                return ['button', 'submit'].indexOf(value) > -1;
            },
            default: 'button'
        },
        classes: {},
        classesBtn: {},
        id: {},
        clicked: {}

    },
    mounted() {
    },
    methods: {
    }
});