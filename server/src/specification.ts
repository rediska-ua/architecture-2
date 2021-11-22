interface ISpecification<T> {
    IsSatisfiedBy(candidate: T): boolean;
}


export abstract class CompositeSpecification<T> implements ISpecification<T> {

    abstract IsSatisfiedBy(candidate: T): boolean;

}

export class StudentHasBenefitsSpecification extends CompositeSpecification<Student>{
    IsSatisfiedBy(candidate: Student): boolean {
        const filtered = [];
        for (const item of StudentBenefits) {
            if (item.studentId === candidate.studentId) {
                filtered.push(true)
            }
        }
        return filtered.length > 0;
    }
}


export interface Student {
    studentId: number,
    facultyId: number,
    dormitoryStatusId: number,
    firstname: string,
    middlename: string,
    lastname: string,
    dateOfBirth: Date,
    yearOfStudy: number,
    group: string,
    sex: string
}


export interface Dormitory {
    studentId: number,
    facultyId: number,
    dormitoryStatusId: number,
    firstname: string,
    middlename: string,
    lastname: string,
    dateOfBirth: Date,
    yearOfStudy: number,
    group: string,
    sex: string
}

const StudentBenefits = [
{"studentId":1,"benefitId":2},
{"studentId":1,"benefitId":3},
{"studentId":1,"benefitId":4},
{"studentId":2,"benefitId":1},
{"studentId":3,"benefitId":1},
{"studentId":5,"benefitId":4}]



const student: Student = {
    studentId: 1,
    facultyId: 1,
    dormitoryStatusId: 2,
    firstname: 'string',
    middlename: 'string',
    lastname: 'string',
    dateOfBirth: new Date('02.07.2002'),
    yearOfStudy: 1,
    group: 'string',
    sex: 'string'
}



const benefitsCheck = new StudentHasBenefitsSpecification();
const checkForBenefits = (student: Student): void => {
    if (benefitsCheck.IsSatisfiedBy(student)) {
        console.log('student has benefits')
    }
}

checkForBenefits(student)



