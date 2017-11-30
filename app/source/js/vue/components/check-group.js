Vue.component('v-check-group', {
    template: '<div class="form-group row">' +
    '<div :class="[inline ? \'col-md-12\' : \'col-md-3\']" v-if="header">' +
    '<label>{{header}} <i :class="\'fa fa-\' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle" :data-content="popoverContent" v-if="popoverLabel">{{popoverLabel}}</i></label>' +
    '</div>' +
    '<div :class="[inline ? \'col-md-9\' : \'col-md-9\']">' +
    '<slot></slot>' +
    '</div>' +
    '</div>',
    props: {
        name: {},
        header: {
            type: String
        },
        inline: {
            type: Boolean,
            default: false
        },
        rules: {
            type: String
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
        },
        popoverLabel: {
            type: String
        },
    },
    mounted() {
    },
    methods: {},
});