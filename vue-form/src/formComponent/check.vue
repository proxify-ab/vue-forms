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
  import baseInput from './../mixins/baseInput'

  export default {
    mixins: [baseInput],
    props: {
      classes: String,
      rules: String,
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
  }
</script>
