Vue.component('v-date-picker', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].touched}">' +
    '   <div :class="{\'col-md-12\':!inline}">' +
    '       <div :class="{\'row\':!inline}">' +
    '           <div :class="labelCols">' +
    '               <label v-if="label" class="control-label">{{label}}</label>' +
    '           </div>' +
    '       </div>' +
    '       <div :class="{\'row\':!inline}">' +
    '           <div :class="[inputCols , \'form-inline\']">' +
    '               <select :class="classes" class="day form-control" @change="updateValue" v-model="day">' +
    '                   <option value>{{dayLabel}}</option>' +
    '                   <option v-for="day in days" :value="day">{{day}}</option>' +
    '               </select>' +
    '               <select :class="classes" class="month form-control" @change="updateValue" v-model="month">' +
    '                   <option value>{{monthLabel}}</option>' +
    '                   <option v-for="(month, index) in months" :value="index +1">{{month}}</option>' +
    '               </select>' +
    '               <select :class="classes" class="year form-control" @change="updateValue" v-model="year">' +
    '                   <option value>{{yearLabel}}</option>' +
    '                   <option v-for="year in years" :value="year">{{year}}</option>' +
    '               </select>' +
    '               <input type="hidden" :name="name" :value="value" @change="updateValue($event.target.value)" v-validate :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required" :id="id">' +
    '               <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '           </div>' +
    '           <div class="col-md-12"><span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span></div>' +
    '       </div>' +
    '   </div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        validation: {
            type: String
        },
        rules: {
            type: String,
        },
        readonly: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: String,
            default: 'col-md-12'
        },
        inputCols: {
            type: String,
            default: 'col-md-12'
        },
        helpText: {
            type: String
        },
        validateEvent: {
            type: String,
            default: 'input'
        },
        dayLabel: {
            default: 'Day',
        },
        monthLabel: {
            default: 'Month',
        },
        yearLabel: {
            default: 'Year',
        },
        minYear: {
            type: Number,
            default: 1900
        },
        dateFormat: {
            default: 'DD-MM-YYYY'
        }
    },
    computed: {
        days: function () {
            let count = moment(`${this.month}-${this.year}`, "MM-YYYY").daysInMonth();
            return Array.apply(0, Array(isNaN(count) ? 31 : count)).map(function (_, i) {
                return ++i;
            });
        },
        months: function () {
            return Array.apply(0, Array(12)).map(function (_, i) {
                return moment().month(i).format('MMMM');
            });
        },
        years: function () {
            return Array.apply(0, Array(moment().get('years') - this.minYear + 1)).map(function (_, i) {
                return moment().get('years') - i;
            });
        },
    },
    data() {
        return {
            day: "",
            month: "",
            year: "",
        };
    },
    mounted() {
        this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        this.$watch(() => this.errors.items, (newValue, oldValue) => {
            this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        });
    },
    methods: {
        updateValue() {
            if (this.day !== '' && this.month !== '' && this.year !== '') {
                this.$emit('input', moment(`${this.day}-${this.month}-${this.year}`, 'DD-MM-YYYY').format(this.dateFormat));
            }
        },
        onValidate() {
            this.$validator.validateAll();
        },
    },
});