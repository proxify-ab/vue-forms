Vue.component('v-textarea', {
    template: '<div class="form-group row" >' +
    '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' +
    '<label v-if="label">{{label}}</label>' +
    '</div>' +
    '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' +
    '<textarea v-validate :data-vv-rules="rules" :id="id" :class="classes" class="form-control" :name="name" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' +
    '<span class="text-danger" v-if="this.errors.has(name)">{{ errors.first(name) }}</span>' +
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
        }
    },
    mounted() {
        this.$eventHub.$on('validate', this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        })
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
        this.$eventHub.$off('validate', this.onValidate)
    },
});