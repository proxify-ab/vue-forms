<template>
  <div class="form-group row" :class="{'has-error':!valid && validated, 'has-success':valid && validated}">
    <div :class="[inline ? 'col-md-3' : 'col-md-12']" v-if="header">
      <label :class="['control-label', labelBold?'text-bold':'']"> {{header}}
        <i :class="`fa fa-${popoverIcon}`" data-toggle="popover" :data-trigger="popoverTrigger"
           :title="popoverTitle"
           :data-content="popoverContent" v-if="popoverContent"></i></label>
    </div>
    <div :class="[ inline ? 'col-md-9' : 'col-md-12', classes]">
      <slot></slot>
    </div>
    <div class="col-md-12" v-if="!valid && validated">
      <span class="small text-danger"><i class="fa fa-warning"></i> {{ errorsOfRadio }}</span>
    </div>
    <div class="col-md-12">
      <transition-group :name="effect" tag="div" :duration="animateDuration">
        <div v-for="id in selected.idAlertSlots" :key="id">
          <slot :name="id+ '-info'"></slot>
        </div>
      </transition-group>
    </div>
    <div class="col-md-12">
      <transition-group :name="effect" tag="div" :duration="animateDuration">
        <div v-for="id in selected.idSlots" :key="id">
          <slot :name="id"></slot>
        </div>
      </transition-group>
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
      inlineItems: {
        type: Boolean,
        default: false
      },
      rules: {
        type: String
      },
      helpText: {
        type: String
      },
      classes: {
        default: 'radio-box-group'
      },
      effect: {
        default: 'fadeDown'
      },
      animateDuration: {
        type: Number,
        default: 500
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
      labelBold: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        radios: [],
        selected: {}
      }
    },
    mounted() {
      this.$parent.addElement(this);
      this.selected = {}
      this.$emit('after-mounted', this)
    },
    computed: {
      valid() {
        return this.radios.some(function (radio) {
          return radio.valid
        })
      },
      validated() {
        return this.radios.some(function (radio) {
          return radio.validated
        })
      },
      errorsOfRadio() {
        return this.radios[0].errors.any() ? this.radios[0].errors.first(this.name) : ""
      },
    },
    methods: {
      validate() {
        return this.radios.map(function (radio) {
          radio.$validator.validateAll()
        });
      },
      addRadio(radio) {
        this.radios.push(radio)
      },
      setSelected(radio) {
        this.selected = radio
      },
      hasIn(radio) {
        return this.selected.idSlots && this.selected.idSlots.indexOf(radio.id) > -1
      }
    },
    beforeDestroy() {
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeElement(this)
    },
  }
</script>
