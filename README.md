# For get started need
* Installed npm and bower globally `npm i -g bower`
* Run command `npm i` and `bower i`
* Run command `gulp`

### Filters:
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
<code>
value = value.replace(' Väg', ' väg');
    value = value.replace(' Lgh', ' lgh');
    value = value.replace(' Allé', ' allé');
    value = value.replace(' Gata', ' gata');
    value = value.replace(' Backe', ' backe');
    value = value.replace(' C/o ', ' c/o ');
</code>    
* postalCode
`change the text by leading the text to the desired look 11111 => 111 11`
* phoneNumber
`change the text by leading the text to the desired look (phone format)`