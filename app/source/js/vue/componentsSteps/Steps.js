Vue.component('v-steps', {
    template: '<div class="steps" :data-index="activeStepIndex">' +
    '<v-step-nav :width="progress"></v-step-nav>' +
    '<div class="steps-header"><slot name="header"></slot></div>' +
    '<div class="steps-content"><slot></slot></div>' +
    '<div class="steps-btn v-row" v-if="showNavBtn">' +
    '<v-button @clicked="prevStep" v-if="!isFirstStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-default"><slot name="prevBtn">{{prevLabel}}</slot></v-button>' +
    '<v-button @clicked="nextStep" v-if="!isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="nextBtn">{{nextLabel}}</slot></v-button>' +
    '<v-button @clicked="nextStep" v-if="isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="finishBtn">{{finishLabel}}</slot></v-button>' +
    '</div>' +
    '<div class="steps-footer "><slot name="footer"></slot></div>' +
    '</div>',
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
        validateOnBack: {
            type: Boolean,
            default: false
        },
        stepsClasses: {
            type: [String, Array],
            default: ''
        },
        transition: {
            type: String,
            default: ''
        },
        startIndex: {
            type: Number,
            default: 0,
            validator: (value) => {
                return value >= 0
            }
        },
        showNavBtn: {
            type: Boolean,
            default: true
        },
        prevLabel: {
            default: 'Previous'
        },
        nextLabel: {
            default: 'Next'
        },
        finishLabel: {
            default: 'Finish'
        }
    },
    data() {
        return {
            activeStepIndex: 0,
            currentPercentage: 0,
            maxStep: 0,
            loading: false,
            steps: []
        };
    },
    computed: {
        slotProps() {
            return {
                nextStep: this.nextStep,
                prevStep: this.prevStep,
                activeStepIndex: this.activeStepIndex,
                isLastStep: this.isLastStep,
                fillButtonStyle: this.fillButtonStyle
            }
        },
        stepCount() {
            return this.steps.length;
        },
        isLastStep() {
            return this.activeStepIndex === this.stepCount - 1;
        },
        isFirstStep() {
            return this.activeStepIndex === 0;
        },
        displayPrevButton() {
            return (this.activeStepIndex !== 0) && (this.prevButton);
        },
        stepPercentage() {
            return (100 / (this.stepCount - 1));
        },
        progress() {
            let percentage = 0;
            if (this.activeStepIndex >= 0) {
                percentage = this.stepPercentage * this.activeStepIndex;
            } else {
                percentage = this.stepPercentage;
            }
            return percentage;
        },
        activeStep: function () {
            return this.steps[this.activeStepIndex];
        }
    },
    mounted() {
        this.initializeSteps();
    },
    methods: {
        emitStepChange(prevIndex, nextIndex) {
            this.$emit('on-change', prevIndex, nextIndex);
            this.$emit('update:startIndex', nextIndex);
        },
        addStep(item) {
            const index = this.$slots.default.indexOf(item.$vnode);
            this.steps.splice(index, 0, item);
            if (index < this.activeStepIndex + 1) {
                this.maxStep = index;
                this.changeStep(this.activeStepIndex + 1, index)
            }
        },
        removeStep(item) {
            const steps = this.steps;
            const index = steps.indexOf(item);
            if (index > -1) {
                // Go one step back if the current step is removed
                if (index === this.activeStepIndex) {
                    this.maxStep = this.activeStepIndex - 1;
                    this.changeStep(this.activeStepIndex, this.activeStepIndex - 1)
                }
                if (index < this.activeStepIndex) {
                    this.maxStep = this.activeStepIndex - 1;
                    this.activeStepIndex = this.activeStepIndex - 1;
                    this.emitStepChange(this.activeStepIndex + 1, this.activeStepIndex)
                }
                steps.splice(index, 1)
            }
        },
        navigateToStep(index) {
            let validate = index > this.activeStepIndex;
            if (index <= this.maxStep) {
                let cb = () => {
                    if (validate && index - this.activeStepIndex > 1) {
                        this.changeStep(this.activeStepIndex, this.activeStepIndex + 1);
                        this.beforeStepChange(this.activeStepIndex, cb)
                    } else {
                        this.changeStep(this.activeStepIndex, index)
                    }
                };
                if (validate) {
                    this.beforeStepChange(this.activeStepIndex, cb);
                } else {
                    this.setValidationError(null);
                    cb();
                }
            }
            return index <= this.maxStep
        },
        nextStep() {

            let cb = () => {
                if (this.activeStepIndex < this.stepCount - 1) {
                    this.changeStep(this.activeStepIndex, this.activeStep.nextStep ? this.activeStep.nextStep : this.activeStepIndex + 1)
                } else {
                    this.$emit('on-complete');
                }
            };
            this.beforeStepChange(this.activeStepIndex, cb);
        },
        prevStep() {
            let cb = () => {
                if (this.activeStepIndex > 0) {
                    this.changeStep(this.activeStepIndex, this.activeStep.prevStep ? this.activeStep.prevStep : this.activeStepIndex - 1)
                }
            };
            if (this.validateOnBack) {
                this.beforeStepChange(this.activeStepIndex, cb);
            } else {
                cb()
            }
        },
        focusNextStep() {
            let stepIndex = getFocusedStepIndex(this.steps);
            if (stepIndex !== -1 && stepIndex < this.steps.length - 1) {
                let stepToFocus = this.steps[stepIndex + 1];
                if (stepToFocus.checked) {
                    findElementAndFocus(stepToFocus.stepId);
                }
            }
        },
        focusPrevStep() {
            let stepIndex = getFocusedStepIndex(this.steps);
            if (stepIndex !== -1 && stepIndex > 0) {
                let toFocusId = this.steps[stepIndex - 1].stepId;
                findElementAndFocus(toFocusId);
            }
        },
        setLoading(value) {
            this.loading = value;
            this.$emit('on-loading', value)
        },
        setValidationError(error) {
            this.activeStep.validationError = error;
            this.$emit('on-error', error)
        },
        validateBeforeChange(callback) {

            this.activeStep.validate();
            setTimeout(() => {
                if (!this.activeStep.errors.any()) {
                    this.steps[this.activeStepIndex].beforeChange();
                    callback();
                    $('html, body').animate({scrollTop: '0px'}, 300);
                }
            }, 100);
        },
        executeBeforeChange(validationResult, callback) {
            this.$emit('on-validate', validationResult, this.activeStepIndex);
            if (validationResult) {
                callback()
            } else {
                this.steps[this.activeStepIndex].validationError = 'error'
            }
        },
        beforeStepChange(index, callback) {

            if (this.loading) {
                return;
            }
            let oldStep = this.steps[index];
            if (oldStep && (oldStep.validating || oldStep.nextStep)) {
                if (oldStep.validating)
                    this.validateBeforeChange(callback);
            }
            else {
                this.steps[index].beforeChange();
                callback()
            }
        },
        changeStep(oldIndex, newIndex, emitChangeEvent = true) {

            let oldStep = this.steps[oldIndex];
            let newStep = this.steps[newIndex];
            if (oldStep) {
                oldStep.active = false
            }
            if (newStep) {
                newStep.active = true
            }
            if (emitChangeEvent && this.activeStepIndex !== newIndex) {
                this.emitStepChange(oldIndex, newIndex)
            }
            this.activeStepIndex = newIndex;
            this.activateStepAndCheckStep(this.activeStepIndex);
            return true
        },
        deactivateSteps() {
            this.steps.forEach(step => {
                step.active = false
            })
        },
        activateStep(index) {
            this.deactivateSteps();
            let step = this.steps[index];
            if (step) {
                step.active = true;
                step.checked = true;
            }
        },
        activateStepAndCheckStep(index) {
            this.activateStep(index);
            if (index > this.maxStep) {
                this.maxStep = index
            }
            this.activeStepIndex = index
        },
        initializeSteps() {
            if (this.steps.length > 0 && this.startIndex === 0) {
                this.activateStep(this.activeStepIndex)
            }
            if (this.startIndex < this.steps.length) {
                this.activateStepAndCheckStep(this.startIndex)
            } else {
                window.console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of steps - ${this.steps.length}. Make sure that the starting index is less than the number of steps registered`)
            }
        }
    }
});