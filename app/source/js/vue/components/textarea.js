Vue.component('v-textarea', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' +
    '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' +
    '<label class="control-label"><slot></slot> <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' +
    '</div>' +
    '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' +
    '<textarea :rows="rows" v-validate :data-vv-rules="rules" :data-vv-value="value" :id="id" :class="classes" class="form-control" :name="name" @input="updateValue($event.target.value)" @blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' +
    '<span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '<span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '</div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => {
                return value !== '';
            }
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
        rules: {
            type: String
        },
        rows: {
            default: 5
        },
        helpText: {
            type: String
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
    mounted() {
        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });
    },
    computed: {
        valid() {
            return this.fields[this.name].valid;
        }
    },
    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
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
        validate() {
            this.$validator.validateAll();
        },
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate_' + this.$parent._uid, this.onValidate)
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeElement(this);
    },
});