Vue.component('v-radio', {
    template: '<div :class="{\'d-inline\':inline}">' +
    '<label :for="id" class="radio-box radio-box-inline control-label">' +
    '<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value" @change="updateValue($event.target.value)" :class="classes">' +
    '<slot></slot> <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' +
    '<span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '</div>',
    props: {
        id: {
            type: String
        },
        idSlots: {
            type: Array
        },
        idAlertSlots: {
            type: Array
        },
        classes: {
            type: String
        },
        value: {
            type: [String, Number, Boolean]
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
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted() {
        this.$parent.addRadio(this);
        // this.$eventHub.$on(this.name + '_validate', this.onValidate);
        // this.$watch(() => this.errors.items, (newValue, oldValue) => {
            // this.$eventHub.$emit(this.name + '_return_validate', newValue, oldValue);
        // })
    },
    computed: {
        name: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : '';
        },
        rules: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.rules : '';
        },
        inline: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.inlineItems : false;
        },
        valid() {
            return this.fields[this.name].valid;
        }
    },

    methods: {
        updateValue(value) {
            this.$parent.setSelected(this);
            this.$emit('change', value);
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
});