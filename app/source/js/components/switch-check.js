Vue.component('switch-check', {
   template: '<div class="form-group switch-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' +
   '        <div :class="{\'col-sm-4\': ! stacked}" v-if="label">' +
   '            <label class="control-label" :for="id">{{ label }}</label>' +
   '            <p class="help-block" v-if="helper">{{ helper }}</p>' +
   '        </div>' +
   '        <div :class="{\'col-sm-8\': ! stacked  }">' +
   '            <label class="switch-component">' +
   '                <div class="wrap-controller">' +
   '                    <input type="checkbox" :id="id" :name="name" :checked="checked" v-on:change="updateValue($event.target.value)" :class="{\'has-error\': this.errors.has(name)}">' +
   '                </div>' +
   '                <div class="slider round">' +
   '                    <span class="yes-label" v-if="labels">Yes</span>' +
   '                    <span class="no-label" v-if="labels">No</span>' +
   '                </div>' +
   '            </label>' +
   '        </div>' +
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