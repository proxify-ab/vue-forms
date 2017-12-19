Vue.component('v-button', {
    template: '<div :class="[inForm?\'form-group\':\'\', classes]"><button @click="clicked" :type="type" :class="classesBtn" :id="id"><slot></slot></button></div>',
    props: {
        type: {
            type: String,
            validator: value => {
                return ['button', 'submit'].indexOf(value) > -1;
            },
            default: 'button'
        },
        classes: {},
        classesBtn: {},
        id: {},
        inForm: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
    },
    methods: {
        clicked(){
            this.$emit('on-click');
        }
    }
});