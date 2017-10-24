Vue.component('textarea-box', {
    template: ' <div class="form-group" :class="{\'has-error\': this.errors.has(name), \'has-helper\': helper, \'stacked\': stacked }">\n' +
    '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">\n' +
    '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>\n' +
    '            <p class="help-block" v-text="helper" v-if="helper"></p>\n' +
    '        </div>\n' +
    '        <div class="control-container" :class="{\'col-sm-8\': !stacked}">\n' +
    '            <textarea v-validate.initial :data-vv-rules="rules" :name="name" id="name" rows="5" v-on:input="updateValue($event.target.value)"\n' +
    '                      :value="value" class="form-control"></textarea>\n' +
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
        label: {
            type: String
        },
        helper: String,
        showError: {
            type: Boolean,
            default: false
        },
        stacked: {
            type: Boolean,
            default: false
        },
        value: [String],
        required: {
            type: Boolean,
            default: false
        },
        id: String,
        errorMessage: String,
        rules: String
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        }
    }
});