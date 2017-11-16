Vue.component('v-input', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}"> ' +
    '<div :class="{\'col-md-12\':!inline}"> ' +
    '              <div :class="{\'row\':!inline}"> ' +
    '                <div :class="labelCols"> ' +
    '                  <label v-if="label" class="control-label">{{label}}</label> ' +
    '                </div> ' +
    '              </div> ' +
    '              <div :class="{\'row\':!inline}"> ' +
    '                <div :class="inputCols">' +
    '                  <div :class="{\'input-group\':usingAddons}">' +
    '                    <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" @change="updateValue($event.target.value)" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :required="required">' +
    '                    <span class="input-group-btn" v-if="usingAddons"> ' +
    '                      <button class="btn btn-secondary" type="button" @click="clickAddons">{{addons}}</button> ' +
    '                    </span></div> ' +
    '                  <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '                  <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '                </div> ' +
    '              </div> ' +
    '            </div> ' +
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
        labelCols: {
            type: String,
            default: 'col-md-12'
        },
        inputCols: {
            type: String,
            default: 'col-md-12'
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'input'
        },
        usingAddons: {
            type: Boolean,
            default: false
        },
        addons: {
            type: String,
            default: 'Search'
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
        clickAddons: function () {
            this.$emit('on-addons', this.value, this.name);
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate_' + this.$parent._uid, this.onValidate)
    },
});