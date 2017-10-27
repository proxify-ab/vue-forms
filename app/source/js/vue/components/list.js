Vue.component('list-box', {
    template: '<div class="form-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' +
    '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">' +
    '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>' +
    '            <p class="help-block" v-text="helper" v-if="helper"></p>' +
    '        </div>' +
    '        <div class="control-container" :class="{\'col-sm-8\': (!stacked && label)}">' +
    '            <div :class="{\'input-group\': usingAddons}">' +
    '                <div class="input-group-addon" v-if="slotExists(\'leftAddon\')">' +
    '                    <slot name="leftAddon"></slot>' +
    '                </div>' +
    '                <div class="input-group-btn" v-if="slotExists(\'leftBtn\')">' +
    '                    <slot name="leftBtn"></slot>' +
    '                </div>' +
    '<div class="wrap-controller">' +
    '                <select :name="name" :id="name" class="form-control" v-on:change="updateValue($event.target.value)" v-validate :data-vv-rules="rules">' +
    '                    <option value="" readonly v-text="placeholder" v-if="placeholder"' +
    '                            :selected="value == null || value == \'\'"></option>' +
    '                    <option v-if="!keyName && !keyValue" v-for="option in options" :value="option" v-text="option"' +
    '                            :selected="option == value"></option>' +
    '                    <option v-if="keyName && keyValue" v-for="option in options" :value="option[keyValue]" v-text="option[keyName]"' +
    '                            :selected="option[keyValue] == value"></option>' +
    '                </select>' +
    '</div>' +
    '                <div class="input-group-addon" v-if="slotExists(\'rightAddon\')">' +
    '                    <slot name="rightAddon"></slot>' +
    '                </div>' +
    '                <div class="input-group-btn" v-if="slotExists(\'rightBtn\')">' +
    '                    <slot name="rightBtn"></slot>' +
    '                </div>' +
    '            </div>' +
    '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>' +
    '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>' +
    '        </div>' +
    '        <div class="clearfix"></div>' +
    '    </div>',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
        },
        options: {
            required: true,
        },
        keyName: String,
        keyValue: String,
        helper: String,
        showError: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        stacked: {
            type: Boolean,
            default: false
        },
        value: {},
        required: {
            type: Boolean,
            default: false
        },
        errorMessage: String,
        rules: String
    },
    methods: {
        slotExists(name) {
            return (name in this.$slots);
        },
        updateValue(value) {
            this.$emit('input', value)
        }
    },
    computed: {
        usingAddons() {
            return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object)
        },
    },
    updated() {
        if (this.options.length) {
            let element = document.getElementById(this.name);
            if (element.options[element.selectedIndex]) {
                this.updateValue(element.options[element.selectedIndex].value);
            }
        }
    }
});