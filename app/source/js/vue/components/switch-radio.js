Vue.component('radio-group', {
    template: '<div>' +
    '<h4>{{header}}</h4>' +
    '<slot></slot>' +
    '</div>',
    props: {
        header: {
            type: String,
            default: 'Header'
        },
        name: {
            type: String,
            default: 'name',
            required: true
        },
        rules: {
            type: String
        }
    },
    methods: {},


});

Vue.component('radio-option', {
    template: '<div class="form-group switch-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' +
    '        <div :class="{\'col-sm-4\': ! stacked}" v-if="label">' +
    '            <label class="control-label" :for="id">{{ label }}</label>' +
    '            <p class="help-block" v-if="helper">{{ helper }}</p>' +
    '        </div>' +
    '        <div :class="{\'col-sm-8\': ! stacked  }">' +
    '            <label class="switch-component">' +
    '                <input :value="value" type="radio" :id="id" :name="name" v-on:change="updateValue($event.target.value)" v-validate :data-vv-rules="rules">' +
    '            </label>' +
    '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>' +
    '        </div>' +
    '    </div>',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {

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
        labelColumn: {
            type: String,
            default: 'col-sm-2'
        },
        inputColumn: {
            type: String,
            default: 'col-sm-10'
        },
        value: {},

    },
    computed: {
        name: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$options.propsData.name : '';
        },
        rules: function () {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$options.propsData.rules : '';
        }
    },
    mounted() {
        this.$parent.$emit('veeValidate', 'test');
        console.log(this.$parent);
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value)
        }
    }
});