#Vue-Forms

### For get started need
* Installed npm and bower globally `npm i -g bower`
* Run command `npm i` and `bower i`
* Run command `gulp`

### Filters:

To use filters yot must connect the filters.js file

* upperCase
`transform the text in uppercase`
* lowerCase
`transform the text in lowercase`
* trim
`remove needless space before, after and between text (more 1 space)` 
* number
`converting the value to Number type`
* boolean
`converting the value to Boolean type`
* title
`transform the words, change first char to uppercase` 
* replace
`change the by text replacing the first parameter to second parameter ` **{{ value | replace('a','b')}}**
* address
`changing the text by replacing the parts by example`
`value = value.replace(' Väg', ' väg');
value = value.replace(' Lgh', ' lgh');
value = value.replace(' Allé', ' allé');
value = value.replace(' Gata', ' gata');
value = value.replace(' Backe', ' backe');
value = value.replace(' C/o ', ' c/o ');`
* postalCode
`change the text by leading the text to the desired look 11111 => 111 11`
* phoneNumber
`change the text by leading the text to the desired look (phone format)`

### Components

To use components, you must connect the component.js file

for all components can to use attributes:
* name `(name for input)`
    * type: String
    * required: true
* id `(id for input)`
    * String
    * required: false
* label `(label for input)`
    * String
    * required: false
* required `(rule for validate)`
    * Boolean
    * required: false
* readonly
    * Boolean
    * required: false
* show-error `(check show or hide error message)`
    * Boolean
    * required: false
* error-message
    * String
    * required: false
* stacked `(check inline or column form component)`
    * type: Boolean
* rules `(rules for vee-validate)`
    * type: String

* **input (input-box) attributes:**
    * type
        * type: String
        * default: text
        * required: false
    * placeholder
        * String
        * required: false
    * value
        * type: [String, Number, Boolean]
* **list (list-box) attributes:**
    * options `(items for show in select)`
        * type: Array
        * required: true
    * keyName `(set witch field use for label)`
        * type: String,
    * keyValue `(set witch field use for value)`
        * type: String,
    
* **switch-check (switch-check) attributes:**
    * labelColumn
        * type: String,
        * default: 'col-sm-2'
    * inputColumn
        * type: String,
        * default: 'col-sm-10'
    * value
        * type: 
* **switch-radio (switch-radio) attributes:**
    * labelColumn
        * type: String,
        * default: 'col-sm-2'
    * inputColumn
        * type: String,
        * default: 'col-sm-10'
* **textarea (textarea-box) attributes:**
    * rows
        * type: Number
        * default: 5