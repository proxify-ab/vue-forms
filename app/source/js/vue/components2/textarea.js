Vue.component('v-textarea', {
    template: '<div class="form-group row" >' +
    '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' +
    '<label v-if="label">{{label}}</label>' +
    '</div>' +
    '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' +
    '<textarea :id="id" :class="classes" class="form-control" :name="name" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' +
    '</div>' +
    '<span v-if="this.errors.has(name)">{{ errors.first(name) }}</span>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: value => {
                return ['hidden', 'text', 'number'].indexOf(value) > -1;
            },
            default: 'text'
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
        }
    },
    mounted() {

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
    }
});