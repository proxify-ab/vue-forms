<template>
  <div class="steps">
    <div class="container-fluid" :data-index="index">
      <div class="row">
        <div class="col-md-12">
          <div class="steps-progress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0"
                   aria-valuemax="100"
                   :style="`width: ${progress}%; background-color: ${progressColor}`">
                <span v-if="showProgress">{{progress}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="steps-header">
            <slot name="header"></slot>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="steps-content">
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="steps-btn v-row">
            <v-button @on-click="prevStep" v-if="!isFirstStep" :in-form="false" classes="v-col d-inline"
                      classes-btn="btn btn-default">
              <slot name="prevBtn">{{prevBtnLabel}}</slot>
            </v-button>
            <v-button @on-click="nextStep" v-if="!isLastStep" :in-form="false" classes="v-col d-inline"
                      classes-btn="btn btn-success">
              <slot name="nextBtn">{{nextBtnLabel}}</slot>
            </v-button>
            <v-button @on-click="nextStep" v-if="isLastStep" :in-form="false" classes="v-col d-inline"
                      classes-btn="btn btn-success">
              <slot name="finishBtn">{{finishBtnLabel}}</slot>
            </v-button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="steps-footer ">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VButton from '../formComponent/button'

  export default {
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
      },
      showProgress: {
        type: Boolean,
        default: false
      },
      progressColor: {
        type: String,
        default: '#008000',
        validator: (value) => {
          return value.search(/^#([0-9a-f]{3,6})$/i) > -1
        }
      }
    },
    components: {
      VButton
    },
    data() {
      return {
        index: null,
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
          this.steps[oldValue].afterChange(oldValue);
        }
        if (this.steps[newValue]) {
          this.steps[newValue].beforeChange(newValue);
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
      validateForce() {
        this.steps.forEach(function (step) {
          step.elements.forEach(function (element) {
            element.validate()
          })
        })
      }
    }
  }
</script>

<style lang="scss">

  .validation {
    position: relative;
    height: 36px;
    font-size: 50px;
    input, select {
      padding-right: 30px;
      background-color: transparent
    }
    &::after {
      position: absolute;
      right: 5px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 24px;
      width: 24px;
      text-align: center;
      z-index: 3;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 12px;
    }
    &-select::after {
      right: 15px
    }
  }

  .has-error {
    color: #a94442;
    input, textarea, select {
      position: relative;
      &:active, &:focus {
        border-color: #a94442
      }
    }
    .validation::after {
      content: '';
      color: #a94442;
      background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDk1LjkzOSA5NS45MzkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk1LjkzOSA5NS45Mzk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNjIuODE5LDQ3Ljk3bDMyLjUzMy0zMi41MzRjMC43ODEtMC43ODEsMC43ODEtMi4wNDcsMC0yLjgyOEw4My4zMzMsMC41ODZDODIuOTU4LDAuMjExLDgyLjQ0OCwwLDgxLjkxOSwwICAgYy0wLjUzLDAtMS4wMzksMC4yMTEtMS40MTQsMC41ODZMNDcuOTcsMzMuMTIxTDE1LjQzNSwwLjU4NmMtMC43NS0wLjc1LTIuMDc4LTAuNzUtMi44MjgsMEwwLjU4NywxMi42MDggICBjLTAuNzgxLDAuNzgxLTAuNzgxLDIuMDQ3LDAsMi44MjhMMzMuMTIxLDQ3Ljk3TDAuNTg3LDgwLjUwNGMtMC43ODEsMC43ODEtMC43ODEsMi4wNDcsMCwyLjgyOGwxMi4wMiwxMi4wMjEgICBjMC4zNzUsMC4zNzUsMC44ODQsMC41ODYsMS40MTQsMC41ODZjMC41MywwLDEuMDM5LTAuMjExLDEuNDE0LTAuNTg2TDQ3Ljk3LDYyLjgxOGwzMi41MzUsMzIuNTM1ICAgYzAuMzc1LDAuMzc1LDAuODg0LDAuNTg2LDEuNDE0LDAuNTg2YzAuNTI5LDAsMS4wMzktMC4yMTEsMS40MTQtMC41ODZsMTIuMDItMTIuMDIxYzAuNzgxLTAuNzgxLDAuNzgxLTIuMDQ4LDAtMi44MjhMNjIuODE5LDQ3Ljk3ICAgeiIgZmlsbD0iI2E5NDQ0MiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=")
    }
  }

  .has-success {
    color: #3c763d;
    input, select, textarea {
      position: relative;
      &:active, &:focus {
        border-color: #3c763d
      }
    }
    .validation::after {
      content: '';
      color: #3c763d;
      background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ1LjcwMSA0NS43IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NS43MDEgNDUuNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yMC42ODcsMzguMzMyYy0yLjA3MiwyLjA3Mi01LjQzNCwyLjA3Mi03LjUwNSwwTDEuNTU0LDI2LjcwNGMtMi4wNzItMi4wNzEtMi4wNzItNS40MzMsMC03LjUwNCAgICBjMi4wNzEtMi4wNzIsNS40MzMtMi4wNzIsNy41MDUsMGw2LjkyOCw2LjkyN2MwLjUyMywwLjUyMiwxLjM3MiwwLjUyMiwxLjg5NiwwTDM2LjY0Miw3LjM2OGMyLjA3MS0yLjA3Miw1LjQzMy0yLjA3Miw3LjUwNSwwICAgIGMwLjk5NSwwLjk5NSwxLjU1NCwyLjM0NSwxLjU1NCwzLjc1MmMwLDEuNDA3LTAuNTU5LDIuNzU3LTEuNTU0LDMuNzUyTDIwLjY4NywzOC4zMzJ6IiBmaWxsPSIjM2M3NjNkIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==")
    }
  }

  .steps {
    padding: 15px 0;
  }

  .d-inline {
    display: inline-block !important;
    width: auto !important
  }

  .v-row {
    margin-left: -5px;
    margin-right: -5px
  }

  .v-col {
    padding-left: 5px;
    padding-right: 5px
  }

</style>
