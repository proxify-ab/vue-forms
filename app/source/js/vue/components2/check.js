Vue.component('v-check', {
    template: '<div :class="{\'form-group\':single, \'display-inline\':inline, \'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' +
    '<input v-validate :data-vv-rules="rules" type="checkbox" :name="name" :id="id" :value="value" :checked="checked" v-on:change="updateValue($event.target.checked)">' +
    '<label :for="id" v-if="label" class="control-label">{{label}}</label>' +
    '<span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
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
        value: {},
        rules: {
            type: String
        },
        helpText: {
            type: String
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        })
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
    computed: {
        inline: function () {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function () {
            return this.$parent.$options.name !== 'v-check-group';
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});