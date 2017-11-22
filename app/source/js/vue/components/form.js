Vue.prototype.$eventHub = new Vue();

Vue.component('v-form', {
    template: '<form ref="form" :class="{\'form-inline\':inline, classes}" @submit.prevent="submit"><slot></slot></form>',
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
    },
    mounted() {
        this.$eventHub.$on('form_validate', this.validate);
    },
    methods: {
        validate: function () {
            this.$eventHub.$emit('validate_' + this._uid);
        }
    }
});