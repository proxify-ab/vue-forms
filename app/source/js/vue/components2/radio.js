Vue.component('v-radio', {
    template: '<div>' +
    '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" v-on:change="updateValue($event.target.value)">' +
    '<label :for="id" v-if="label">{{label}}</label>' +
    '</div>',
    props: {
        type: {},
        id: {},
        classes: {},
        label: {},
        value: {},
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
        this.$eventHub.$on(this.name + '_validate', this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit(this.name + 'return_validate', newValue, oldValue);
        })
    },
    computed: {
        name: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : '';
        },
        rules: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.rules : '';
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
});