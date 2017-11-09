Vue.prototype.$eventHub = new Vue();

Vue.component('v-form', {
    template: '<form :class="{\'form-inline\':inline, classes}" @submit.prevent="submit"><slot></slot></form>',
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
        }
    },
    mounted() {
        this.$on('veeValidate', () => {
            this.$eventHub.$emit('validate');
        });
        //Listen on the this.$eventHub for changers to the child components error bag and merge in/remove errors
        this.$eventHub.$on('errors-changed', (newErrors, oldErrors) => {
            newErrors.forEach(error => {
                if (!this.errors.has(error.field)) {
                    this.errors.add(error.field, error.msg)
                }
            });
            if (oldErrors) {
                oldErrors.forEach(error => {
                    this.errors.remove(error.field)
                })
            }
        });
    },
    methods: {}
});