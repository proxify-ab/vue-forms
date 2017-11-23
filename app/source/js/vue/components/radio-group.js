Vue.component('v-radio-group', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' +
    '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' +
    '       <label class="control-label">{{header}}</label>' +
    '   </div>' +
    '   <div :class="[ inline ? \'col-md-9\' : \'col-md-12\', classes]">' +
    '       <slot></slot>' +
    '       <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '   </div>' +
    '   <div class="col-md-12" v-if="errors.has(name)">' +
    '       <span class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '   </div>' +
    '   <div class="col-md-12" is="transition-group" mode="fade">' +
    '       <div v-for="radio in radios" v-if="hasIn(radio)" :key="radio.id" >' +
    '           <slot :name="radio.id"></slot>' +
    '       </div>' +
    '   </div>' +
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
        inlineItems: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        },
        helpText: {
            type: String
        },
        classes: {
            default: 'radio-box-group'
        },

    },
    data() {
        return {
            radios: [],
            selected: {}
        }
    },
    mounted() {
        this.selected = {};
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });
        this.$eventHub.$on(this.name + '_return_validate', this.onReturnValidate);
    },
    methods: {
        onValidate() {
            this.$eventHub.$emit(this.name + '_validate', this.name);
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
        },
        addRadio(radio) {
            this.radios.push(radio);
        },
        setSelected(radio) {
            this.selected = radio;
        },
        hasIn(radio) {
            return this.selected.idSlots && this.selected.idSlots.indexOf(radio.id) > -1;
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});

