VeeValidate.Validator.extend('indexOf', {
    getMessage: field => 'The ' + field + ' contains numeric.',
    validate(value, args) {
        return !parseInt(value.replace(/\D/g, ''));
    }
});

//upper
Vue.filter('upperCase', function (value) {
    return value.toUpperCase();
});

//lower
Vue.filter('lowerCase', function (value) {
    return value.toLowerCase();
});

//trim
Vue.filter('trim', function (value) {
    return value.trim();
});

//number
Vue.filter('number', function (value) {
    return Number(value);
});

//bool
Vue.filter('bool', function (value) {
    return Boolean(value);
});

//string
Vue.filter('string', function (value) {
    return String(value);
});

//title
Vue.filter('title', function (value) {
    return value.replace(/\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
});

//replace
Vue.filter('replace', function (value, strWith, strTo) {
    let regex = new RegExp(strWith, 'g');
    return value.replace(regex, strTo);
});

//address
Vue.filter('address', function (value) {
    value = value.replace(' Väg', ' väg');
    value = value.replace(' Lgh', ' lgh');
    value = value.replace(' Allé', ' allé');
    value = value.replace(' Gata', ' gata');
    value = value.replace(' Backe', ' backe');
    value = value.replace(' C/o ', ' c/o ');

    return value;
});

//postalCode
Vue.filter('postalCode', function (value) {
    if (value.match(/[0-9]{5}/)) {
        return value.substr(0, 3) + ' ' + value.substr(3, 2);
    }
    return value;
});

//phoneNumber
Vue.filter('phoneNumber', function (value) {
    let re = /(?:([\d]{1,}?))??(?:([\d]{1,3}?))??(?:([\d]{1,3}?))??(?:([\d]{2}))??([\d]{2})$/;
    return value.replace(/[^0-9]/g, '').replace(re, function (all, a, b, c, d, e) {
        return ( a ? "+ " + a + " " : "" ) + ( b ? b + " " : "" ) + ( c ? c + "-" : "" ) + ( d ? d + "-" : "" ) + e;
    });
});

