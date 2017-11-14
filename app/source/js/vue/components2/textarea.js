Vue.component('v-textarea', {
    template: '<div class="form-group row" :class="[errors.first(name)?\'has-error\':\'has-success\']">' +
    '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' +
    '<label v-if="label">{{label}}</label>' +
    '</div>' +
    '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' +
    '<textarea :rows="rows" v-validate :data-vv-rules="rules" :data-vv-value="value" :id="id" :class="classes" class="form-control" :name="name" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' +
    '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        inline: {
            type: Boolean,
            default: false
        },
        label: {
            type: String
        },
        rules: {
            type: String
        },
        rows: {
            default: 5
        },
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