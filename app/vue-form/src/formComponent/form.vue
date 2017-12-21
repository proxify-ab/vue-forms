<template>
  <form :class="{'form-inline':inline, classes}" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>
<script>
  export default {
    props: {
      inline: {
        type: Boolean,
        default: false
      },
      classes: {
        type: String
      },
      submit: {
        type: Function
      },
    },
    mounted() {
      this.$eventHub.$on('form_validate', this.validate);
    },
    methods: {
      validate: function () {
        this.$eventHub.$emit('validate_' + this._uid);
      }
    }
  }
</script>
