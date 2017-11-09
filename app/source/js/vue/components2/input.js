Vue.component('v-input', {
    template: '<div class="form-group row" >' +
    '<div :class="[inline ? \'col-md-3\' : \'col-md-12\']">' +
    '<label v-if="label">{{label}}</label>' +
    '</div>' +
    '<div :class="[inline ? \'col-md-9\' : \'col-md-12\']">' +
    '<input v-validate.touched :data-vv-rules="rules" :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder">' +
    '<span v-if="errors.has(name)" class="help text-danger">{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: value => {
                return ['hidden', 'text', 'number', 'date'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        validation: {
            type: String
        },
        rules: {
            type: String,
        }
    },
    mounted() {
        //Listen on the bus for the parent component running validation
        this.$eventHub.$on('validate', this.onValidate);
        //Watch for the changes to the childs error bag and pass back to the parent
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            const newErrors = newValue.filter(function(error) {
                return find(propEq('field', error.field))(oldValue) === undefined;
            });

            // Look for errors that we already have in our Errors object
            const oldErrors = oldValue.filter(function(error) {
                return find(propEq('field', error.field))(newValue) === undefined;
            });
            this.$eventHub.$emit('errors-changed', newErrors, oldErrors);
        })
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
        onValidate() {
            // console.log('validate');
            this.$validator.validateAll();
            if (this.errors.any()) {
                this.$eventHub.$emit('errors-changed', this.errors)
            }
        },
    },
    beforeDestroy() {
        //When destroying the element remove the listeners on the bus.
        //Useful for dynaically adding and removing child components
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});