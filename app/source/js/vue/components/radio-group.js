Vue.component('v-radio-group', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' +
    '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' +
    '       <label :class="[\'control-label\', labelBold?\'text-bold\':\'\']">{{header}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' +
    '   </div>' +
    '   <div :class="[ inline ? \'col-md-9\' : \'col-md-12\', classes]">' +
    '       <slot></slot>' +
    '       <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '   </div>' +
    '   <div class="col-md-12" v-if="errors.has(name)">' +
    '       <span class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '   </div>' +
    '   <div class="col-md-12">' +
    '       <transition-group :name="effect" tag="div" :duration="animateDuration">' +
    '           <div v-for="id in selected.idAlertSlots" :key="id"><slot :name="id+ \'-info\'"></slot></div>' +
    '       </transition-group>' +
    '   </div>' +
    '   <div class="col-md-12">' +
    '       <transition-group :name="effect" tag="div" :duration="animateDuration">' +
    '           <div v-for="id in selected.idSlots" :key="id"><slot :name="id"></slot></div>' +
    '       </transition-group>' +
    '   </div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => {
                return value !== '';
            }
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
        effect: {
            default: 'fadeInDown'
        },
        animateDuration: {
            type: Number,
            default: 500
        },
        popoverIcon: {
            type: String,
            default: 'question-circle'
        },
        popoverTitle: {
            type: String
        },
        popoverContent: {
            type: String
        },
        popoverTrigger: {
            default: 'hover'
        },
        labelBold: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            radios: [],
            selected: {}
        }
    },
    mounted() {
        this.$parent.addElement(this);
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
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeElement(this);
    },
});