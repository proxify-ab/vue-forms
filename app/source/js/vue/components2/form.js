Vue.prototype.$eventHub = new Vue();

Vue.component('v-form', {
    template: '<form :ref="customRef" :class="{\'form-inline\':inline, classes}" @submit.prevent="submit"><slot></slot></form>',
    props: {
        inline: {
            type: Boolean,
            default: false
        },
        classes: {
            type: String
        },
        submit: {
            type: Function
        },
        customRef:{
            type: String,
            default: 'form'
        }
    },
    mounted() {},
    methods: {
        validate: function () {
            this.$emit('val');
        }
    }
});