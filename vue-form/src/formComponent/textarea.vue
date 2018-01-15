<template>
  <div class="form-group row"
       :class="{'has-error':!valid && validated, 'has-success':valid && validated}">
    <div :class="[inline?'col-md-3':'col-md-12']">
      <label class="control-label">
        <slot></slot>
        <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
           :title="popoverTitle"
           :data-content="popoverContent" v-if="popoverContent"></i>
      </label>
    </div>
    <div :class="[inline?'col-md-9':'col-md-12']">
      <textarea :rows="rows" v-validate :data-vv-rules="rules" :data-vv-value="value"
                :data-vv-validate-on="validateEvent" :id="id" :class="classes"
                class="form-control" :name="name" @input="updateValue"
                @blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>
      <span class="help-block" v-if="helpText">{{helpText}}</span>
      <span v-if="errors.has(name)" class="small text-danger">
        <i class="fa fa-warning"></i> {{errors.first(name)}}
      </span>
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
      },
      validateEvent: {
        type: String,
        default: 'input'
      },
    },
    mounted() {
      this.$parent.addElement(this);
      this.$emit('after-mounted')
    },
    computed: {
      validated: {
        set: function (value) {
          this.fields[this.name].validated = value
        },
        get: function () {
          return this.fields[this.name].validated
        }
      },
      valid() {
        return this.fields[this.name].valid
      }
    },
    watch: {
      value: function (newValue, oldValue) {
        if (newValue && oldValue) {
          if (newValue.length !== oldValue.length) {
            this.validated = false
          }
        }
      }
    },
    methods: {
      enterKeyPressed() {
        this.$emit('enter');
      },
      updateValue() {
        this.$emit('input', event.target.value);
      },
      blur(value) {
        this.$emit('blur', value);
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
    }
  }
</script>
