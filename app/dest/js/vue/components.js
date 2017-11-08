'use strict';

Vue.component('button-box', {
    template: '<button :type="type" @click.prevent="click">{{value}}</button>',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        value: {
            type: String,
            require: true
        },
        click: {
            type: Function,
            default: function _default() {
                alert('Click');
            }
        }
    },
    methods: {},
    computed: {}
});
'use strict';

Vue.component('form-box', {
    template: '<form><slot></slot></form>',
    props: {},
    methods: {},
    computed: {}
});
'use strict';

Vue.component('input-box', {
    template: '<div class="form-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">\n' + '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">\n' + '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>\n' + '            <p class="help-block" v-text="helper" v-if="helper"></p>\n' + '        </div>\n' + '        <div class="control-container" :class="{\'col-sm-8\': (!stacked && label)}">\n' + '            <div :class="{\'input-group\': usingAddons}">\n' + '                <div class="input-group-addon" v-if="slotExists(\'leftAddon\')">\n' + '                    <slot name="leftAddon"></slot>\n' + '                </div>\n' + '                <div class="input-group-btn" v-if="slotExists(\'leftBtn\')">\n' + '                    <slot name="leftBtn"></slot>\n' + '                </div>\n' + '               <div class="wrap-controller">' + '                   <input :type="type" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" class="form-control" v-on:keyup.enter="enterKeyPressed"\n' + '                       :name="name" :id="id" :readonly="readonly" :value="value" :placeholder="placeholder" v-validate.touched :data-vv-rules="rules" @click.prevent="click">\n' + '                </div>' + '                <div class="input-group-addon" v-if="slotExists(\'rightAddon\')">\n' + '                    <slot name="rightAddon"></slot>\n' + '                </div>\n' + '                <div class="input-group-btn" v-if="slotExists(\'rightBtn\')">\n' + '                    <slot name="rightBtn"></slot>\n' + '                </div>\n' + '            </div>\n' + '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>\n' + '            <p class="text-danger" v-text="this.errors.first(name)"></p>\n' + '        </div>\n' + '        <div class="clearfix"></div>\n' + '    </div>',
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
            default: function _default() {
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
            default: function _default() {
                if (this.type === 'submit') console.log(this.name + ' click');
            }
        }
    },
    watch: {
        value: function value(_value) {
            this.$validator.validateAll();
        }
    },
    computed: {
        usingAddons: function usingAddons() {
            return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object);
        }
    },
    methods: {
        enterKeyPressed: function enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        blur: function blur(value) {
            this.$emit('blur', value);
        },
        slotExists: function slotExists(name) {
            return name in this.$slots;
        }
    }

});
'use strict';

Vue.component('list-box', {
    template: '<div class="form-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' + '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">' + '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>' + '            <p class="help-block" v-text="helper" v-if="helper"></p>' + '        </div>' + '        <div class="control-container" :class="{\'col-sm-8\': (!stacked && label)}">' + '            <div :class="{\'input-group\': usingAddons}">' + '                <div class="input-group-addon" v-if="slotExists(\'leftAddon\')">' + '                    <slot name="leftAddon"></slot>' + '                </div>' + '                <div class="input-group-btn" v-if="slotExists(\'leftBtn\')">' + '                    <slot name="leftBtn"></slot>' + '                </div>' + '<div class="wrap-controller">' + '                <select :name="name" :id="name" class="form-control" v-on:change="updateValue($event.target.value)" v-validate :data-vv-rules="rules">' + '                    <option value="" readonly v-text="placeholder" v-if="placeholder"' + '                            :selected="value == null || value == \'\'"></option>' + '                    <option v-if="!keyName && !keyValue" v-for="option in options" :value="option" v-text="option"' + '                            :selected="option == value"></option>' + '                    <option v-if="keyName && keyValue" v-for="option in options" :value="option[keyValue]" v-text="option[keyName]"' + '                            :selected="option[keyValue] == value"></option>' + '                </select>' + '</div>' + '                <div class="input-group-addon" v-if="slotExists(\'rightAddon\')">' + '                    <slot name="rightAddon"></slot>' + '                </div>' + '                <div class="input-group-btn" v-if="slotExists(\'rightBtn\')">' + '                    <slot name="rightBtn"></slot>' + '                </div>' + '            </div>' + '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>' + '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>' + '        </div>' + '        <div class="clearfix"></div>' + '    </div>',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        options: {
            required: true
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
        slotExists: function slotExists(name) {
            return name in this.$slots;
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        }
    },
    computed: {
        usingAddons: function usingAddons() {
            return !(Object.keys(this.$slots).length === 0 && this.$slots.constructor === Object);
        }
    },
    updated: function updated() {
        if (this.options.length) {
            var element = document.getElementById(this.name);
            if (element.options[element.selectedIndex]) {
                this.updateValue(element.options[element.selectedIndex].value);
            }
        }
    }
});
'use strict';

Vue.component('switch-check', {
    template: '<div class="form-group switch-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' + '        <div :class="{\'col-sm-4\': ! stacked}" v-if="label">' + '            <label class="control-label" :for="id">{{ label }}</label>' + '            <p class="help-block" v-if="helper">{{ helper }}</p>' + '        </div>' + '        <div :class="{\'col-sm-8\': ! stacked  }">' + '            <label class="switch-component">' + '                <div class="wrap-controller">' + '                    <input v-validate :data-vv-rules="rules" type="checkbox" :id="id" :name="name" :checked="checked" v-on:change="updateValue($event.target.checked)" :class="{\'has-error\': this.errors.has(name)}">' + '                </div>' + '                <div class="slider round">' + '                    <span class="yes-label" v-if="labels">Yes</span>' + '                    <span class="no-label" v-if="labels">No</span>' + '                </div>' + '            </label>' + '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>' + '        </div>' + '    </div>',
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
        checked: {
            type: Boolean,
            default: false
        },
        labelColumn: {
            type: String,
            default: 'col-sm-2'
        },
        inputColumn: {
            type: String,
            default: 'col-sm-10'
        },
        rules: String
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('change', value);
        }
    }
});
'use strict';

Vue.component('switch-group', {
    template: '',
    props: {},
    mounted: function mounted() {},
    methods: {}
});
'use strict';

Vue.component('radio-group', {
    template: '<div>' + '<h4>{{header}}</h4>' + '<slot></slot>' + '</div>',
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
    methods: {}

});

Vue.component('radio-option', {
    template: '<div class="form-group switch-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">' + '        <div :class="{\'col-sm-4\': ! stacked}" v-if="label">' + '            <label class="control-label" :for="id">{{ label }}</label>' + '            <p class="help-block" v-if="helper">{{ helper }}</p>' + '        </div>' + '        <div :class="{\'col-sm-8\': ! stacked  }">' + '            <label class="switch-component">' + '                <input :value="value" type="radio" :id="id" :name="name" v-on:change="updateValue($event.target.value)" v-validate :data-vv-rules="rules">' + '            </label>' + '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>' + '        </div>' + '    </div>',
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
        value: {}

    },
    computed: {
        name: function name() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$options.propsData.name : '';
        },
        rules: function rules() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$options.propsData.rules : '';
        }
    },
    mounted: function mounted() {
        this.$parent.$emit('veeValidate', 'test');
        console.log(this.$parent);
    },

    methods: {
        updateValue: function updateValue(value) {
            this.$emit('change', value);
        }
    }
});
'use strict';

Vue.component('textarea-box', {
    template: ' <div class="form-group" :class="{\'has-error\': this.fields[name].touched && this.fields[name].invalid, \'has-success\': this.fields[name].touched && this.fields[name].valid,  \'has-helper\': helper, \'stacked\': stacked }">\n' + '        <div :class="{\'col-sm-4\': !stacked}" v-if="label">\n' + '            <label class="control-label">{{ label }}: <span v-if="required">*</span></label>\n' + '            <p class="help-block" v-text="helper" v-if="helper"></p>\n' + '        </div>\n' + '        <div class="control-container" :class="{\'col-sm-8\': !stacked}">\n' + '            <textarea v-validate :data-vv-rules="rules" :name="name" id="name" :rows="rows" v-on:input="updateValue($event.target.value)"\n' + '                      :value="value" class="form-control"></textarea>\n' + '            <p class="text-danger" v-if="showError" v-text="errorMessage"></p>\n' + '            <p class="text-danger" v-if="this.errors.has(name)" v-text="this.errors.first(name)"></p>\n' + '        </div>\n' + '        <div class="clearfix"></div>\n' + '    </div>',
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
        rules: String,
        rows: {
            type: Number,
            default: 5
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        }
    }
});
'use strict';

Vue.component('v-button', {
    template: '<button :type="type" :class="classes" :id="id">{{value}}</button>',
    props: {
        type: {
            type: String,
            validate: function validate(value) {
                return ['button', 'submit'].indexOf(value) > -1;
            },
            required: true
        },
        classes: {},
        id: {},
        value: {
            type: String
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-check-group', {
    template: '<div class="form-group row"><div class="col-md-3" v-if="header"><label>{{header}}</label></div><div class="col-md-9"><slot></slot></div></div>',
    props: {
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-check', {
    template: '<div :class="{\'form-group\':single, \'display-inline\':inline}">' + '<input type="checkbox" :name="name" :id="id" :value="value" :checked="checked" v-on:change="updateValue($event.target.checked)">' + '<label :for="id" v-if="label">{{label}}</label>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String
        },
        classes: String,
        label: {
            type: String,
            required: true
        },
        checked: Boolean,
        value: {}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {},

    methods: {
        updateValue: function updateValue(value) {
            this.$emit('change', value);
        }
    },
    computed: {
        inline: function inline() {
            return this.$parent.$options.name === 'v-check-group' ? this.$parent.$props.inline : false;
        },
        single: function single() {
            return this.$parent.$options.name !== 'v-check-group';
        }
    }
});
'use strict';

Vue.component('v-form', {
    template: '<form :class="{\'form-inline\':inline, classes}" @submit.prevent="submit"><slot></slot></form>',
    props: {
        inline: {
            type: Boolean,
            default: false
        },
        classes: {
            type: String
        },
        submit: {
            type: Function
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-input', {
    template: '<div class="form-group row" >' + '<div :class="[inline ? \'col-md-3\' : \'col-md-12\']">' + '<label v-if="label">{{label}}</label>' + '</div>' + '<div :class="[inline ? \'col-md-9\' : \'col-md-12\']">' + '<input :type="type" :id="id" :class="classes" class="form-control" :name="name" :value="value" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder">' + '<span v-show="errors.has(name)" class="help is-danger">{{ errors.first(name) }}</span>' + '</div>' + '<span v-if="this.errors.has(name)">{{ errors.first(name) }}</span>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: function validator(value) {
                return ['hidden', 'text', 'number'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    mounted: function mounted() {},

    methods: {
        enterKeyPressed: function enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        blur: function blur(value) {
            this.$emit('blur', value);
        }
    }
});
'use strict';

Vue.component('v-radio-group', {
    template: '<div class="form-group row"><div class="col-md-3" v-if="header"><label>{{header}}</label></div><div :class="[ header ? \'col-md-9\' : \'col-md-12\' ]"><slot></slot></div></div>',
    props: {
        name: {
            type: String,
            required: true
        },
        header: {
            type: String
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-radio', {
    template: '<div><input type="radio" :name="name" :id="id" :value="value" v-on:change="updateValue($event.target.value)"><label :for="id" v-if="label">{{label}}</label></div>',
    props: {
        type: {},
        id: {},
        classes: {},
        label: {},
        value: {}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    mounted: function mounted() {},

    computed: {
        name: function name() {
            return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : 'radio-btn';
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('change', value);
        }
    }
});
'use strict';

Vue.component('v-select-option', {
    template: '<option :value="value">{{label}}</option>',
    props: {
        value: {
            required: true
        },
        label: {
            type: String,
            default: 'label'
        }
    },
    mounted: function mounted() {},

    methods: {}
});
'use strict';

Vue.component('v-select', {
    template: '<div class="form-group row">' + '<div :class="[inline? \'col-md-3\' : \'col-md-12\']" v-if="label"><label>{{label}}</label></div>' + '<div :class="[inline? \'col-md-9\' : \'col-md-12\']">' + '<select :name="name" :id="id" :class="classes" class="form-control" v-on:change="updateValue($event.target.value)"><slot></slot></select>' + '</div>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {},
        classes: {},
        label: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    mounted: function mounted() {},

    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        }
    }
});
'use strict';

Vue.component('v-textarea', {
    template: '<div class="form-group row" >' + '<div :class="[inline?\'col-md-3\':\'col-md-12\']">' + '<label v-if="label">{{label}}</label>' + '</div>' + '<div :class="[inline?\'col-md-9\':\'col-md-12\']">' + '<textarea :id="id" :class="classes" class="form-control" :name="name" v-on:input="updateValue($event.target.value)" v-on:blur="blur($event.target.value)" :placeholder="placeholder">{{value}}</textarea>' + '</div>' + '<span v-if="this.errors.has(name)">{{ errors.first(name) }}</span>' + '</div>',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: function validator(value) {
                return ['hidden', 'text', 'number'].indexOf(value) > -1;
            },
            default: 'text'
        },
        id: {},
        classes: {
            type: String
        },
        value: {},
        placeholder: {},
        inline: {
            type: Boolean,
            default: false
        },
        label: {
            type: String
        }
    },
    mounted: function mounted() {},

    methods: {
        enterKeyPressed: function enterKeyPressed() {
            this.$emit('enter');
        },
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        blur: function blur(value) {
            this.$emit('blur', value);
        }
    }
});