<template>
  <div>
    <v-steps @on-complete="complete">
      <v-step @on-before="before" @on-after="after">
        <v-input rules="required|alpha" validate-event="blur" name="firstName" v-model="firstName">First name</v-input>
        <v-input rules="required" validate-event="blur" name="lastName" v-model="lastName">Last name</v-input>
        <v-date-picker rules="required|maxDateNow:DD-MM-YYYY" name="birthDay" v-model="birthDay" validate-event="blur">Birthday
        </v-date-picker>
        <v-radio-group name="gender" header="Header" rules="required" popover-content="123">
          <v-radio choice="m" v-model="gender">Male</v-radio>
          <v-radio choice="f" v-model="gender">Female</v-radio>
        </v-radio-group>
        <transition name="fade" v-if="gender === 'f'">
          <v-radio-group name="gender" header="Header" rules="required" popover-content="123" @after-mounted="afterMount">
            <v-radio choice="m" v-model="gender">Male</v-radio>
            <v-radio choice="f" v-model="gender">Female</v-radio>
          </v-radio-group>
        </transition>
      </v-step>
      <v-step @on-before="before" @on-after="after">
        <v-input rules="required|numeric" validate-event="blur" name="phone" v-model="phone">Phone</v-input>
        <v-input name="email" validate-event="blur" type="email" v-model="email" rules="email|required">Email</v-input>
        <v-select rules="required" name="workPlace" v-model="workPlace" :options="['home', 'other']"
                  empty-label="Empty"></v-select>
      </v-step>
    </v-steps>
  </div>
</template>

<script>
  import {
    VButton,
    VInput,
    VRadio,
    VRadioGroup,
    VTextArea,
    VCheck,
    VCheckGroup,
    VDatePicker,
    VSelect
  } from './formComponent/formComponents'
  import {VStep, VSteps} from './stepComponent/stepComponents'

  export default {
    data() {
      return {
        firstName: 'Test',
        lastName: 'Test2',
        birthDay: '',
        gender: '',
        phone: '2312131',
        email: 'test@wd.dd',
        workPlace: 'home',
      }
    },
    components: {
      VButton, VTextArea, VInput, VRadioGroup, VRadio, VCheck, VCheckGroup, VStep, VSteps, VDatePicker, VSelect
    },
    mounted() {
      this.afterMount()
    },
    methods: {
      complete() {
        alert('complete')
      },
      after(index) {
        console.warn('after change step index: ' + index)
      },
      before(index) {
        console.warn('before change step index: ' + index)
      },
      afterMount() {
        $('[data-toggle="popover"]').popover()
      }
    }
  }
</script>

<style>
</style>
