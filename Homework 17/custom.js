class Group {
    #students;

    constructor() {
        this.#students = [];
    }

    addStudent(student) {
        if(this.#studentValidator(student)) {
            this.#students.push(student);
        }
    }

    #studentValidator(student) {
        return student instanceof Student;
    }

    get students() {
        return this.#students;
    }

    getAverageMark() {
        let groupMark = 0;

        for(let student of this.#students) {
            const studentAverageMark = student.getAverageMark();
            groupMark += studentAverageMark;
        }
        const groupAverageMark = groupMark / this.#students.length;

        return groupAverageMark;
    }
}

class Student {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    getAverageMark() {
        let marksOverall = 0
        for (let i in this.mark) {
            marksOverall += this.mark[i]
        }

        if (!marksOverall) {
            return 0;
        }

        return marksOverall / this.mark.length;
    }
}

const group = new Group();

group.addStudent(new Student('John', [10, 8]));
group.addStudent(new Student('Alex', [10, 9]));
group.addStudent(new Student('Bob', [6, 10]));

console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

console.log(group.getAverageMark() === (10 + 8 + 10 + 9 + 6 + 10) / 6);


Array.prototype.max = function() {
    let max = this[0];

    for (let i = 1; i < this.length; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }

    return max;
};

[6, 5, 8, 7].max();
