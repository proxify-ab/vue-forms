<template>
  <div>
    <input type="radio" :name="name" :value="value" @change="updateValue($event.target.value)"/>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      value: {},
      name: {}
    },
    methods: {
      updateValue(value) {
        this.$emit('change', value)
      }
    }
  }
</script>

<!--<template>-->
<!--<div :class="{'d-inline':inline}">-->
<!--<label :for="id" class="radio-box radio-box-inline control-label">-->
<!--<input v-validate :data-vv-rules="rules" type="radio" :name="name" :id="id" :value="value"-->
<!--@change="updateValue($event.target.value)" :class="classes">-->
<!--<slot></slot>-->
<!--<i :class="'fa fa-' + popoverIcon" data-toggle="popover" :data-trigger="popoverTrigger" :title="popoverTitle"-->
<!--:data-content="popoverContent" v-if="popoverContent"></i></label>-->
<!--<span class="help-block" v-if="helpText">{{helpText}}</span>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--props: {-->
<!--id: {-->
<!--type: String-->
<!--},-->
<!--idSlots: {-->
<!--type: Array-->
<!--},-->
<!--idAlertSlots: {-->
<!--type: Array-->
<!--},-->
<!--classes: {-->
<!--type: String-->
<!--},-->
<!--value: {},-->
<!--helpText: {-->
<!--type: String-->
<!--},-->
<!--popoverIcon: {-->
<!--type: String,-->
<!--default: 'question-circle'-->
<!--},-->
<!--popoverTitle: {-->
<!--type: String-->
<!--},-->
<!--popoverContent: {-->
<!--type: String-->
<!--},-->
<!--popoverTrigger: {-->
<!--default: 'hover'-->
<!--}-->
<!--},-->
<!--model: {-->
<!--prop: 'checked',-->
<!--event: 'change'-->
<!--},-->
<!--mounted() {-->
<!--this.$parent.addRadio(this);-->
<!--},-->
<!--computed: {-->
<!--name: function () {-->
<!--return this.$parent.$options.propsData !== undefined ? this.$parent.$props.name : '';-->
<!--},-->
<!--rules: function () {-->
<!--return this.$parent.$options.propsData !== undefined ? this.$parent.$props.rules : '';-->
<!--},-->
<!--inline: function () {-->
<!--return this.$parent.$options.propsData !== undefined ? this.$parent.$props.inlineItems : false;-->
<!--},-->
<!--valid() {-->
<!--return this.fields[this.name].valid;-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--updateValue(value) {-->
<!--this.$parent.setSelected(this);-->
<!--this.$emit('change', value);-->
<!--},-->
<!--},-->
<!--}-->
<!--</script>-->
