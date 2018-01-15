<template>
  <div class="form-group row">
    <div :class="[inline ? 'col-md-12' : 'col-md-3']" v-if="header">
      <label>{{header}} <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
                           :title="popoverTitle" :data-content="popoverContent"
                           v-if="popoverLabel">{{popoverLabel}}</i></label>
    </div>
    <div :class="[inline ? 'col-md-9' : 'col-md-9']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      name: {},
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
    },
    mounted() {
      this.$parent.addElement(this);
      this.$emit('after-mounted')
    },
    computed: {
      valid: function () {
        return true;
      }
    },
    methods: {
      validate() {
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
