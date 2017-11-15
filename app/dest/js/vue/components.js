'use strict';

Vue.component('v-button', {
    template: '<div class="form-group" :class="classes"><button @click.prevent="clicked" :type="type" :class="classesBtn" :id="id"><slot></slot></button></div>',
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
        clicked: {}
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-check-group', {
    template: '<div class="form-group row">' + '<div class="col-md-3" v-if="header">' + '<label>{{header}}</label>' + '</div>' + '<div class="col-md-9">' + '<slot></slot>' + '</div>' + '</div>',
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
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-check', {
    template: '<div :class="{\'form-group\':single, \'display-inline\':inline, \'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' + '<input v-validate :data-vv-rules="rules" type="checkbox" :name="name" :id="id" :value="value" :checked="checked" v-on:change="updateValue($event.target.checked)">' + '<label :for="id" v-if="label" class="control-label">{{label}}</label>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String
        },
        classes: String,
        label: {
            type: String,
            required: true
        },
        checked: Boolean,
        value: {},
        rules: {
            type: String
        },
        helpText: {
            type: String
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {
        var _this = this;

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
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">\n' + '<div :class="{\'col-md-12\':!inline}">\n' + '              <div :class="{\'row\':!inline}">\n' + '                <div :class="labelCols">\n' + '                  <label v-if="label" class="control-label">{{label}}</label>\n' + '                </div>\n' + '              </div>\n' + '              <div :class="{\'row\':!inline}">\n' + '                <div :class="inputCols">\n' + '                  <input v-validate :data-vv-rules="rules" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @change="updateValue($event.target.value)" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :required="required">' + '                  <span class="help-block" v-if="helpText">{{helpText}}</span>' + '                  <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '                </div>\n' + '              </div>\n' + '            </div>\n' + '          </div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: function validator(value) {
                return ['hidden', 'text', 'number', 'date'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        label: {
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
        }
    },
    mounted: function mounted() {
        var _this = this;

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
    }
});
'use strict';

Vue.component('v-radio-group', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' + '<div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header">' + '<label class="control-label">{{header}}</label>' + '</div>' + '<div :class="[ inline ? \'col-md-9\' : \'col-md-12\' ]">' + '<slot></slot>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '</div>' + '<div class="col-md-12" v-if="errors.has(name)">' + '<span class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>' + '</div>',
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
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
        this.$eventHub.$on(this.name + 'return_validate', this.onReturnValidate);
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
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    }
});
'use strict';

Vue.component('v-radio', {
    template: '<div :class="{\'d-inline\':inline}">' + '<label :for="id" class="radio-box radio-box-inline control-label">' + '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" @change="updateValue($event.target.value)" :class="classes">' + '<slot></slot></label>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '</div>',
    props: {
        id: {},
        classes: {},
        value: {},
        helpText: {
            type: String
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {
        var _this = this;

        this.$eventHub.$on(this.name + '_validate', this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit(_this.name + 'return_validate', newValue, oldValue);
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
            this.$emit('change', value);
        },
        onValidate: function onValidate() {
            this.$validator.validateAll();
        }
    }
});
'use strict';

Vue.component('v-select-option', {
    template: '<option :value="value">{{label}}</option>',
    props: {
        value: {
            required: true
        },
        label: {
            type: String,
            default: 'label'
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-select', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' + '<div :class="[inline? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}}</label></div>' + '<div :class="[inline? \'col-md-9\' : \'col-md-12\']">' + '<select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)"><slot></slot></select>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
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
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });
    },

    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        onValidate: function onValidate() {
            this.$validator.validateAll();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    }
});
'use strict';

Vue.component('v-textarea', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' + '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' + '<label v-if="label" class="control-label">{{label}}</label>' + '</div>' + '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' + '<textarea :rows="rows" v-validate :data-vv-rules="rules" :data-vv-value="value" :id="id" :class="classes" class="form-control" :name="name" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' + '<span class="help-block" v-if="helpText">{{helpText}}</span>' + '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '</div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
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
        label: {
            type: String
        },
        rules: {
            type: String
        },
        rows: {
            default: 5
        },
        helpText: {
            type: String
        }
    },
    mounted: function mounted() {
        var _this = this;

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
    }
});
'use strict';

Vue.component('v-step', {
    template: '<form class="form step" :class="{\'hide\':!active}"><slot></slot></form>',
    props: {
        title: {},
        beforeChange: {},
        validating: {}

    },
    data: function data() {
        return {
            active: false,
            validationError: null,
            checked: false
        };
    },

    computed: {
        shape: function shape() {
            return this.$parent.shape;
        },
        color: function color() {
            return this.$parent.color;
        },
        errorColor: function errorColor() {
            return this.$parent.errorColor;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$parent.addStep(this);

        this.$eventHub.$on('errors-changed', function (newErrors, oldErrors, name) {
            if (oldErrors !== undefined && Array.isArray(oldErrors)) {
                if (oldErrors.length === 0) {} else {
                    oldErrors.forEach(function (error) {
                        _this.errors.remove(error.field);
                    });
                }
            }
            if (newErrors !== undefined && Array.isArray(newErrors)) {
                if (newErrors.length === 0) {
                    _this.errors.remove(name);
                } else {
                    newErrors.forEach(function (error) {
                        if (!_this.errors.has(error.field)) {
                            _this.errors.add(error.field, error.msg, error.rule);
                        }
                    });
                }
            }
        });
    },

    methods: {
        validate: function validate() {
            var _this2 = this;

            this.$eventHub.$emit('validate_' + this._uid);
            setTimeout(function () {
                if (!_this2.errors.any()) {
                    // this.$parent.nextStep();
                }
            }, 100);
        }
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeStep(this);
    }
});
'use strict';

Vue.component('v-steps', {
    name: 'steps',
    template: '<div class="steps">' + '<v-step-nav :width="progress"></v-step-nav>' + '<div class="steps-header"><slot name="header"></slot></div>' + '<div class="steps-content"><slot></slot></div>' + '<div class="steps-btn v-row">' + '<v-button :clicked="prevStep" v-if="!isFirstStep" classes="v-col d-inline" classes-btn="btn btn-default btn-lg">Prev</v-button>' + '<v-button :clicked="nextStep" v-if="!isLastStep" classes="v-col d-inline" classes-btn="btn btn-success btn-lg">Next</v-button>' + '<v-button :clicked="nextStep" v-if="isLastStep" classes="v-col d-inline" classes-btn="btn btn-success btn-lg">Finish</v-button>' + '</div>' + '<div class="steps-footer "><slot name="footer"></slot></div>' + '</div>',
    props: {
        prevButton: {
            type: Boolean,
            default: true
        },
        nextButtonText: {
            type: String,
            default: 'Next'
        },
        backButtonText: {
            type: String,
            default: 'Back'
        },
        finishButtonText: {
            type: String,
            default: 'Finish'
        },
        hideButtons: {
            type: Boolean,
            default: false
        },
        validateOnBack: Boolean,
        /***
         * Applies to text, border and circle
         */
        color: {
            type: String,
            default: '#2EA70A'
        },
        errorColor: {
            type: String,
            default: '#8b0000'
        },
        shape: {
            type: String,
            default: 'circle'
        },
        stepsClasses: {
            type: [String, Array],
            default: ''
        },
        stepSize: {
            type: String,
            default: 'md',
            validator: function validator(value) {
                var acceptedValues = ['xs', 'sm', 'md', 'lg'];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        /**
         * Name of the transition when transition between steps
         * */
        transition: {
            type: String,
            default: ''
        },
        /***
         *
         * Index of the initial step to display
         */
        startIndex: {
            type: Number,
            default: 0,
            validator: function validator(value) {
                return value >= 0;
            }
        }
    },
    data: function data() {
        return {
            activeStepIndex: 0,
            currentPercentage: 0,
            maxStep: 0,
            loading: false,
            steps: []
        };
    },

    computed: {
        slotProps: function slotProps() {
            return {
                nextStep: this.nextStep,
                prevStep: this.prevStep,
                activeStepIndex: this.activeStepIndex,
                isLastStep: this.isLastStep,
                fillButtonStyle: this.fillButtonStyle
            };
        },
        stepCount: function stepCount() {
            return this.steps.length;
        },
        isLastStep: function isLastStep() {
            return this.activeStepIndex === this.stepCount - 1;
        },
        isFirstStep: function isFirstStep() {
            return this.activeStepIndex === 0;
        },
        displayPrevButton: function displayPrevButton() {
            return this.activeStepIndex !== 0 && this.prevButton;
        },
        stepPercentage: function stepPercentage() {
            return 100 / (this.stepCount - 1);
        },
        progress: function progress() {
            var percentage = 0;
            if (this.activeStepIndex >= 0) {
                percentage = this.stepPercentage * this.activeStepIndex;
            } else {
                percentage = this.stepPercentage;
            }
            return percentage;
        },

        activeStep: function activeStep() {
            return this.steps[this.activeStepIndex];
        }
    },
    mounted: function mounted() {
        this.initializeSteps();
    },

    methods: {
        emitStepChange: function emitStepChange(prevIndex, nextIndex) {
            this.$emit('on-change', prevIndex, nextIndex);
            this.$emit('update:startIndex', nextIndex);
        },
        addStep: function addStep(item) {
            var index = this.$slots.default.indexOf(item.$vnode);
            // item.stepId = `t-${item.title.replace(/ /g, '')}${index}`;
            this.steps.splice(index, 0, item);
            // if a step is added before the current one, go to it
            if (index < this.activeStepIndex + 1) {
                this.maxStep = index;
                this.changeStep(this.activeStepIndex + 1, index);
            }
        },
        removeStep: function removeStep(item) {
            var steps = this.steps;
            var index = steps.indexOf(item);
            if (index > -1) {
                // Go one step back if the current step is removed
                if (index === this.activeStepIndex) {
                    this.maxStep = this.activeStepIndex - 1;
                    this.changeStep(this.activeStepIndex, this.activeStepIndex - 1);
                }
                if (index < this.activeStepIndex) {
                    this.maxStep = this.activeStepIndex - 1;
                    this.activeStepIndex = this.activeStepIndex - 1;
                    this.emitStepChange(this.activeStepIndex + 1, this.activeStepIndex);
                }
                steps.splice(index, 1);
            }
        },
        navigateToStep: function navigateToStep(index) {
            var _this = this;

            var validate = index > this.activeStepIndex;
            if (index <= this.maxStep) {
                var cb = function cb() {
                    if (validate && index - _this.activeStepIndex > 1) {
                        // validate all steps recursively until destination index
                        _this.changeStep(_this.activeStepIndex, _this.activeStepIndex + 1);
                        _this.beforeStepChange(_this.activeStepIndex, cb);
                    } else {
                        _this.changeStep(_this.activeStepIndex, index);
                    }
                };
                if (validate) {
                    this.beforeStepChange(this.activeStepIndex, cb);
                } else {
                    this.setValidationError(null);
                    cb();
                }
            }
            return index <= this.maxStep;
        },
        nextStep: function nextStep() {
            var _this2 = this;

            var cb = function cb() {
                if (_this2.activeStepIndex < _this2.stepCount - 1) {
                    _this2.changeStep(_this2.activeStepIndex, _this2.activeStepIndex + 1);
                } else {
                    _this2.$emit('on-complete');
                }
            };
            this.beforeStepChange(this.activeStepIndex, cb);
        },
        prevStep: function prevStep() {
            var _this3 = this;

            var cb = function cb() {
                if (_this3.activeStepIndex > 0) {
                    // this.setValidationError(null);
                    _this3.changeStep(_this3.activeStepIndex, _this3.activeStepIndex - 1);
                }
            };
            if (this.validateOnBack) {
                this.beforeStepChange(this.activeStepIndex, cb);
            } else {
                cb();
            }
        },
        focusNextStep: function focusNextStep() {
            var stepIndex = getFocusedStepIndex(this.steps);
            if (stepIndex !== -1 && stepIndex < this.steps.length - 1) {
                var stepToFocus = this.steps[stepIndex + 1];
                if (stepToFocus.checked) {
                    findElementAndFocus(stepToFocus.stepId);
                }
            }
        },
        focusPrevStep: function focusPrevStep() {
            var stepIndex = getFocusedStepIndex(this.steps);
            if (stepIndex !== -1 && stepIndex > 0) {
                var toFocusId = this.steps[stepIndex - 1].stepId;
                findElementAndFocus(toFocusId);
            }
        },
        setLoading: function setLoading(value) {
            this.loading = value;
            this.$emit('on-loading', value);
        },
        setValidationError: function setValidationError(error) {
            this.activeStep.validationError = error;
            this.$emit('on-error', error);
        },
        validateBeforeChange: function validateBeforeChange(callback) {
            var _this4 = this;

            // this.setValidationError(null);

            if (this.activeStep.validating) {
                this.activeStep.validate();
                setTimeout(function () {
                    if (!_this4.activeStep.errors.any()) {
                        // this.setValidationError(null);
                        callback();
                    }
                }, 100);
            } else {
                callback();
            }
        },
        executeBeforeChange: function executeBeforeChange(validationResult, callback) {
            this.$emit('on-validate', validationResult, this.activeStepIndex);
            if (validationResult) {
                callback();
            } else {
                this.steps[this.activeStepIndex].validationError = 'error';
            }
        },
        beforeStepChange: function beforeStepChange(index, callback) {
            if (this.loading) {
                return;
            }
            var oldStep = this.steps[index];
            if (oldStep && oldStep.validating) {
                // let stepChangeRes = oldStep.beforeChange();
                this.validateBeforeChange(callback);
            } else {
                callback();
            }
        },
        changeStep: function changeStep(oldIndex, newIndex) {
            var emitChangeEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


            var oldStep = this.steps[oldIndex];
            var newStep = this.steps[newIndex];
            if (oldStep) {
                oldStep.active = false;
            }
            if (newStep) {
                newStep.active = true;
            }
            if (emitChangeEvent && this.activeStepIndex !== newIndex) {
                this.emitStepChange(oldIndex, newIndex);
            }
            this.activeStepIndex = newIndex;
            this.activateStepAndCheckStep(this.activeStepIndex);
            return true;
        },
        deactivateSteps: function deactivateSteps() {
            this.steps.forEach(function (step) {
                step.active = false;
            });
        },
        activateStep: function activateStep(index) {
            this.deactivateSteps();
            var step = this.steps[index];
            if (step) {
                step.active = true;
                step.checked = true;
            }
        },
        activateStepAndCheckStep: function activateStepAndCheckStep(index) {
            this.activateStep(index);
            if (index > this.maxStep) {
                this.maxStep = index;
            }
            this.activeStepIndex = index;
        },
        initializeSteps: function initializeSteps() {
            if (this.steps.length > 0 && this.startIndex === 0) {
                this.activateStep(this.activeStepIndex);
            }
            if (this.startIndex < this.steps.length) {
                this.activateStepAndCheckStep(this.startIndex);
            } else {
                window.console.warn('Prop startIndex set to ' + this.startIndex + ' is greater than the number of steps - ' + this.steps.length + '. Make sure that the starting index is less than the number of steps registered');
            }
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