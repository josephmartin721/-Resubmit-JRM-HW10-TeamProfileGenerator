const Staff = require("./staff");

class Intern extends Staff {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;