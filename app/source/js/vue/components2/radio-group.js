Vue.component('v-radio-group', {
    template: '<div class="form-group row">' +
    '<div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' +
    '<label>{{header}}</label>' +
    '</div>' +
    '<div :class="[ inline ? \'col-md-9\' : \'col-md-12\' ]">' +
    '<slot></slot>' +
    '</div>' +
    '<div class="col-md-12">' +
    '<span v-if="errors.has(name)" class="small text-danger">{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        }
    },
    mounted() {
        this.$eventHub.$on('validate', this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });
        this.$eventHub.$on(this.name + 'return_validate', this.onReturnValidate);
    },
    methods: {
        onValidate() {
            this.$eventHub.$emit(this.name + 'validate', this.name);
        },
        onReturnValidate: function (newErrors, oldErrors) {
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
                    this.errors.remove(this.name);
                } else {
                    newErrors.forEach(error => {
                        if (!this.errors.has(error.field)) {
                            this.errors.add(error.field, error.msg, error.rule)
                        }
                    })
                }
            }
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});