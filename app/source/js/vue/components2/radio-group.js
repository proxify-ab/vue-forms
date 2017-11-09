Vue.component('v-radio-group', {
    template: '<div class="form-group row"><div :class="[inline ? \'col-md-3\' : \'col-md-12\']" v-if="header"><label>{{header}}</label></div><div :class="[ inline ? \'col-md-9\' : \'col-md-12\' ]"><slot></slot></div></div>',
    props: {
        name: {
            type: String,
            required: true
        },
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    mounted() {

    },
    methods: {}
});