class Contact {
    constructor(lastName, firstName, gender, age, check) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.gender = gender;
        this.age = age;
        this.check = check;
    }

    empty() {
        if (this.fieldEmpty('lastName') || this.fieldEmpty('firstName') || this.fieldEmpty('gender') || this.fieldEmpty('age'))
            return true;
        else
            return false;
    }

    fieldEmpty(name) {
        if (this[name] === null || this[name] === undefined || this[name] === "" || this[name] === 0)
            return true;
        else
            return false;
    }
}