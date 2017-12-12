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
        onValidate: function onValidate() {
            this.$validator.validateAll();
        }
    },
    computed: {
        inline: function inline() {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function single() {
            return this.$parent.$options.name !== 'v-check-group';
        }
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

    methods: {
        updateValue: function updateValue() {
            if (this.day !== '' && this.month !== '' && this.year !== '') {
                var date = moment(this.day + '-' + this.month + '-' + this.year, 'DD-MM-YYYY').format(this.dateFormat);
                this.$emit('input', date);
            }
        },
        onValidate: function onValidate() {
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
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && (fields[name].touched || validateOnCreate) && fields[name].valid}">' + '   <div :class="{\'col-md-12\':!inline}">' + '       <div :class="{\'row\':!inline}" v-if="isLabel">' + '           <div :class="labelCols">' + '               <label class="control-label"><slot></slot>' + '                   <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>' + '               </label>' + '           </div>' + '       </div>' + '       <div :class="{\'row\':!inline}">' + '           <div :class="inputCols">' + '               <div :class="[ btnAddon || leftAddon || rightAddon ? \'input-group\' : \'\']">' + '                   <div class="input-group-addon" v-if="leftAddon">{{leftAddon}}</div>' + '                   <div :class="[\'validation\', \'validation-\'+type]">' + '                       <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @change="updateValue($event.target.value)" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" :required="required" :max="max" :min="min" :length="length">' + '                   </div>' + '                   <div class="input-group-addon" v-if="rightAddon">{{rightAddon}}</div>' + '                   <div class="input-group-btn" v-if="btnAddon">' + '                       <button class="btn btn-secondary" type="button" @click="clickAddons">{{btnAddon}}</button>' + '                   </div>' + '               </div>' + '               <span class="help-block" v-if="helpText">{{helpText}}</span>' + '               <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '           </div>' + '       </div>' + '   </div>' + '</div>',
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
    created: function created() {
        if (this.value !== null) {
            this.$validator.validateAll();
        }
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
        onValidate: function onValidate() {
            this.$validator.validateAll();
        },

        clickAddons: function clickAddons() {
            this.$emit('on-addons', this.value, this.name);
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

Vue.component('v-radio-group', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' + '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' + '       <label :class="[\'control-label\', labelBold?\'text-bold\':\'\']">{{header}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' + '   </div>' + '   <div :class="[ inline ? \'col-md-9\' : \'col-md-12\', classes]">' + '       <slot></slot>' + '       <span class="help-block" v-if="helpText">{{helpText}}</span>' + '   </div>' + '   <div class="col-md-12" v-if="errors.has(name)">' + '       <span class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '   </div>' + '   <div class="col-md-12">' + '       <transition-group :name="effect" tag="div" :duration="animateDuration">' + '           <div v-for="id in selected.idAlertSlots" :key="id"><slot :name="id+ \'-info\'"></slot></div>' + '       </transition-group>' + '   </div>' + '   <div class="col-md-12">' + '       <transition-group :name="effect" tag="div" :duration="animateDuration">' + '           <div v-for="id in selected.idSlots" :key="id"><slot :name="id"></slot></div>' + '       </transition-group>' + '   </div>' + '</div>',
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

    methods: {
        onValidate: function onValidate() {
            this.$eventHub.$emit(this.name + '_validate', this.name);
        },

        onReturnValidate: function onReturnValidate(newErrors, oldErrors) {
            var _this2 = this;

            if (oldErrors !== undefined && Array.isArray(oldErrors)) {
                if (oldErrors.length === 0) {} else {
                    oldErrors.forEach(function (error) {
                        _this2.errors.remove(error.field);
                    });
                }
            }
            if (newErrors !== undefined && Array.isArray(newErrors)) {
                if (newErrors.length === 0) {
                    this.errors.remove(this.name);
                } else {
                    newErrors.forEach(function (error) {
                        if (!_this2.errors.has(error.field)) {
                            _this2.errors.add(error.field, error.msg, error.rule);
                        }
                    });
                }
            }
        },
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
        var _this = this;

        this.$parent.addRadio(this);
        this.$eventHub.$on(this.name + '_validate', this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit(_this.name + '_return_validate', newValue, oldValue);
        });
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
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && ( fields[name].touched || validateOnCreate) && fields[name].valid}">' + '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label></div>' + '       <div :class="[inline ? \'col-md-9\' : selectCols ]">' + '           <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)"><slot></slot></select>' + '           <span class="help-block" v-if="helpText">{{helpText}}</span>' + '           <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '       </div>' + '   </div>' + '</div>',
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
        var _this = this;

        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });

        if (this.value !== null && this.value !== '') {
            this.findByValue(this.value).select();
        }
        // if (this.value !== '') {
        // this.$validator.validateAll();
        // }
    },
    created: function created() {},

    watch: {
        value: function value(newValue, oldValue) {
            if (oldValue) this.findByValue(oldValue).unSelect();
            if (newValue) this.findByValue(newValue).select();
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        onValidate: function onValidate() {
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

Vue.component('v-t-input', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && (fields[name].touched || validateOnCreate) && fields[name].valid}">' + '   <div :class="{\'col-md-12\':!inline}">' + '       <div :class="{\'row\':!inline}" v-if="isLabel">' + '           <div :class="labelCols">' + '               <label class="control-label"><slot></slot>' + '                   <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>' + '               </label>' + '           </div>' + '       </div>' + '       <div :class="{\'row\':!inline}">' + '           <div :class="inputCols">' + '               <div :class="[ btnAddon || leftAddon || rightAddon ? \'input-group\' : \'\']">' + '                   <div class="input-group-addon" v-if="leftAddon">{{leftAddon}}</div>' + '                   <div :class="[\'validation\', \'validation-\'+type]">' + '                       <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @change="updateValue($event.target.value)" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" :required="required" :max="max" :min="min" :length="length">' + '                   </div>' + '                   <div class="input-group-addon" v-if="rightAddon">{{rightAddon}}</div>' + '                   <div class="input-group-btn" v-if="btnAddon">' + '                       <button class="btn btn-secondary" type="button" @click="clickAddons">{{btnAddon}}</button>' + '                   </div>' + '               </div>' + '               <span class="help-block" v-if="helpText">{{helpText}}</span>' + '               <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '           </div>' + '       </div>' + '   </div>' + '</div>',
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
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        // this.$watch(() => this.errors.items, (newValue, oldValue) => {
        //     // this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        //     this.$parent.checkElement(this, this.field[this.name].valid);
        // });

        if (this.value !== null && this.value !== '') {
            this.$validator.validateAll();
        }
    },
    created: function created() {},

    watch: {
        errors: function errors(newValue, oldValue) {
            // console.log(newValue);
            // this.$parent.checkElement(this);
        },
        valid: function valid() {
            this.$parent.checkElement(this, this.valid);
        }
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
        onValidate: function onValidate() {
            this.$validator.validateAll();
        },

        clickAddons: function clickAddons() {
            this.$emit('on-addons', this.value, this.name);
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
        onValidate: function onValidate() {
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
    template: '<div class="step" v-if="active"><slot></slot></div>',
    props: {
        title: {},
        validating: {},
        // nextStep: {
        //     type: Number,
        //     default: null
        // },
        // prevStep: {
        //     type: Number,
        //     default: null
        // },
        skip: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            active: false,
            elements: [],
            checkedElements: []
        };
    },

    computed: {
        progress: function progress() {
            return 100 / this.elements.length * this.checkedElements.length;
        }
    },
    mounted: function mounted() {
        this.$parent.addStep(this);

        this.init();

        // this.$eventHub.$on('errors-changed', (newErrors, oldErrors, name) => {
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
        //             this.errors.remove(name);
        //         } else {
        //             newErrors.forEach(error => {
        //                 if (!this.errors.has(error.field)) {
        //                     this.errors.add(error.field, error.msg, error.rule)
        //                 }
        //             })
        //         }
        //     }
        // })
    },

    watch: {
        progress: function progress(newValue, oldValue) {
            this.$parent.changeProgress(newValue);
        }
    },
    methods: {
        init: function init() {},
        checkElement: function checkElement(element, valid) {
            if (valid) {
                if (this.checkedElements.indexOf(element) === -1) {
                    this.checkedElements.push(element);
                }
            } else {
                if (this.checkedElements.indexOf(element) !== -1) {
                    this.checkedElements.splice(this.checkedElements.indexOf(element), 1);
                }
            }
        },
        validate: function validate() {
            this.elements.some(function (item) {
                item.$validator.validateAll();
                if (item.errors.any()) {
                    $('html, body').animate({
                        scrollTop: $(item.$el).offset().top - 20
                    }, 500);
                    $(item.$el).find('[name]')[0].focus();
                    return true;
                }
            });
        },

        // beforeChange() {
        //     this.$emit('on-before-change');
        // },
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
    template: '<div class="steps container-fluid" :data-index="index">' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-navigation"><div class="steps-navigation-progress"><div class="steps-navigation-progress-bar" :style="`width:${progress}%`"></div></div></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-header"><slot name="header"></slot></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-content"><slot></slot></div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-btn v-row">' + '               <v-button @clicked="prevStep" v-if="!isFirstStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-default"><slot name="prevBtn">{{prevBtnLabel}}</slot></v-button>' + '               <v-button @clicked="nextStep" v-if="!isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="nextBtn">{{nextBtnLabel}}</slot></v-button>' + '               <v-button @clicked="finishStep" v-if="isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="finishBtn">{{finishBtnLabel}}</slot></v-button>' + '           </div>' + '       </div>' + '   </div>' + '   <div class="row">' + '       <div class="col-md-12">' + '           <div class="steps-footer "><slot name="footer"></slot></div>' + '       </div>' + '   </div>' + '</div>',
    props: {
        // validateOnBack: {
        //     type: Boolean,
        //     default: false
        // },
        // transition: {
        //     type: String,
        //     default: ''
        // },
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
        }
    },
    data: function data() {
        return {
            index: 0,
            // maxStep: 0,
            // loading: false,
            steps: [],
            currentStep: {},
            checkedStepsLength: 0
        };
    },

    computed: {
        stepLength: function stepLength() {
            return this.steps.length;
        },
        isLastStep: function isLastStep() {
            return this.index === this.stepLength - 1;
        },
        isFirstStep: function isFirstStep() {
            return this.index === 0;
        },
        stepPercentage: function stepPercentage() {
            return 100 / this.stepLength;
        },
        progress: function progress() {
            return this.stepPercentage * this.currentStep.progress / 100 + this.stepPercentage * this.checkedStepsLength;
            //     let percentage = 0;
            //     if (this.index >= 0) {
            //         percentage = this.stepPercentage * this.index;
            //     } else {
            //         percentage = this.stepPercentage;
            //     }
            //     return percentage;
        }
    },
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            if (this.steps.length > 0) {
                if (this.startIndex !== 0) {
                    this.activateStep(this.startIndex);
                } else {
                    this.activateStep(this.index);
                }
            } else {
                window.console.warn('Prop startIndex set to ' + this.startIndex + ' is greater than the number of steps - ' + this.steps.length + '. Make sure that the starting index is less than the number of steps registered');
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
            this.currentStep.validate();
        },
        prevStep: function prevStep() {},
        finishStep: function finishStep() {
            this.$emit('on-finish');
        },
        activateStep: function activateStep(index) {
            var step = this.steps[index];
            this.currentStep = step;
            step.activate();
        },
        changeProgress: function changeProgress(progress) {}
        // emitStepChange(prevIndex, nextIndex) {
        //     this.$emit('on-change', prevIndex, nextIndex);
        //     this.$emit('update:startIndex', nextIndex);
        // },
        // addStep(item) {
        //     const index = this.$slots.default.indexOf(item.$vnode);
        //     this.steps.splice(index, 0, item);
        //     if (index < this.index + 1) {
        //         this.maxStep = index;
        //         this.changeStep(this.index + 1, index)
        //     }
        // },
        // removeStep(item) {
        //     const steps = this.steps;
        //     const index = steps.indexOf(item);
        //     if (index > -1) {
        //         // Go one step back if the current step is removed
        //         if (index === this.index) {
        //             this.maxStep = this.index - 1;
        //             this.changeStep(this.index, this.index - 1)
        //         }
        //         if (index < this.index) {
        //             this.maxStep = this.index - 1;
        //             this.index = this.index - 1;
        //             this.emitStepChange(this.index + 1, this.index)
        //         }
        //         steps.splice(index, 1)
        //     }
        // },
        // navigateToStep(index) {
        //     let validate = index > this.index;
        //     if (index <= this.maxStep) {
        //         let cb = () => {
        //             if (validate && index - this.index > 1) {
        //                 this.changeStep(this.index, this.index + 1);
        //                 this.beforeStepChange(this.index, cb)
        //             } else {
        //                 this.changeStep(this.index, index)
        //             }
        //         };
        //         if (validate) {
        //             this.beforeStepChange(this.index, cb);
        //         } else {
        //             this.setValidationError(null);
        //             cb();
        //         }
        //     }
        //     return index <= this.maxStep
        // },
        // nextStep() {
        //
        //     let cb = () => {
        //         if (this.index < this.stepCount - 1) {
        //             this.changeStep(this.index, this.activeStep.nextStep ? this.activeStep.nextStep : this.index + 1)
        //         } else {
        //             this.$emit('on-complete');
        //         }
        //     };
        //     this.beforeStepChange(this.index, cb);
        // },
        // prevStep() {
        //     let cb = () => {
        //         if (this.index > 0) {
        //             this.changeStep(this.index, this.activeStep.prevStep ? this.activeStep.prevStep : this.index - 1)
        //         }
        //     };
        //     if (this.validateOnBack) {
        //         this.beforeStepChange(this.index, cb);
        //     } else {
        //         cb()
        //     }
        // },
        // focusNextStep() {
        //     let stepIndex = getFocusedStepIndex(this.steps);
        //     if (stepIndex !== -1 && stepIndex < this.steps.length - 1) {
        //         let stepToFocus = this.steps[stepIndex + 1];
        //         if (stepToFocus.checked) {
        //             findElementAndFocus(stepToFocus.stepId);
        //         }
        //     }
        // },
        // focusPrevStep() {
        //     let stepIndex = getFocusedStepIndex(this.steps);
        //     if (stepIndex !== -1 && stepIndex > 0) {
        //         let toFocusId = this.steps[stepIndex - 1].stepId;
        //         findElementAndFocus(toFocusId);
        //     }
        // },
        // setValidationError(error) {
        //     this.activeStep.validationError = error;
        //     this.$emit('on-error', error)
        // },
        // validateBeforeChange(callback) {
        //
        //     this.activeStep.validate();
        //     setTimeout(() => {
        //         if (!this.activeStep.errors.any()) {
        //             this.steps[this.index].beforeChange();
        //             callback();
        //             $('html, body').animate({scrollTop: '0px'}, 300);
        //         }
        //     }, 100);
        // },
        // executeBeforeChange(validationResult, callback) {
        //     this.$emit('on-validate', validationResult, this.index);
        //     if (validationResult) {
        //         callback()
        //     } else {
        //         this.steps[this.index].validationError = 'error'
        //     }
        // },
        // beforeStepChange(index, callback) {
        //
        //     if (this.loading) {
        //         return;
        //     }
        //     let oldStep = this.steps[index];
        //     if (oldStep && (oldStep.validating || oldStep.nextStep)) {
        //         if (oldStep.validating)
        //             this.validateBeforeChange(callback);
        //     }
        //     else {
        //         this.steps[index].beforeChange();
        //         callback()
        //     }
        // },
        // changeStep(oldIndex, newIndex, emitChangeEvent = true) {
        //
        //     let oldStep = this.steps[oldIndex];
        //     let newStep = this.steps[newIndex];
        //     if (oldStep) {
        //         oldStep.active = false
        //     }
        //     if (newStep) {
        //         newStep.active = true
        //     }
        //     if (emitChangeEvent && this.index !== newIndex) {
        //         this.emitStepChange(oldIndex, newIndex)
        //     }
        //     this.index = newIndex;
        //     this.activateStepAndCheckStep(this.index);
        //     return true
        // },
        // deactivateSteps() {
        //     this.steps.forEach(step => {
        //         step.active = false
        //     })
        // },
        // activateStep(index) {
        //     this.deactivateSteps();
        //     let step = this.steps[index];
        //     if (step) {
        //         step.active = true;
        //         step.checked = true;
        //     }
        // },
        // activateStepAndCheckStep(index) {
        //     this.activateStep(index);
        //     if (index > this.maxStep) {
        //         this.maxStep = index
        //     }
        //     this.index = index
        // },
        // initializeSteps() {
        //     if (this.steps.length > 0 && this.startIndex === 0) {
        //         this.activateStep(this.index)
        //     }
        //     if (this.startIndex < this.steps.length) {
        //         this.activateStepAndCheckStep(this.startIndex)
        //     } else {
        //         window.console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of steps - ${this.steps.length}. Make sure that the starting index is less than the number of steps registered`)
        //     }
        // }

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