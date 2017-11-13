Vue.component('v-select', {
    template: '<div class="form-group row" :class="[errors.first(name)?\'has-error\':\'has-success\']">' +
    '<div :class="[inline? \'col-md-3\' : \'col-md-12\']" v-if="label"><label>{{label}}</label></div>' +
    '<div :class="[inline? \'col-md-9\' : \'col-md-12\']">' +
    '<select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" v-on:change="updateValue($event.target.value)"><slot></slot></select>' +
    '<span v-if="errors.has(name)" class="small text-danger">{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {},
        classes: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        }
    },
    mounted() {
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        })
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});