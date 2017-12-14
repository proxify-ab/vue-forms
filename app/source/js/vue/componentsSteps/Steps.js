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
        validateOnFront: {
            type: Boolean,
            default: true
        },
        validateOnBack: {
            type: Boolean,
            default: false
        }
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
            return this.steps.filter(function (step) {
                return !step.skip;
            }).length;
        },
        skipSteps() {
            return this.steps.filter(function (step) {
                return step.skip;
            })
        },
        skipInvertSteps() {
            return this.steps.filter(function (step) {
                return !step.skip;
            })
        },
        isLastStep() {
            return this.skipInvertSteps.indexOf(this.currentStep) === this.skipInvertSteps.length - 1;
        },
        isFirstStep() {
            return this.skipInvertSteps.indexOf(this.currentStep) === 0;
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
            if (this.steps[oldValue]) {
                this.deactivateStep(oldValue);
            }
            if (this.steps[newValue]) {
                this.steps[newValue].beforeChange();
                this.activateStep(newValue);
            }
        },
    },
    methods: {
        init() {
            if (this.steps.length > 0) {

                this.index = this.startIndex;

                if (!this.steps[this.index].skip) {
                    this.activateStep(this.index);
                } else {
                    this.skipStep(this.index);
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
            if (this.validateOnFront) {
                if (!this.currentStep.validate())
                    return false;
            }

            if (this.index + 1 < this.steps.length) {
                if (this.steps[this.index + 1].skip) {
                    this.skipStep(this.index);
                } else {
                    this.index++;
                }
                this.checkedStepsLength++;
            } else {
                this.$emit('on-complete');
            }
        },
        prevStep() {
            if (this.validateOnBack) {
                if (!this.currentStep.validate())
                    return false;
            }

            if (this.index - 1 >= 0) {
                if (this.steps[this.index - 1].skip) {
                    this.skipStep(this.index, false);
                } else {
                    this.index--;
                }
                this.checkedStepsLength--;
            }
        },
        skipStep(index, direction = true) {
            if (this.changeIndex(index, direction) < this.steps.length && this.changeIndex(index, direction) >= 0) {
                if (this.steps[this.changeIndex(index, direction)].skip) {
                    index = this.changeIndex(index, direction);
                    this.skipStep(index, direction);
                }
                else {
                    this.index = this.changeIndex(index, direction);
                }
            } else {
                this.$emit('on-complete');
            }
        },
        changeIndex(index, direction) {
            return direction ? index + 1 : index - 1;
        },
        finishStep() {
            this.$emit('on-finish');
        },
        activateStep(index) {
            let step = this.steps[index];
            this.currentStep = step;
            step.activate();
        },
        deactivateStep(index) {
            this.steps[index].deactivate();
        },
    }
});