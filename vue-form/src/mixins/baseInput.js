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
    value: {},
    validateEvent: {
      type: String,
      default: 'change'
    },
    labelCols: {
      type: String,
      default: 'col-md-12'
    },
    inputCols: {
      type: String,
      default: 'col-md-12'
    },
    popoverIcon: {
      type: String,
      default: 'question-circle'
    },
    helpText: String,
    popoverTitle: String,
    popoverContent: String,
    popoverTrigger: {
      default: 'hover'
    },
  },
  methods: {
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
