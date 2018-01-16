<template>
  <div class="form-group row" :class="{'has-error': !valid && validated, 'has-success':valid && validated }">
    <div :class="{'col-md-12':!inline}">
      <div :class="{'row':!inline}">
        <div :class="labelCols">
          <label class="control-label">
            <slot></slot>
            <i :class="'fa fa-' + popoverIcon"
               data-toggle="popover"
               :data-trigger="popoverTrigger" :title="popoverTitle"
               :data-content="popoverContent"
               v-if="popoverContent"></i>
          </label>
        </div>
      </div>
      <div :class="{'row':!inline}">
        <div :class="[inputCols , 'form-inline']">
          <select :class="classes" class="d-inline day form-control" @change="updateValue" @blur="updateValue" v-model="day"
                  :name="name" v-validate :data-vv-value-path="value" data-vv-rules="required"
                  :data-vv-validate-on="validateEvent" :required="required">
            <option value>{{dayLabel}}</option>
            <option v-for="day in days" :value="day">{{day}}</option>
          </select>
          <select :class="classes" class="d-inline month form-control" @change="updateValue" @blur="updateValue" v-model="month"
                  :name="name" v-validate :data-vv-value-path="value" data-vv-rules="required"
                  :data-vv-validate-on="validateEvent" :required="required">
            <option value>{{monthLabel}}</option>
            <option v-for="(month, index) in months" :value="index + 1">{{month}}</option>
          </select>
          <select :class="classes" class="d-inline year form-control" @change="updateValue" @blur="updateValue" v-model="year"
                  :name="name" v-validate :data-vv-value-path="value" data-vv-rules="required"
                  :data-vv-validate-on="validateEvent" :required="required">
            <option value>{{yearLabel}}</option>
            <option v-for="year in years" :value="year">{{year}}</option>
          </select>
          <input v-validate :data-vv-value="value" :data-vv-rules="rules" data-vv-validate-on="input"
                 type="hidden" :name="name" :value="value" :id="id">
          <span class="help-block" v-if="helpText">{{helpText}}</span>
        </div>
        <div class="col-md-12" v-if="!valid && validated">
          <span class="small text-danger">
            <i class="fa fa-warning"></i> {{ errors.first(name) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
        validator: value => {
          return value !== '';
        }
      },
      id: {},
      classes: {
        type: String
      },
      value: {},
      inline: {
        type: Boolean,
        default: false
      },
      rules: {
        type: String,
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
        default: 'Day',
      },
      monthLabel: {
        default: 'Month',
      },
      yearLabel: {
        default: 'Year',
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
      },
      maxDateIsNow: {
        default: false
      },
      currentDefault: {
        default: false
      }
    },
    computed: {
      days: function () {
        let count = moment(`${this.month}-${this.year}`, "MM-YYYY").daysInMonth();

        return Array.apply(0, Array(isNaN(count) ? 31 : count)).map(function (_, i) {
          return ++i;
        });
      },
      months: function () {
        let count = 12

        if (this.days.indexOf(this.day) === -1) {
          this.day = ""
        }

        return Array.apply(0, Array(count)).map(function (_, i) {
          return moment().month(i).format('MMMM');
        });
      },
      years: function () {

        return Array.apply(0, Array(moment().get('years') - this.minYear + 1)).map(function (_, i) {
          return moment().get('years') - i;
        });
      },
      validated: {
        set: function (value) {
          this.fields[this.name].validated = value
        },
        get: function () {
          return this.fields[this.name].validated
        }
      },
      valid() {
        return this.fields[this.name].valid && !this.errors.any()
      }
    },
    data() {
      return {
        day: "",
        month: "",
        year: "",
      };
    },
    watch: {
      value: function (newValue, oldValue) {
        if (!oldValue && newValue) {
          this.init(newValue);
        }
      }
    },
    mounted() {
      this.$parent.addElement(this);
      if (this.value !== '' && this.value !== null && this.value !== undefined) {
        this.init(this.value)
        this.$validator.validateAll()
      } else if (this.currentDefault) {
        this.init(moment().format(this.dateFormat))
      }
      this.$emit('after-mounted')
    },
    methods: {
      init(value) {
        let date = moment(value, this.dateFormat).local(false);
        this.day = date.date()
        this.month = date.month() + 1
        this.year = date.year()
      },
      updateValue() {
        this.$validator.validateAll()
        if (this.day !== '' && this.month !== '' && this.year !== '') {
          let date = moment(`${this.day}-${this.month}-${this.year}`, 'DD-MM-YYYY').format(this.dateFormat);
          this.$emit('input', date);
        }
      },
      validate() {
        this.$validator.validateAll();
      },
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeElement(this);
    },
  }
</script>
