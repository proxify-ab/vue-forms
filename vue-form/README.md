# vue-form

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

# For correct work validation need:

```bash
# npm i --save-dev vee-validate

```

# Form and steps components

> for using the components you have to copy 'src/formComponent'  and 'src/stepComponent' in the necessary directory and connect the necessary components

## Example include (the connection example)

> in any existing component you need to connect necessary components, for example:
 
```
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
```

> Then (describe components in parent one (where they will be used))

```
 ...
 components: {
      VButton, VTextArea, VInput, VRadioGroup, VRadio, VCheck, VCheckGroup, VStep, VSteps, VDatePicker, VSelect
    },
 ...
```

# Structure components for correct work

```
<v-steps>
    <v-step>
        <v-input></v-input>
        ... (any form component)
    </v-step>
    <v-step>
        <v-input></v-input>
        ... (any form component)
    </v-step>
    <v-step>
        <v-input></v-input>
        ... (any form component)
    </v-step>
    ...(any count step)
</v-steps>  
``` 
> For example you can sees App.vue component with worked code [App.vue](src/App.vue)
