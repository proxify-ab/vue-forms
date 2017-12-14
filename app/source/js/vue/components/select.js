Vue.component('v-select', {
    template: '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && ( fields[name].touched || validateOnCreate) && valid}">' + '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label></div>' + '       <div :class="[inline ? \'col-md-9\' : selectCols ]">' + '           <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)"><slot></slot></select>' + '           <span class="help-block" v-if="helpText">{{helpText}}</span>' + '           <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' + '       </div>' + '   </div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: function validator(value) {
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
    data: function data() {
        return {
            options: [],
            selected: {}
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.$parent.addElement(this);
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(function () {
            return _this.errors.items;
        }, function (newValue, oldValue) {
            _this.$eventHub.$emit('errors-changed', newValue, oldValue, _this.name);
        });

        if (this.value !== null && this.value !== "") {
            this.findByValue(this.value).select();
            this.updateValue(this.value);
        }
    },
    created: function created() {
    },

    watch: {
        value: function value(newValue, oldValue) {
            if (oldValue) this.findByValue(oldValue).unSelect();
            if (newValue) this.findByValue(newValue).select();
            this.$validator.validateAll();
        }
    },
    computed: {
        valid: function () {
            return !this.errors.any();
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        onValidate: function onValidate() {
            this.$validator.validateAll();
        },
        addOption: function addOption(option) {
            if (option) {
                this.options.push(option);
            }
        },
        findByValue: function findByValue(value) {
            return this.options.find(function (option) {
                return option.value === value;
            });
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
