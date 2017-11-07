Vue.component('textarea-box', {
    template: '<div class="form-group" ><textarea :id="id" :class="classes" class="form-control" :name="name" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)">{{value}}</textarea><span v-if="this.errors.has(name)">{{ errors.first(name) }}</span></div>',
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
        value: {}
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