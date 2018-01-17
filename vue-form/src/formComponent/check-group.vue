<template>
  <div class="form-group row" :class="{'has-error':!valid && validated, 'has-success':valid && validated}">
    <div :class="[inline ? 'col-md-12' : 'col-md-3']" v-if="header">
      <label class="control-label">{{header}} <i :class="'fa fa-' + popoverIcon" data-toggle="popover"
                                                 :data-trigger="popoverTrigger"
                                                 :title="popoverTitle" :data-content="popoverContent"
                                                 v-if="popoverLabel">{{popoverLabel}}</i></label>
    </div>
    <div :class="[inline ? 'col-md-9' : 'col-md-9']">
      <slot></slot>
    </div>
    <div class="col-md-12" v-if="error && validated">
      <span class="small text-danger"><i class="fa fa-warning"></i> <span v-html="error"></span></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-check-group',
    props: {
      name: {
        type: String,
        required: true,
        validator: value => {
          return value !== ''
        }
      },
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
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        checks: [],
        isValidating: false
      }
    },
    mounted() {
      this.$parent.addElement(this);
      this.$emit('after-mounted')
      this.$on('update', function () {
        this.isValidating = false
      })
    },
    computed: {
      valid: function () {
        return this.checks.some(function (check) {
          return check.valid
        });
      },
      validated() {
        if (this.isValidating) {
          return true;
        }
        return this.checks.some(check => {
          return check.fields[this.name].validated
        }) && (this.checkedCount >= this.max || this.checkedCount < 1)
      },
      error: function () {
        return this.checks[0] && this.checks[0].errors.has(this.name) ? this.checks[0].errors.first(this.name) : false
      },
      vrules() {
        return this.rules + '|min:' + (this.min - 1) + '|max:' + (this.max - 1)
      },
      checkedCount() {
        return this.checks.filter(check => {
          return check.checked === true
        }).length
      }
    },
    methods: {
      validate() {
        this.isValidating = true
        return this.checks.map(function (check) {
          check.$validator.validateAll()
        })
      },
      addElement(check) {
        this.checks.push(check)
      }
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeElement(this);
    }
  }
</script>
