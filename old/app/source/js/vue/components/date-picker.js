Vue.component('v-date-picker', {
    template:
    '<div class="form-group row" :class="{\'has-error\':errors.first(name), \'has-success\':!errors.first(name) && fields[name].valid   }">' +
    '   <div :class="{\'col-md-12\':!inline}">' +
    '       <div :class="{\'row\':!inline}">' +
    '           <div :class="labelCols">' +
    '               <label v-if="label" class="control-label">{{label}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverContent"></i></label>' +
    '           </div>' +
    '       </div>' +
    '       <div :class="{\'row\':!inline}">' +
    '           <div :class="[inputCols , \'form-inline\']">' +
    '               <select :class="classes" class="d-inline day form-control" @change="updateValue" v-model="day" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' +
    '                   <option value>{{dayLabel}}</option>' +
    '                   <option v-for="day in days" :value="day">{{day}}</option>' +
    '               </select>' +
    '               <select :class="classes" class="d-inline month form-control" @change="updateValue" v-model="month" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' +
    '                   <option value>{{monthLabel}}</option>' +
    '                   <option v-for="(month, index) in months" :value="index +1">{{month}}</option>' +
    '               </select>' +
    '               <select :class="classes" class="d-inline year form-control" @change="updateValue" v-model="year" :name="name" v-validate :data-vv-value="value" :data-vv-rules="rules" :data-vv-validate-on="validateEvent" :required="required">' +
    '                   <option value>{{yearLabel}}</option>' +
    '                   <option v-for="year in years" :value="year">{{year}}</option>' +
    '               </select>' +
    '               <input type="hidden" :name="name" :value="value" :id="id">' +
    '               <span class="help-block" v-if="helpText">{{helpText}}</span>' +
    '           </div>' +
    '           <div class="col-md-12"><span v-if="errors.has(name)" class="small text-danger"><i class="fa fa-warning"></i>{{ errors.first(name) }}</span></div>' +
    '       </div>' +
    '   </div>' +
    '</div>',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => {
                return value !== '';
            }
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
        rules: {
            type: String,
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
        valid() {
            return this.fields[this.name].valid;
        }
    },
    data() {
        return {
            day: "",
            month: "",
            year: "",
        };
    },
    mounted() {
        this.$parent.addElement(this);
        // this.$eventHub.$on('validate_' + this.$parent._uid, this.onValidate);
        // this.$watch(() => this.errors.items, (newValue, oldValue) => {
        //     this.$eventHub.$emit('errors-changed', newValue, oldValue, this.name);
        // });
    },
    watch: {
        // valid: function (newValue, oldValue) {
        //     if (newValue) {
        //         this.$parent.addCheckElement();
        //     } else {
        //         this.$parent.removeCheckElement();
        //     }
        // }
    },
    methods: {
        updateValue() {
            if (this.day !== '' && this.month !== '' && this.year !== '') {
                let date = moment(`${this.day}-${this.month}-${this.year}`, 'DD-MM-YYYY').format(this.dateFormat);
                this.$emit('input', date);
            }
        },
        validate() {
            this.$validator.validateAll();
        },
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeElement(this);
    },
});