Vue.component('v-check', {
    template:
    '<div class="checkbox" :class="{\'form-group\':single, \'display-inline\':inline, \'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' +
    '   <label :for="id" class="control-label">' +
    '       <input v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" type="checkbox" :name="name" :id="id" :value="value" @change="updateValue($event.target.checked)"><slot></slot>' +
    '       <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i>' +
    '   </label>' +
    '   <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '   <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => {
                return value !== '';
            }
        },
        id: {
            type: String,
        },
        classes: String,
        value: {},
        rules: {
            type: String
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'change'
        },
        popoverIcon: {
            type: String,
            default: 'question-circle'
        },
        popoverTitle: {
            type: String
        },
        popoverContent: {
            type: String
        },
        popoverTrigger: {
            default: 'hover'
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
        if (typeof this.$parent.addElement === 'function')
            this.$parent.addElement(this);
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
    destroyed() {
        if (typeof this.$parent.removeElement === 'function') {
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el)
            }
            this.$parent.removeElement(this);
        }
    },
});