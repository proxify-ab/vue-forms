Vue.component('v-steps', {
    template:
    '<div class="steps container-fluid" :data-index="index">' +
    '   <div class="row">' +
    '       <div class="col-md-12">' +
    '           <div class="steps-navigation"><div class="steps-navigation-progress"><div class="steps-navigation-progress-bar" :style="`width:${progress}%`"></div></div></div>' +
    '       </div>' +
    '   </div>' +
    '   <div class="row">' +
    '       <div class="col-md-12">' +
    '           <div class="steps-header"><slot name="header"></slot></div>' +
    '       </div>' +
    '   </div>' +
    '   <div class="row">' +
    '       <div class="col-md-12">' +
    '           <div class="steps-content"><slot></slot></div>' +
    '       </div>' +
    '   </div>' +
    '   <div class="row">' +
    '       <div class="col-md-12">' +
    '           <div class="steps-btn v-row">' +
    '               <v-button @clicked="prevStep" v-if="!isFirstStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-default"><slot name="prevBtn">{{prevBtnLabel}}</slot></v-button>' +
    '               <v-button @clicked="nextStep" v-if="!isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="nextBtn">{{nextBtnLabel}}</slot></v-button>' +
    '               <v-button @clicked="nextStep" v-if="isLastStep" :in-form="false" classes="v-col d-inline" classes-btn="btn btn-success"><slot name="finishBtn">{{finishBtnLabel}}</slot></v-button>' +
    '           </div>' +
    '       </div>' +
    '   </div>' +
    '   <div class="row">' +
    '       <div class="col-md-12">' +
    '           <div class="steps-footer "><slot name="footer"></slot></div>' +
    '       </div>' +
    '   </div>' +
    '</div>',
    props: {
        startIndex: {
            type: Number,
            default: 0,
            validator: (value) => {
                return value >= 0
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
        // validateOnBack: {
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            index: 0,
            steps: [],
            currentStep: {},
            checkedStepsLength: 0,
        };
    },
    computed: {
        stepLength() {
            return this.steps.length;
        },
        isLastStep() {
            return this.index === this.stepLength - 1;
        },
        isFirstStep() {
            return this.index === 0;
        },
        stepPercentage() {
            return 100 / this.stepLength;
        },
        progress() {
            return (this.stepPercentage * this.currentStep.progress / 100) + (this.stepPercentage * this.checkedStepsLength);
        },
    },
    mounted() {
        this.init();
    },
    watch: {
        index: function (newValue, oldValue) {
            this.steps[oldValue].deactivate();
            this.steps[newValue].activate();
            this.currentStep = this.steps[newValue];
            newValue > oldValue ? this.checkedStepsLength++ : this.checkedStepsLength--;
        },
    },
    methods: {
        init() {
            if (this.steps.length > 0) {
                if (this.startIndex !== 0) {
                    this.activateStep(this.startIndex);
                } else {
                    this.activateStep(this.index)
                }
            } else {
                console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of steps - ${this.steps.length}. Make sure that the starting index is less than the number of steps registered`)
            }
        },
        addStep(step) {
            this.steps.push(step);
        },
        removeStep(step) {
            const index = this.steps.indexOf(step);
            if (index > -1) {
                this.steps.splice(index, 1)
            }
        },
        nextStep() {
            if (this.currentStep.validate()) {
                // this.index + 1 < this.steps.length ? this.index++ : this.$emit('on-complete');
                if (this.index + 1 !== this.steps.length) {
                    if (this.steps[this.index + 1].skip) {
                        this.skipStep(this.index);
                    } else {
                        this.index++;
                    }
                }
            }
        },
        skipStep(index, direction = true) {
            console.log('skip');
            if (index + 1 < this.steps.length) {
                console.log(this.steps[index + 1].skip);
                if (this.steps[index + 1].skip) {
                    index += 1;
                    this.skipStep(index, direction);
                }
                else {
                    console.log('1', index);
                    this.index += index;
                }
            } else {
                console.log('2', index);
                this.index += index;
            }
        },
        pow(x, n) {
            if (n !== 1) { // пока n != 1, сводить вычисление pow(x,n) к pow(x,n-1)
                return x * pow(x, n - 1);
            } else {
                return x;
            }
        },
        prevStep() {
            if (this.index - 1 >= 0)
                this.index--;
        },
        finishStep() {
            this.$emit('on-finish');
        },
        activateStep(index) {
            let step = this.steps[index];
            this.currentStep = step;
            step.activate();
        },
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