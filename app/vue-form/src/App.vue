<template>
  <div>
    <v-steps>
      <v-step>
        <v-input name="firstName" v-model="firstName">First name</v-input>
        <v-input name="lastName" v-model="lastName">Last name</v-input>
        <v-date-picker name="birthDay" v-model="birthDay">Birthday</v-date-picker>
        <v-radio name="gender" value="male" v-model="gender"></v-radio>
        <v-radio name="gender" value="female" v-model="gender"></v-radio>
      </v-step>
      <v-step>

      </v-step>
    </v-steps>
  </div>
</template>

<script>
  import {VButton, VInput, VRadio, VRadioGroup, VTextArea, VCheck, VCheckGroup, VDatePicker} from './formComponent/formComponents'
  import {VStep, VSteps} from './stepComponent/stepComponents'

  export default {
    data() {
      return {
        firstName: 'Test1',
        lastName: 'Test2',
        birthDay: '11-05-2015',
        gender: "male",
        phone: '',
        email: '',
        workPlace: '',


      }
    },
    components: {
      VButton, VTextArea, VInput, VRadioGroup, VRadio, VCheck, VCheckGroup, VStep, VSteps, VDatePicker
    }
  }
</script>

<style>
</style>
