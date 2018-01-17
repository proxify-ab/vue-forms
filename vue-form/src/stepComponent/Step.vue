<template>
  <div class="step" v-show="active">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      title: {},
      validating: {},
      skip: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: false,
        elements: [],
      }
    },
    computed: {
      progress() {
        if (this.elements.length === 0)
          return 100
        else
          return 100 / this.elements.length * this.validElementsLength
      },
      validElementsLength() {
        return this.elements.filter(function (item) {
          return item.valid
        }).length
      }
    },
    mounted() {
      this.$parent.addStep(this)
    },
    watch: {
      active: function (newValue, oldValue) {
        if (newValue) {
          this.postActivate()
        }
      }
    },
    methods: {
      postActivate() {
        $('html, body').animate({
          scrollTop: 0
        }, 500)
      },
      validate() {
        return !this.elements.some(function (item) {
          if (item) {
            item.validate()
            if (!item.valid) {
              $('html, body').animate({
                scrollTop: $(item.$el).offset().top - ($(window).height() / 2 - 40)
              }, 500)
              $(item.$el).find('[name]')[0].focus()
              return true
            }
          }
          return false
        })
      },
      beforeChange(index) {
        this.$emit('on-before', index)
      },
      afterChange(index) {
        this.$emit('on-after', index)
      },
      addElement(element) {
        this.elements.push(element)
      },
      removeElement(element) {
        const elements = this.elements
        const index = elements.indexOf(element)
        if (index > -1) {
          elements.splice(index, 1)
        }
      },
      activate() {
        this.active = true

      },
      deactivate() {
        this.active = false
      }
    },
    beforeDestroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$parent.removeStep(this)
    }
  }
</script>
