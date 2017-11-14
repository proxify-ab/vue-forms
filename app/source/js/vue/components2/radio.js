Vue.component('v-radio', {
    template: '<div :class="{\'d-inline\':inline}" class="v-radio">' +
    '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" @change="updateValue($event.target.value)" :class="classes">' +
    '<label :for="id"><slot name="icon"></slot><slot name="text"></slot></label>' +
    '</div>',
    props: {
        id: {},
        classes: {},
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