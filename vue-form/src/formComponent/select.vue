<template>
  <div class="form-group row"
       :class="{'has-error':!valid && validated, 'has-success':valid && validated}">
    <div :class="[inline ? 'col-md-3' : 'col-md-12']">
      <label class="control-label">
        <slot></slot>
        <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
           :title="popoverTitle"
           :data-content="popoverContent" v-if="popoverContent"></i>
      </label>
    </div>
    <div :class="[inline ? 'col-md-9' : selectCols ]">
      <div :class="{'validation validation-select' : rules}">
        <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control"
                @change="updateValue($event.target.value)" :multiple="multiple">
          <option v-if="emptyLabel" v-text="emptyLabel" :value="null"></option>
          <option v-for="option in options" :value="option.value || option" v-text="option.label || option"
                  :selected="(option.value || option ) === value"></option>
        </select>
      </div>
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
      },
      id: {},
      classes: {},
      multiple: {
        type: Boolean,
        default: false
      },
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
      options: {
        type: Array
      },
      emptyLabel: {
        type: String
      }
    },
    mounted() {
      this.$parent.addElement(this);
      if (this.value !== null && this.value !== '') {
        this.validate()
      }
      this.$emit('after-mounted', this)
    },
    created() {
    },
    computed: {
      validated: {
        set: function (value) {
          this.fields[this.name].validated = value
        },
        get: function () {
          if (this.fields[this.name] !== undefined)
            return this.fields[this.name].validated
        }
      },
      valid() {
        if (this.fields[this.name] !== undefined)
          return this.fields[this.name].valid && !this.errors.any()
      }
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value);
      },
      validate() {
        this.$validator.validateAll();
      }
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$parent.removeElement(this);
    }
  }
</script>
