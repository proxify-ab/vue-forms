Vue.component('list-box', {
    template: '<div class="form-group" :class="{\'has-error\': this.errors.has(name), \'has-helper\': helper, \'stacked\': stacked }">\n' +
    '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">\n' +
    '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>\n' +
    '            <p class="help-block" v-text="helper" v-if="helper"></p>\n' +
    '        </div>\n' +
    '        <div class="control-container" :class="{\'col-sm-8\': (!stacked && label)}">\n' +
    '            <div :class="{\'input-group\': usingAddons}">\n' +
    '                <div class="input-group-addon" v-if="slotExists(\'leftAddon\')">\n' +
    '                    <slot name="leftAddon"></slot>\n' +
    '                </div>\n' +
    '                <div class="input-group-btn" v-if="slotExists(\'leftBtn\')">\n' +
    '                    <slot name="leftBtn"></slot>\n' +
    '                </div>\n' +
    '                <select :name="name" :id="name" class="form-control" v-on:change="updateValue($event.target.value)" v-validate :data-vv-rules="rules">\n' +
    '                    <option value="" readonly v-text="placeholder" v-if="placeholder"\n' +
    '                            :selected="value == null || value == \'\'"></option>\n' +
    '                    <option v-if="keyName || keyValue" v-for="option in options" :value="option[keyValue]" v-text="option"\n' +
    '                            :selected="option[keyValue] == value"></option>\n' +
    '                    <option v-else v-for="option in options" :value="option" v-text="option"\n' +
    '                            :selected="option == value"></option>\n' +
    '                </select>\n' +
    '                <div class="input-group-addon" v-if="slotExists(\'rightAddon\')">\n' +
    '                    <slot name="rightAddon"></slot>\n' +
    '                </div>\n' +
    '                <div class="input-group-btn" v-if="slotExists(\'rightBtn\')">\n' +
    '                    <slot name="rightBtn"></slot>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>\n' +
    '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>\n' +
    '        </div>\n' +
    '        <div class="clearfix"></div>\n' +
    '    </div>\n',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
        },
        options: {
            // type: Array,
            required: true,
        },
        keyName: {
            type: String,
            default: null
        },
        keyValue: {
          type: String,
          default: null
        },
        labelName: {
            type: String,
            default: () => {
                return 'label'
            }
        },
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