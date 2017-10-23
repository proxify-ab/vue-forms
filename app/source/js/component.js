Vue.component('flex-input', {
    template: '\
    <div class="form-group">\
      <label v-if="label">{{ label }}</label>\
      <input\
        ref="input"\
        :value="value"\
        @input="updateValue($event.target.value)"\
        :type="type"\
        class="form-control"\
        :placeholder="placeholder"\
        v-validate :data-vv-rules="rules"\
        :name="name"\
        >\
      <span v-show="this.errors.has(name)" class="small text-danger"><i class="fa fa-info-circle"></i>{{this.errors.first(name)}}</span>\
    </div>\
  ',
    props: {
        value: {
            default: '',
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text',
            required: true
        },
        placeholder: {
            type: String,
            default: 'Flex Input'
        },
        rules: {
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        checked: {}
    },
    methods: {
        updateValue: function (value) {
            this.$emit('input', value)
        },
        formatValue: function () {

        },
    },
    computed: {
    }
});