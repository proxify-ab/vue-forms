Vue.component('input-box', {
    template: '<div class="form-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">\n' +
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
    '               <div class="wrap-controller">' +
    '                   <input :type="type" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" class="form-control" v-on:keyup.enter="enterKeyPressed"\n' +
    '                       :name="name" :id="id" :readonly="readonly" :value="value" :placeholder="placeholder" v-validate.touched :data-vv-rules="rules" @click.prevent="click">\n' +
    '                </div>' +
    '                <div class="input-group-addon" v-if="slotExists(\'rightAddon\')">\n' +
    '                    <slot name="rightAddon"></slot>\n' +
    '                </div>\n' +
    '                <div class="input-group-btn" v-if="slotExists(\'rightBtn\')">\n' +
    '                    <slot name="rightBtn"></slot>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>\n' +
    '            <p class="text-danger" v-text="this.errors.first(name)"></p>\n' +
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
        value: [String, Number, Boolean],
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
        rules: String,
        click: {
            type: Function,
            default: function () {if(this.type === 'submit')console.log(this.name + ' click')}
        }
    },
    watch: {
        value(value) {
            this.$validator.validateAll();
        }
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