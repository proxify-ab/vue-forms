Vue.component('v-radio', {
    template: '<div :class="{\'d-inline\':inline}">' +
    '<label :for="id" class="radio-box radio-box-inline control-label">' +
    '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" @change="updateValue($event.target.value)" :class="classes">' +
    '<slot></slot></label>' +
    '<span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '</div>',
    props: {
        id: {},
        classes: {},
        value: {},
        helpText: {
            type: String
        }
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
        },
        inline: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.inlineItems: false;
        },
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value);
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
});