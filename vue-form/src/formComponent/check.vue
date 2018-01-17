<template>
  <div class="checkbox"
       :class="{'form-group':single, 'display-inline':inline, 'has-error':errors.first(checkName) && single, 'has-success':valid && fields[checkName].touched && single}">
    <label :for="id" class="control-label">
      <input v-validate :data-vv-rules="checkRules" :data-vv-validate-on="validateEvent" type="checkbox"
             :name="checkName" :checked="checked" :id="id" :value="value"
             @click="updateValue($event.target.checked)">
      <slot></slot>
      <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
         :title="popoverTitle"
         :data-content="popoverContent" v-if="popoverContent"></i>
    </label>
    <span class="help-block" v-if="helpText">{{helpText}}</span>
    <span v-if="errors.has(checkName) && single" class="small text-danger"><i class="fa fa-warning"></i> {{ errors.first(checkName) }}</span>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
        validator: value => {
          return value !== ''
        }
      },
      id: {
        type: String,
      },
      classes: String,
      value: {},
      rules: {
        type: String
      },
      helpText: {
        type: String
      },
      validateEvent: {
        type: String,
        default: 'change'
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
      checked: {}
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    mounted() {
      if (!this.single)
        this.$parent.addElement(this)
      this.$emit('after-mounted', this)
    },
    methods: {
      updateValue(value) {
        this.$emit('change', value)
        this.$parent.$emit('update')
      },
      validate() {
        this.$validator.validateAll()
      }
    },
    computed: {
      inline() {
        return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false
      },
      single() {
        return this.$parent.$options.name !== 'v-check-group'
      },
      valid() {
        if (this.fields[this.checkName] !== undefined)
          return this.fields[this.checkName].valid
      },
      checkRules() {
        return this.single ? this.rules : this.$parent.vrules
      },
      checkName() {
        return this.single ? this.name : this.$parent.name
      }
    },
    watch: {},
    destroyed() {
      if (typeof this.$parent.removeElement === 'function') {
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeElement(this)
      }
    }
  }
</script>
