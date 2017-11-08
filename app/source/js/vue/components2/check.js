Vue.component('v-check', {
    template: '<div :class="{\'form-group\':single, \'display-inline\':inline}">' +
    '<input type="checkbox" :name="name" :id="id" :value="value" :checked="checked" v-on:change="updateValue($event.target.checked)">' +
    '<label :for="id" v-if="label">{{label}}</label>' +
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
        value: {}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        }
    },
    computed: {
        inline: function () {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function () {
            return this.$parent.$options.name !== 'v-check-group';
        }
    }
});