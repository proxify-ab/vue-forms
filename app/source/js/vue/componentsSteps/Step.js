Vue.component('v-step', {
    template: '<div class="step" v-if="active"><slot></slot></div>',
    props: {
        title: {},
        validating: {},
        // nextStep: {
        //     type: Number,
        //     default: null
        // },
        // prevStep: {
        //     type: Number,
        //     default: null
        // },
        skip: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: false,
            elements: [],
            checkedElements: []
        }
    },
    computed: {
        progress() {
            return 100 / this.elements.length * this.checkedElements.length;
        }
    },
    mounted() {
        this.$parent.addStep(this);

        this.init();

        // this.$eventHub.$on('errors-changed', (newErrors, oldErrors, name) => {
        //     if (oldErrors !== undefined && Array.isArray(oldErrors)) {
        //         if (oldErrors.length === 0) {
        //         } else {
        //             oldErrors.forEach(error => {
        //                 this.errors.remove(error.field)
        //             })
        //         }
        //     }
        //     if (newErrors !== undefined && Array.isArray(newErrors)) {
        //         if (newErrors.length === 0) {
        //             this.errors.remove(name);
        //         } else {
        //             newErrors.forEach(error => {
        //                 if (!this.errors.has(error.field)) {
        //                     this.errors.add(error.field, error.msg, error.rule)
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    watch: {
        progress: function (newValue, oldValue) {
            this.$parent.changeProgress(newValue);
        }
    },
    methods: {
        init() {

        },
        checkElement(element, valid) {
            if (valid) {
                if (this.checkedElements.indexOf(element) === -1) {
                    this.checkedElements.push(element);
                }
            } else {
                if (this.checkedElements.indexOf(element) !== -1) {
                    this.checkedElements.splice(this.checkedElements.indexOf(element), 1);
                }
            }
        },
        validate() {
            this.elements.some(function (item) {
                item.$validator.validateAll();
                if (item.errors.any()) {
                    $('html, body').animate({
                        scrollTop: $(item.$el).offset().top - 20
                    }, 500);
                    $(item.$el).find('[name]')[0].focus();
                    return true;
                }
            });
        },
        // beforeChange() {
        //     this.$emit('on-before-change');
        // },
        addElement(element) {
            this.elements.push(element);
        },
        removeElement(element) {
            const elements = this.elements;
            const index = elements.indexOf(element);
            if (index > -1) {
                elements.splice(index, 1)
            }
        },
        activate() {
            this.active = true;
        },
        deactivate() {
            this.active = false;
        }
    },
    beforeDestroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$parent.removeStep(this)
    }
});