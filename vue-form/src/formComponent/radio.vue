<template>
    <div :class="{'d-inline':inline}">
        <label :for="id" class="radio-box radio-box-inline control-label" :class="{ 'active': choice === value }">
            <input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="choice"
                   @change="updateValue" :class="classes" :checked="choice === value">
            <slot></slot>
            <i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger"
               :title="popoverTitle"
               :data-content="popoverContent" v-if="popoverContent"></i></label>
        <span class="help-block" v-if="helpText">{{helpText}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            id: {
                type: String
            },
            idSlots: {
                type: Array
            },
            idAlertSlots: {
                type: Array
            },
            classes: {
                type: String
            },
            value: {
                type: [Boolean, String, Number]
            },
            choice: {
                type: [Boolean, String, Number]
            },
            helpText: {
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
            }
        },
        mounted() {
            this.$parent.addRadio(this);
            if (this.value !== "" && this.value) {
                this.$validator.validateAll()
            }
            this.$emit('after-mounted', this)
        },
        computed: {
            name: function () {
                return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : '';
            },
            rules: function () {
                return this.$parent.$options.propsData !== undefined ? this.$parent.$props.rules : '';
            },
            inline: function () {
                return this.$parent.$options.propsData !== undefined ? this.$parent.$props.inlineItems : false;
            },
            validated: {
                set: function (value) {
                    this.fields[this.name].validated = value
                },
                get: function () {
                    return this.fields[this.name].validated
                }
            },
            valid() {
                return this.fields[this.name].valid
            }
        },
        methods: {
            updateValue(e) {
                this.$emit('input', e.target.value);
            },
        },
    }
</script>

<style scoped lang="scss">

    .radio-box {
        position: relative;
        padding: 10px 15px 10px 40px;
        border: 1px solid #eee;
        border-radius: 3px;
    }

    .radio-box input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        width: 15px;
        margin: auto
    }

    .has-error .radio-box {
        border-color: #a94442
    }

    .has-success .radio-box {
        border-color: #3c763d
    }

</style>
