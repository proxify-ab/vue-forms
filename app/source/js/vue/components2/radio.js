Vue.component('v-radio', {
    template: '<div><input type="radio" :name="name" :id="id" :value="value" v-on:change="updateValue($event.target.value)"><label :for="id" v-if="label">{{label}}</label></div>',
    props: {
        type: {},
        id: {},
        classes: {},
        label: {},
        value: {}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {

    },
    computed: {
        name: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : 'radio-btn';
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        }
    }
});