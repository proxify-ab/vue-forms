Vue.component('v-step', {
    template: '<form class="form step" :class="{\'hide\':!active}"><slot></slot></form>',
    props: {
        title: {},
        beforeChange: {},
        validating: {}

    },
    data() {
        return {
            active: false,
            validationError: null,
            checked: false
        }
    },
    computed: {
        shape() {
            return this.$parent.shape
        },
        color() {
            return this.$parent.color
        },
        errorColor() {
            return this.$parent.errorColor
        }
    },
    mounted() {
        this.$parent.addStep(this);

        this.$eventHub.$on('errors-changed', (newErrors, oldErrors, name) => {
            if (oldErrors !== undefined && Array.isArray(oldErrors)) {
                if (oldErrors.length === 0) {
                } else {
                    oldErrors.forEach(error => {
                        this.errors.remove(error.field)
                    })
                }
            }
            if (newErrors !== undefined && Array.isArray(newErrors)) {
                if (newErrors.length === 0) {
                    this.errors.remove(name);
                } else {
                    newErrors.forEach(error => {
                        if (!this.errors.has(error.field)) {
                            this.errors.add(error.field, error.msg, error.rule)
                        }
                    })
                }
            }
        })
    },
    methods: {
        validate: function () {
            this.$eventHub.$emit('validate_' + this._uid);
            setTimeout(()=>{
                if(!this.errors.any()){
                    // this.$parent.nextStep();
                }
            },100);
        }
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeStep(this)
    }
});