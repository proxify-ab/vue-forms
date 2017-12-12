Vue.component('v-select', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && ( fields[name].touched || validateOnCreate) && fields[name].valid}">' +
    '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label></div>' +
    '       <div :class="[inline ? \'col-md-9\' : selectCols ]">' +
    '           <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)"><slot></slot></select>' +
    '           <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '           <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '       </div>' +
    '   </div>' +
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
        classes: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
        },
        helpText: {
            type: String
        },
        selectCols: {
            default: 'col-md-12'
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
        },
        value: {},
        validateOnCreate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options: [],
            selected: {}
        };
    },
    mounted() {
        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });

        if (this.value !== null && this.value !== '') {
            this.findByValue(this.value).select();
        }
        // if (this.value !== '') {
        // this.$validator.validateAll();
        // }
    },
    created() {

    },
    watch: {
        value: function (newValue, oldValue) {
            if (oldValue)
                this.findByValue(oldValue).unSelect();
            if (newValue)
                this.findByValue(newValue).select();
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
        addOption(option) {
            this.options.push(option);
        },
        removeOption(option) {
            this.options.push(option);
        },
        findByValue(value) {
            return this.options.find(function (option) {
                return option.value === value;
            });
        }
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeElement(this);
    },
});