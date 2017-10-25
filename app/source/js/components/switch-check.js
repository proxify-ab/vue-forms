Vue.component('switch-check', {
   template: '<div class="form-group switch-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">\n' +
   '        <div :class="{\'col-sm-4\': ! stacked}" v-if="label">\n' +
   '            <label class="control-label" :for="id">{{ label }}</label>\n' +
   '            <p class="help-block" v-if="helper">{{ helper }}</p>\n' +
   '        </div>\n' +
   '        <div :class="{\'col-sm-8\': ! stacked  }">\n' +
   '            <label class="switch-component">\n' +
   '                <input type="checkbox" :id="id" :name="name" :checked="checked" v-on:change="updateValue($event.target.value)" :class="{\'has-error\': this.errors.has(name)}">\n' +
   '                <div class="slider round">\n' +
   '                    <span class="yes-label" v-if="labels">Yes</span>\n' +
   '                    <span class="no-label" v-if="labels">No</span>\n' +
   '                </div>\n' +
   '            </label>\n' +
   '        </div>\n' +
   '    </div>',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        name: {
            type: String,
            required: true
        },
        labels: {
            type: Boolean,
            default: false
        },
        label: {
            type: String
        },
        stacked: Boolean,
        helper: String,
        id: String,
        checked: Boolean,
        labelColumn: {
            type: String,
            default: 'col-sm-2'
        },
        inputColumn: {
            type: String,
            default: 'col-sm-10'
        },
        type:{
            type: String,
            default: 'checkbox'
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        }
    }
});