'use strict';

Vue.component('v-button', {
    template: '<div :class="[inForm?\'form-group\':\'\', classes]"><button @click.prevent="clicked" :type="type" :class="classesBtn" :id="id"><slot></slot></button></div>',
    props: {
        type: {
            type: String,
            validate: function validate(value) {
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
    mounted: function mounted() {},

    methods: {
        clicked: function clicked() {
            this.$emit('clicked');
        }
    }
});
'use strict';

Vue.component('v-check-group', {
    template: '<div class="form-group row">' + '<div :class="[inline ? \'col-md-12\' : \'col-md-3\']" v-if="header">' + '<label>{{header}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverLabel">{{popoverLabel}}</i></label>' + '</div>' + '<div :class="[inline ? \'col-md-9\' : \'col-md-9\']">' + '<slot></slot>' + '</div>' + '</div>',
    props: {
        name: {},
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
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
        popoverLabel: {
            type: String
        }
    },
    mounted: function mounted() {
        this.$parent.addElement(this);
    },

    methods: {},
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

Vue.component('v-check', {
    template: '<div class="checkbox" :class="{\'form-group\':single, \'display-inline\':inline, \'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' + '   <label :for="id" class="control-label">' + '       <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" type="checkbox" :name="name" :id="id" :value="value" @change="updateValue($event.target.checked)"><slot></slot>' + '       <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>' + '   </label>' + '   <span class="help-block" v-if="helpText">{{helpText}}</span>' + '   <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
                return value !== '';
            }
        },
        id: {
            type: String
        },
        classes: String,
        value: {},
        rules: {
            type: String
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'change'
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
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {
        var _this = this;

        if (typeof this.$parent.addElement === 'function') this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
    },

    methods: {
        updateValue: function updateValue(value) {
            this.$emit('change', value);
        },
        validate: function validate() {
            this.$validator.validateAll();
        }
    },
    computed: {
        inline: function inline() {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function single() {
            return this.$parent.$options.name !== 'v-check-group';
        },
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },
    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    },
    destroyed: function destroyed() {
        if (typeof this.$parent.removeElement === 'function') {
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
            this.$parent.removeElement(this);
        }
    }
});
'use strict';

Vue.component('v-date-picker', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].valid   }">' + '   <div :class="{\'col-md-12\':!inline}">' + '       <div :class="{\'row\':!inline}">' + '           <div :class="labelCols">' + '               <label v-if="label" class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' + '           </div>' + '       </div>' + '       <div :class="{\'row\':!inline}">' + '           <div :class="[inputCols , \'form-inline\']">' + '               <select :class="classes" class="d-inline day form-control" @change="updateValue" v-model="day" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' + '                   <option value>{{dayLabel}}</option>' + '                   <option v-for="day in days" :value="day">{{day}}</option>' + '               </select>' + '               <select :class="classes" class="d-inline month form-control" @change="updateValue" v-model="month" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' + '                   <option value>{{monthLabel}}</option>' + '                   <option v-for="(month, index) in months" :value="index +1">{{month}}</option>' + '               </select>' + '               <select :class="classes" class="d-inline year form-control" @change="updateValue" v-model="year" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' + '                   <option value>{{yearLabel}}</option>' + '                   <option v-for="year in years" :value="year">{{year}}</option>' + '               </select>' + '               <input type="hidden" :name="name" :value="value" :id="id">' + '               <span class="help-block" v-if="helpText">{{helpText}}</span>' + '           </div>' + '           <div class="col-md-12"><span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span></div>' + '       </div>' + '   </div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
                return value !== '';
            }
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: String,
            default: 'col-md-12'
        },
        inputCols: {
            type: String,
            default: 'col-md-12'
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'input'
        },
        dayLabel: {
            default: 'Day'
        },
        monthLabel: {
            default: 'Month'
        },
        yearLabel: {
            default: 'Year'
        },
        minYear: {
            type: Number,
            default: 1900
        },
        dateFormat: {
            default: 'DD-MM-YYYY'
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
        }
    },
    computed: {
        days: function days() {
            var count = moment(this.month + '-' + this.year, "MM-YYYY").daysInMonth();
            return Array.apply(0, Array(isNaN(count) ? 31 : count)).map(function (_, i) {
                return ++i;
            });
        },
        months: function months() {
            return Array.apply(0, Array(12)).map(function (_, i) {
                return moment().month(i).format('MMMM');
            });
        },
        years: function years() {
            return Array.apply(0, Array(moment().get('years') - this.minYear + 1)).map(function (_, i) {
                return moment().get('years') - i;
            });
        },
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },
    data: function data() {
        return {
            day: "",
            month: "",
            year: ""
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
    },

    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    methods: {
        updateValue: function updateValue() {
            if (this.day !== '' && this.month !== '' && this.year !== '') {
                var date = moment(this.day + '-' + this.month + '-' + this.year, 'DD-MM-YYYY').format(this.dateFormat);
                this.$emit('input', date);
            }
        },
        validate: function validate() {
            this.$validator.validateAll();
        }
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

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
        }
    },
    mounted: function mounted() {
        this.$eventHub.$on('form_validate', this.validate);
    },

    methods: {
        validate: function validate() {
            this.$eventHub.$emit('validate_' + this._uid);
        }
    }
});
'use strict';

Vue.component('v-input', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && valid}">' + '   <div :class="{\'col-md-12\':!inline}">' + '       <div :class="{\'row\':!inline}" v-if="isLabel">' + '           <div :class="labelCols">' + '               <label class="control-label"><slot></slot>' + '                   <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>' + '               </label>' + '           </div>' + '       </div>' + '       <div :class="{\'row\':!inline}">' + '           <div :class="inputCols">' + '               <div :class="[ btnAddon || leftAddon || rightAddon ? \'input-group\' : \'\']">' + '                   <div class="input-group-addon" v-if="leftAddon">{{leftAddon}}</div>' + '                   <div :class="[\'validation\', \'validation-\'+type]">' + '                       <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @change="updateValue($event.target.value)" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" :required="required" :max="max" :min="min" :length="length">' + '                   </div>' + '                   <div class="input-group-addon" v-if="rightAddon">{{rightAddon}}</div>' + '                   <div class="input-group-btn" v-if="btnAddon">' + '                       <button class="btn btn-secondary" type="button" @click="clickAddons">{{btnAddon}}</button>' + '                   </div>' + '               </div>' + '               <span class="help-block" v-if="helpText">{{helpText}}</span>' + '               <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '           </div>' + '       </div>' + '   </div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
                return value !== '';
            }
        },
        type: {
            type: String,
            validator: function validator(value) {
                return ['hidden', 'text', 'number', 'email', 'tel'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {
            default: null
        },
        placeholder: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        validation: {
            type: String
        },
        rules: {
            type: String
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: String,
            default: 'col-md-12'
        },
        inputCols: {
            type: String,
            default: 'col-md-12'
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'input'
        },
        btnAddon: {
            type: String
        },
        leftAddon: {
            type: String
        },
        rightAddon: {
            type: String
        },
        max: {
            type: Number,
            default: 999
        },
        min: {
            type: Number,
            default: 0
        },
        length: {
            type: Number
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
        validateOnCreate: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isLabel: function isLabel() {
            return this.$slots.default;
        },
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },
    mounted: function mounted() {
        this.$parent.addElement(this);

        if (this.value !== null && this.value !== '') {
            this.$validator.validateAll();
        }
    },
    created: function created() {},

    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    methods: {
        enterKeyPressed: function enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        blur: function blur(value) {
            this.$emit('blur', value);
        },

        clickAddons: function clickAddons() {
            this.$emit('on-addons', this.value, this.name);
        },
        validate: function validate() {
            this.$validator.validateAll();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

Vue.component('v-radio-group', {
    template: '<div class="form-group row" :class="{\'has-error\':!valid && touched, \'has-success\':valid }">' + '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' + '       <label :class="[\'control-label\', labelBold?\'text-bold\':\'\']">{{header}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' + '   </div>' + '   <div :class="[ inline ? \'col-md-9\' : \'col-md-12\', classes]">' + '       <slot></slot>' + '       <span class="help-block" v-if="helpText">{{helpText}}</span>' + '   </div>' + '   <div class="col-md-12" v-if="errors.has(name)">' + '       <span class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '   </div>' + '   <div class="col-md-12">' + '       <transition-group :name="effect" tag="div" :duration="animateDuration">' + '           <div v-for="id in selected.idAlertSlots" :key="id"><slot :name="id+ \'-info\'"></slot></div>' + '       </transition-group>' + '   </div>' + '   <div class="col-md-12">' + '       <transition-group :name="effect" tag="div" :duration="animateDuration">' + '           <div v-for="id in selected.idSlots" :key="id"><slot :name="id"></slot></div>' + '       </transition-group>' + '   </div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
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
    data: function data() {
        return {
            radios: [],
            selected: {}
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.$parent.addElement(this);
        this.selected = {};
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
        this.$eventHub.$on(this.name + '_return_validate', this.onReturnValidate);
    },

    computed: {
        valid: function valid() {
            return this.radios.some(function (radio) {
                return radio.valid;
            });
        },
        touched: function touched() {
            return this.radios.some(function (radio) {
                return radio.fields[radio.name].touched;
            });
        },
        errors: function errors() {
            return this.radios[0].errors;
        }
    },
    methods: {
        validate: function validate() {
            return this.radios.map(function (radio) {
                radio.$validator.validateAll();
            });
            // this.$eventHub.$emit(this.name + '_validate', this.name);
        },

        // onReturnValidate: function (newErrors, oldErrors) {
        //     if (oldErrors !== undefined && Array.isArray(oldErrors)) {
        //         if (oldErrors.length === 0) {
        //         } else {
        //             oldErrors.forEach(error => {
        //                 this.errors.remove(error.field)
        //             })
        //         }
        //     }
        //     if (newErrors !== undefined && Array.isArray(newErrors)) {
        //         if (newErrors.length === 0) {
        //             this.errors.remove(this.name);
        //         } else {
        //             newErrors.forEach(error => {
        //                 if (!this.errors.has(error.field)) {
        //                     this.errors.add(error.field, error.msg, error.rule)
        //                 }
        //             })
        //         }
        //     }
        // },
        addRadio: function addRadio(radio) {
            this.radios.push(radio);
        },
        setSelected: function setSelected(radio) {
            this.selected = radio;
        },
        hasIn: function hasIn(radio) {
            return this.selected.idSlots && this.selected.idSlots.indexOf(radio.id) > -1;
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

Vue.component('v-radio', {
    template: '<div :class="{\'d-inline\':inline}">' + '<label :for="id" class="radio-box radio-box-inline control-label">' + '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" @change="updateValue($event.target.value)" :class="classes">' + '<slot></slot> <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '</div>',
    props: {
        id: {
            type: String
        },
        idSlots: {
            type: Array
        },
        idAlertSlots: {
            type: Array
        },
        classes: {
            type: String
        },
        value: {
            type: [String, Number, Boolean]
        },
        helpText: {
            type: String
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
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {
        this.$parent.addRadio(this);
        // this.$eventHub.$on(this.name + '_validate', this.onValidate);
        // this.$watch(() => this.errors.items, (newValue, oldValue) => {
        // this.$eventHub.$emit(this.name + '_return_validate', newValue, oldValue);
        // })
    },

    computed: {
        name: function name() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : '';
        },
        rules: function rules() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.rules : '';
        },
        inline: function inline() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.inlineItems : false;
        },
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },

    methods: {
        updateValue: function updateValue(value) {
            this.$parent.setSelected(this);
            this.$emit('change', value);
        },
        onValidate: function onValidate() {
            this.$validator.validateAll();
        }
    }
});
'use strict';

Vue.component('v-select-option', {
    template: '<option :value="value" :selected="selected"><slot></slot></option>',
    props: {
        value: {
            required: true
        }
    },
    data: function data() {
        return {
            selected: false
        };
    },
    mounted: function mounted() {
        this.$parent.addOption(this);
    },

    methods: {
        select: function select() {
            this.selected = true;
        },
        unSelect: function unSelect() {
            this.selected = false;
        }
    },
    beforeDestroyed: function beforeDestroyed() {
        this.$parent.removeOption(this);
    }
});
'use strict';

Vue.component('v-select', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && valid}">' + '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label></div>' + '       <div :class="[inline ? \'col-md-9\' : selectCols ]">' + '           <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)"><slot></slot></select>' + '           <span class="help-block" v-if="helpText">{{helpText}}</span>' + '           <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '       </div>' + '   </div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
                return value !== '';
            }
        },
        id: {},
        classes: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        },
        helpText: {
            type: String
        },
        selectCols: {
            default: 'col-md-12'
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
        value: {},
        validateOnCreate: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            options: [],
            selected: {}
        };
    },
    mounted: function mounted() {
        this.$parent.addElement(this);

        if (this.value !== null && this.value !== '') {
            this.findByValue(this.value).select();
            this.updateValue(this.value);
            this.$validator.validateAll();
        }
    },

    computed: {
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },
    created: function created() {},

    watch: {
        value: function value(newValue, oldValue) {
            if (oldValue) this.findByValue(oldValue).unSelect();
            if (newValue) this.findByValue(newValue).select();
        }
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        validate: function validate() {
            this.$validator.validateAll();
        },
        addOption: function addOption(option) {
            this.options.push(option);
        },
        removeOption: function removeOption(option) {
            this.options.push(option);
        },
        findByValue: function findByValue(value) {
            return this.options.find(function (option) {
                return option.value === value;
            });
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

Vue.component('v-textarea', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' + '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' + '<label class="control-label"><slot></slot> <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' + '</div>' + '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' + '<textarea :rows="rows" v-validate :data-vv-rules="rules" :data-vv-value="value" :id="id" :class="classes" class="form-control" :name="name" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
                return value !== '';
            }
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        },
        rows: {
            default: 5
        },
        helpText: {
            type: String
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
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
    },

    computed: {
        valid: function valid() {
            return this.fields[this.name].valid;
        }
    },
    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    methods: {
        enterKeyPressed: function enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        blur: function blur(value) {
            this.$emit('blur', value);
        },
        validate: function validate() {
            this.$validator.validateAll();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate_' + this.$parent._uid, this.onValidate);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
'use strict';

Vue.component('v-step', {
    template: '<div class="step" v-show="active"><slot></slot></div>',
    props: {
        title: {},
        validating: {},
        skip: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            active: false,
            elements: []
        };
    },

    computed: {
        progress: function progress() {
            return 100 / this.elements.length * this.validElementsLength;
        },
        validElementsLength: function validElementsLength() {
            return this.elements.filter(function (item) {
                return item.valid;
            }).length;
        }
    },
    mounted: function mounted() {
        this.$parent.addStep(this);

        this.init();
    },

    watch: {},
    methods: {
        init: function init() {},
        validate: function validate() {
            return !this.elements.some(function (item) {
                item.validate();
                if (!item.valid) {
                    $('html, body').animate({
                        scrollTop: $(item.$el).offset().top - ($(window).height() / 2 - 40)
                    }, 500);
                    $(item.$el).find('[name]')[0].focus();
                    return true;
                }
                return false;
            });
        },
        beforeChange: function beforeChange() {
            this.$emit('on-before');
        },
        addElement: function addElement(element) {
            this.elements.push(element);
        },
        removeElement: function removeElement(element) {
            var elements = this.elements;
            var index = elements.indexOf(element);
            if (index > -1) {
                elements.splice(index, 1);
            }
        },
        activate: function activate() {
            this.active = true;
        },
        deactivate: function deactivate() {
            this.active = false;
        }
    },
    beforeDestroyed: function beforeDestroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeStep(this);
    }
});
'use strict';

Vue.component('v-steps', {
    template: '<div class="steps container-fluid" :data-index="index">' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-navigation"><div class="steps-navigation-progress"><div class="steps-navigation-progress-bar" :style="`width:${progress}%`"></div></div></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-header"><slot name="header"></slot></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-content"><slot></slot></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-btn v-row">' + '               <v-button @clicked="prevStep" v-if="!isFirstStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-default"><slot name="prevBtn">{{prevBtnLabel}}</slot></v-button>' + '               <v-button @clicked="nextStep" v-if="!isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="nextBtn">{{nextBtnLabel}}</slot></v-button>' + '               <v-button @clicked="nextStep" v-if="isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="finishBtn">{{finishBtnLabel}}</slot></v-button>' + '           </div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-footer "><slot name="footer"></slot></div>' + '       </div>' + '   </div>' + '</div>',
    props: {
        startIndex: {
            type: Number,
            default: 0,
            validator: function validator(value) {
                return value >= 0;
            }
        },
        prevBtnLabel: {
            default: 'Previous'
        },
        nextBtnLabel: {
            default: 'Next'
        },
        finishBtnLabel: {
            default: 'Finish'
        },
        validateOnFront: {
            type: Boolean,
            default: true
        },
        validateOnBack: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            index: 0,
            steps: [],
            currentStep: {},
            checkedStepsLength: 0
        };
    },

    computed: {
        stepLength: function stepLength() {
            return this.steps.filter(function (step) {
                return !step.skip;
            }).length;
        },
        skipSteps: function skipSteps() {
            return this.steps.filter(function (step) {
                return step.skip;
            });
        },
        skipInvertSteps: function skipInvertSteps() {
            return this.steps.filter(function (step) {
                return !step.skip;
            });
        },
        isLastStep: function isLastStep() {
            return this.skipInvertSteps.indexOf(this.currentStep) === this.skipInvertSteps.length - 1;
        },
        isFirstStep: function isFirstStep() {
            return this.skipInvertSteps.indexOf(this.currentStep) === 0;
        },
        stepPercentage: function stepPercentage() {
            return 100 / this.stepLength;
        },
        progress: function progress() {
            return this.stepPercentage * this.currentStep.progress / 100 + this.stepPercentage * this.checkedStepsLength;
        }
    },
    mounted: function mounted() {
        this.init();
    },

    watch: {
        index: function index(newValue, oldValue) {
            if (this.steps[oldValue]) {
                this.deactivateStep(oldValue);
            }
            if (this.steps[newValue]) {
                this.activateStep(newValue);
            }
            newValue > oldValue ? this.checkedStepsLength++ : this.checkedStepsLength--;
        }
    },
    methods: {
        init: function init() {
            if (this.steps.length > 0) {

                this.index = this.startIndex;

                if (!this.steps[this.index].skip) {
                    this.activateStep(this.index);
                } else {
                    this.skipStep(this.index);
                }
            } else {
                console.warn('Prop startIndex set to ' + this.startIndex + ' is greater than the number of steps - ' + this.steps.length + '. Make sure that the starting index is less than the number of steps registered');
            }
        },
        addStep: function addStep(step) {
            this.steps.push(step);
        },
        removeStep: function removeStep(step) {
            var index = this.steps.indexOf(step);
            if (index > -1) {
                this.steps.splice(index, 1);
            }
        },
        nextStep: function nextStep() {
            if (this.validateOnFront) {
                if (!this.currentStep.validate()) return false;
            }

            // if (this.currentStep.validate()) {
            if (this.index + 1 < this.steps.length) {
                if (this.steps[this.index + 1].skip) {
                    this.skipStep(this.index);
                } else {
                    this.index++;
                }
            } else {
                this.$emit('on-complete');
            }
            // }
        },
        skipStep: function skipStep(index) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (index + 1 < this.steps.length) {
                if (this.steps[index + 1].skip) {
                    this.skipStep(++index, direction);
                } else {
                    this.index += ++index;
                }
            } else {
                this.$emit('on-complete');
            }
        },
        changeIndex: function changeIndex(index, direction) {
            return direction ? index++ : index--;
        },
        prevStep: function prevStep() {
            if (this.index - 1 >= 0) this.index--;
        },
        finishStep: function finishStep() {
            this.$emit('on-finish');
        },
        activateStep: function activateStep(index) {
            var step = this.steps[index];
            this.currentStep = step;
            step.activate();
        },
        deactivateStep: function deactivateStep(index) {
            this.steps[index].deactivate();
        }
    }
});
'use strict';

Vue.component('v-step-nav', {
    template: '<div class="steps-navigation"><div class="steps-navigation-progress"><div class="steps-navigation-progress-bar" :style="style"></div></div></div>',
    props: {
        width: {
            type: Number,
            default: 0
        }
    },
    mounted: function mounted() {},

    computed: {
        style: function style() {
            return {
                width: this.width + '%'
            };
        }
    },
    methods: {}
});