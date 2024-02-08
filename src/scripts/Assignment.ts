//this is the class for the assignment object
//I've seperated this from the index.ts file as it is quite long and I wanted to keep the index.ts file clean

export enum AssignmentStatus {
  Incomplete,
  Completed,
  Overdue,
}

export enum AssignmentTopic {
  Addition,
  Subtraction,
  Multiplication,
  Division,
  Custom,
}

export class Assignment {
  questions: Question[];
  code: string;
  createDate: string;
  limitDate: string;
  score: number;
  submitted: boolean;
  submittedDate: string;
  description: string;

  constructor(questions: Question[], code: string, createDate: string, limitDate: string, score: number, submitted: boolean, submittedDate: string, description: string) {
      this.questions = questions;
      this.code = code;
      this.createDate = createDate;
      this.limitDate = limitDate;
      this.score = score;
      this.submitted = submitted;
      this.submittedDate = submittedDate;
      this.description = description;
  }

  static fromJSON(json: any): Assignment {
      const questions = json.questions.map(Question.fromJSON);
      return new Assignment(
          questions,
          json.code,
          json.createDate,
          json.limitDate,
          json.score,
          json.submitted,
          json.submittedDate,
          json.description
      );
  }
}

export class AssignmentPayload {
  questions: Question[];
  classroomCode: string;
  id: string;
  limitDate: string;
  description: string;

  constructor(questions: Question[], classroomCode: string, id: string, limitDate: string, description: string) {
      this.questions = questions;
      this.classroomCode = classroomCode;
      this.id = id;
      this.limitDate = limitDate;
      this.description = description;
  }
}


export class Question {
  question: string;
  answer: number;
  options: string[];
  image: string;

  constructor(question: string, answer: number, options: string[], image: string) {
      this.question = question;
      this.answer = answer;
      this.options = options;
      this.image = image;
  }

  static fromJSON(json: any): Question {
      return new Question(
          json.question,
          json.answer,
          json.options,
          json.image
      );
  }
}

