Vue.component('v-check', {
    template: '<div :class="{\'form-group\':single, \'display-inline\':inline}">' +
    '<input v-validate :data-vv-rules="rules" type="checkbox" :name="name" :id="id" :value="value" :checked="checked" v-on:change="updateValue($event.target.checked)">' +
    '<label :for="id" v-if="label">{{label}}</label>' +
    '<span v-if="errors.has(name)" class="small text-danger">{{ errors.first(name) }}</span>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
        },
        classes: String,
        label: {
            type: String,
            required: true
        },
        checked: Boolean,
        value: {},
        rules: {
            type: String
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
        this.$eventHub.$on('validate', this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        })
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
    computed: {
        inline: function () {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function () {
            return this.$parent.$options.name !== 'v-check-group';
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});