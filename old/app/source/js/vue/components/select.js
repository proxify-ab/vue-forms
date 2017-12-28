Vue.component('v-select', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && ( fields[name].touched || validateOnCreate) && valid}">' +
    '   <div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="label"><label class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label></div>' +
    '       <div :class="[inline ? \'col-md-9\' : selectCols ]">' +
    '           <div :class="{\'validation validation-select\' : rules}">' +
    '               <select v-validate :data-vv-rules="rules" :name="name" :id="id" :class="classes" class="form-control" @change="updateValue($event.target.value)" :multiple="multiple">' +
    '                   <option v-if="emptyOption" v-text="emptyLabel" value=""></option>' +
    '                   <option v-for="option in options" :value="option.value" v-text="option.label" :selected="option.value == value"></option>' +
    '               </select>' +
    '           </div>' +
    '           <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '           <span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span>' +
    '       </div>' +
    '   </div>' +
    '</div>',
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
        multiple: {
            type: Boolean,
            default: false
        },
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
        },
        options: {
            type: Array
        },
        emptyOption: {
            type: Boolean,
            default: false
        },
        emptyLabel: {
            type: String,
            default: 'Empty'
        }
    },
    mounted() {
        this.$parent.addElement(this);
        // if (this.value !== null && this.value !== "") {
        //     this.updateValue(this.value);
        // }
    },
    created() {
        if (this.value !== null && this.value !== "") {
            this.updateValue(this.value);
        }
    },

    watch: {
        // value: function value(newValue, oldValue) {
        //     this.$validator.validateAll();
        // }
    },
    computed: {
        valid: function () {
            return !this.errors.any();
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value);
        },
        validate() {
            this.$validator.validateAll();
        }
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeElement(this);
    }
});
