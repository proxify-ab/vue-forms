<template>
  <div class="form-group row" :class="{'has-error':!valid && validated, 'has-success':valid && validated}">
    <div :class="{'col-md-12':!inline}">
      <div :class="{'row':!inline}" v-if="isLabel">
        <div :class="labelCols">
          <label class="control-label">
            <slot></slot>
            <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
               :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>
          </label>
        </div>
      </div>
      <div :class="{'row':!inline}">
        <div :class="inputCols">
          <div :class="[ btnAddon || leftAddon || rightAddon ? 'input-group' : '']">
            <div class="input-group-addon" v-if="leftAddon">{{leftAddon}}</div>
            <div :class="['validation', 'validation-'+type]">
              <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :type="type" :id="id"
                     :class="classes" class="form-control" :name="name" :value="value"
                     @input="onInput" :placeholder="placeholder" @blur="onBlur"
                     :readonly="readonly"
                     :disabled="disabled" :required="required" :max="max" :min="min" :length="length">
            </div>
            <div class="input-group-addon" v-if="rightAddon">{{rightAddon}}</div>
            <div class="input-group-btn" v-if="btnAddon">
              <button class="btn btn-secondary" type="button" @click="clickAddons">{{btnAddon}}</button>
            </div>
          </div>
          <span class="help-block" v-if="helpText">{{helpText}}</span>
          <span v-if="errors.any() && validated" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>
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
      type: {
        type: String,
        validator: value => {
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
        type: String,
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
        type: String,
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
      isLabel() {
        return this.$slots.default;
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
        return this.fields[this.name].valid
      }
    },
    mounted() {
      this.$parent.addElement(this);

      if (this.value !== null && this.value !== '') {
        this.validate()
      }
      this.loaded = true
    },
    created() {
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
      onBlur() {
        this.$emit('blur')
      },
      onInput(e) {
        this.$emit('input', e.target.value)
      },
      clickAddons: function () {
        this.$emit('on-addons', this.value, this.name)
      },
      validate() {
        this.$validator.validateAll()
      }
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeElement(this)
    }
  }
</script>
