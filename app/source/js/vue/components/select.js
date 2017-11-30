Vue.component('v-select', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched && fields[name].valid}">' +
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
        }
    },
    mounted() {
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        })
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
    beforeDestroy() {
        this.$eventHub.$emit('errors-changed', [], this.errors);
        this.$eventHub.$off('validate', this.onValidate)
    },
});