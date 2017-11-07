Vue.component('check-box', {
    template: '<div :class="{\'form-group\':group}"><label :for="id" v-if="label">{{label}}</label><input type="checkbox" :name="name" :id="id" :checked="checked" v-on:change="updateValue($event.target.checked)"></div>',
    props: {
        name: {},
        id: {},
        classes: {
            default: 'test'
        },
        label: {},
        checked: Boolean,
        group: {
            type: Boolean,
            default: false
        }
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
    }
});