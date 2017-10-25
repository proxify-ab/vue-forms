Vue.component('input-box', {
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
    '\n' +
    '                <input :type="type" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" class="form-control" v-on:keyup.enter="enterKeyPressed"\n' +
    '                       :name="name" :id="id" :readonly="readonly" :value="value" :placeholder="placeholder" v-validate :data-vv-rules="rules">\n' +
    '\n' +
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
    '    </div>',
    props: {
        name: {
            type: String,
            required: true
        },
        label: String,
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
        value: [String, Number],
        type: {
            type: String,
            default: () => {
                return 'text';
            }
        },
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        id: String,
        errorMessage: String,
        rules: String
    },
    computed: {
        usingAddons() {
            return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object)
        }
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
        slotExists(name) {
            return (name in this.$slots);
        }
    }

});