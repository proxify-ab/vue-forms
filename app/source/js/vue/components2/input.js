Vue.component('v-input', {
    template:
    '<div class="form-group row" :class="[errors.first(name)?\'has-error\':\'has-success\']">\n' +
    '            <div :class="{\'col-md-12\':!inline}">\n' +
    '              <div :class="{\'row\':!inline}">\n' +
    '                <div :class="labelCols">\n' +
    '                  <label v-if="label">{{label}}</label>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <div :class="{\'row\':!inline}">\n' +
    '                <div :class="inputCols">\n' +
    '                  <input v-validate :data-vv-rules="rules" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :required="required">\n' +
    '                  <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: value => {
                return ['hidden', 'text', 'number', 'date'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        label: {
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
        required: {
            type: Boolean,
            default: false
        },
        labelCols:{
            type: String,
            default: 'col-md-12'
        },
        inputCols:{
            type: String,
            default: 'col-md-12'
        }
    },
    mounted() {
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });
    },
    methods: {
        enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue(value) {
            this.$emit('input', value);
        },
        blur(value) {
            this.$emit('blur', value);
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate_' + this.$parent._uid, this.onValidate)
    },
});