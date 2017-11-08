Vue.component('v-select', {
    template: '<div class="form-group row">' +
    '<div :class="[inline? \'col-md-3\' : \'col-md-12\']" v-if="label"><label>{{label}}</label></div>' +
    '<div :class="[inline? \'col-md-9\' : \'col-md-12\']">' +
    '<select :name="name" :id="id" :class="classes" class="form-control" v-on:change="updateValue($event.target.value)"><slot></slot></select>' +
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
        }
    },
    mounted() {

    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        }
    }
});