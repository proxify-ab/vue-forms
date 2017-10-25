class Contact {
    constructor(lastName, firstName, gender, age) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.gender = gender;
        this.age = age;
    }

    empty() {
        if (this.fieldEmpty('lastName') && this.fieldEmpty('firstName') && this.fieldEmpty('gender') && this.fieldEmpty('age')) {
            return true;
        }
        return false;
    }

    fieldEmpty(name) {
        if (this[name] !== null && this[name] !== undefined)
            return true;
        else
            return false;
    }
}