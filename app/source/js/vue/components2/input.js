Vue.component('v-input', {
    template: '<div class="form-group row" :class="[errors.first(name)?\'has-error\':\'has-success\']">' +
    '<div :class="[inline ? \'col-md-3\' : \'col-md-12\']">' +
    '<label v-if="label">{{label}}</label>' +
    '</div>' +
    '<div :class="[inline ? \'col-md-9\' : \'col-md-6\']">' +
    '<input v-validate :data-vv-rules="rules" :type="type" :id="id" :class="[classes, errors.first(name)?\'has-error\':\'has-success\']" class="form-control" :name="name" :value="value" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder" :readonly="readonly" :required="required">' +
    '<span v-if="errors.has(name)" class="small text-danger">{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
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
        readonly: {},
        required: {}
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