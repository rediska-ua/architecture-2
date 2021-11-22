export interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {

    private nextHandler!: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}


export class StudentBenefitHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'Student with Benefits') {
            return `answer: ${request}.`;
        }
        else if (request === 'Student with no Benefits') {
            return `answer: ${request}.`;
        }
        return super.handle(request);
    }
}

export class DormitoryHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'faculty dorm') {
            return `it is ${request}.`;
        }
        else if (request === 'other dorm') {
            return `it is ${request}.`;
        }
        return super.handle(request);
    }
}



const clientCode = (handler: Handler) => {
    const requests = ['other dorm', 'Student with Benefits', 'Student with no Benefit'];

    for (const req of requests) {

        const result = handler.handle(req);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`  ${req} hasnt been used.`);
        }
    }
}

const student = new StudentBenefitHandler();
const dormitory = new DormitoryHandler();

student.setNext(dormitory);

clientCode(student);
clientCode(dormitory);