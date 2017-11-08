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
    mounted() {

    },
    methods: {}
});