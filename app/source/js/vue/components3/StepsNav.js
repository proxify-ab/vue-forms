Vue.component('v-step-nav', {
    template: '<div class="steps-navigation"><div class="steps-navigation-progress"><div class="steps-navigation-progress-bar" :style="style"></div></div></div>',
    props: {
        width: {
            type: Number,
            default: 0
        }
    },
    mounted() {

    },
    computed: {
        style: function () {
            return {
                width: this.width + '%'
            };
        }
    },
    methods: {}
});