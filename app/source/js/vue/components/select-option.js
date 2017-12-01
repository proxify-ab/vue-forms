Vue.component('v-select-option', {
    template: '<option :value="value" :selected="selected"><slot></slot></option>',
    props: {
        value: {
            required: true
        }
    },
    data() {
        return {
            selected: false
        }
    },
    mounted() {
        this.$parent.addOption(this);
    },
    methods: {
        select() {
            this.selected = true;
        },
        unSelect(){
            this.selected = false;
        }
    }
});