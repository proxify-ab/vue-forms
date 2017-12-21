<template>
  <div :class="[inForm?'form-group':'', classes]">
    <button @click="clicked" :type="type" :class="classesBtn" :id="id">
      <slot>Button</slot>
    </button>
  </div>
</template>
<script>
  export default {
    name: 'v-button',
    props: {
      type: {
        type: String,
        validator: value => {
          return ['button', 'submit'].indexOf(value) > -1;
        },
        default: 'button'
      },
      classes: {},
      classesBtn: {},
      id: {},
      inForm: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
    },
    methods: {
      clicked() {
        this.$emit('on-click');
      }
    }
  }
</script>
