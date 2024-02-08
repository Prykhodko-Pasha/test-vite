import chapterJSON from "../data/ChapterNames.json";
import { Assignment } from "./Assignment";

//This is the main script of the website. Any functionality
//that is not a component should be in here.

//The status of the minigame
export enum Status {
  NotReached,
  OnGoing,
  Completed,
}

//The type of account
export enum AccountType {
  None = "None",
  Parent = "Parent",
  Teacher = "Teacher",
}

//Minigame's data
export class Minigame {
  title: string;
  performance_weights: number[];

  constructor(title: string, performance_weights: number[]) {
    this.title = title;
    this.performance_weights = performance_weights;
  }

  performanceWeightsSum = (): number => {
    let sum: number = 0;
    for (let index = 0; index < this.performance_weights.length; index++) {
      const weight = this.performance_weights[index];
      sum += weight;
    }

    return sum;
  };
}

//Chapter's data
export class Chapter {
  title: string;
  location: string;
  minigames: Minigame[];

  constructor(title: string, location: string, minigames: Minigame[]) {
    this.title = title;
    this.location = location;
    this.minigames = minigames;
  }
}

//Minigame data that contains the player's score
export class MinigameData {
  score: number;
  videoWatched: boolean;
  quizScore: number;

  constructor(
    score: number = 0,
    videoWatched: boolean = false,
    quizScore: number = 0
  ) {
    this.score = score;
    this.videoWatched = videoWatched;
    this.quizScore = quizScore;
  }
}

//Chapter data that contains the minigame data
export class ChapterData {
  minigames: MinigameData[];

  constructor(minigames: MinigameData[]) {
    this.minigames = minigames;
  }

  calculateTotalMinigameScore() {
    let score: number = 0;

    for (let index: number = 0; index < this.minigames.length; index++) {
      const minigame = this.minigames[index];
      score += minigame.score;
    }

    return score;
  }

  calculateAverageMinigameScore() {
    let average: number = 0;

    let index = 0;
    for (index = 0; index < this.minigames.length; index++) {
      const minigame = this.minigames[index];
      average += minigame.score;
    }

    let result = average / index;
    if (Number.isNaN(result)) {
      result = 0;
    }

    return Math.round(result);
  }

  calculateQuizScore() {
    let average: number = 0;

    let index = 0;
    for (index = 0; index < this.minigames.length; index++) {
      const minigame = this.minigames[index];
      average += minigame.quizScore * 20;
    }

    let result = average / index;
    if (Number.isNaN(result)) {
      result = 0;
    }

    return Math.round(result);
  }

  calculateVideosWatched() {
    let videosWatched: number = 0;

    for (let index: number = 0; index < this.minigames.length; index++) {
      const minigame = this.minigames[index];
      if (minigame.videoWatched) {
        videosWatched++;
      }
    }

    return videosWatched;
  }
}

//This is for the teacher's dashboard and is the structure of a class
export class Class {
  name: string;
  students: any[];
  assignments: Assignment[];
  code: string;
  teacherName: string;

  constructor(name: string, students: any[], code: string, teacherName: string, assignments: Assignment[] = []) {
    this.name = name;
    this.students = students;
    this.code = code;
    this.teacherName = teacherName;
    this.assignments = assignments;
  }

  static fromJSON(json: any): Class {
    return new Class(
      json.name,
      json.students,
      json.code,
      json.teacherName,
      json.assignments?.map(Assignment.fromJSON) // Assuming Assignment has a similar fromJSON method
    );
  }

}


export class GameAccount {
  uid: string;
  username: string;
  accountType: AccountType;
  email: string;
  profileImage: string;
  level: number;
  chapterData: ChapterData[];
  classes: Class[];
  gematrons?: number;
  assignments?: Assignment[];
  creationDate?: Date;
  leaderboardPosition?: number;
  totalPlayTime?: number;
  sessionPlayTime?: number;

  constructor(
    uid: string = "",
    username: string = "",
    accountType: AccountType = AccountType.Parent,
    email: string = "",
    profileImage: string = "/profileIcons/luffie.png",
    level: number = 0,
    chapterData: ChapterData[] = [],
    classes: Class[] = [],
    gematrions: number = 0,
    assignments: Assignment[] = [],
    creationDate: Date = new Date(),
    leaderboardPosition: number = 0,
    totalPlayTime: number = 0,
    sessionPlayTime: number = 0
  ) {
    this.uid = uid;
    this.username = username;
    this.accountType = accountType;
    this.email = email;
    this.profileImage = profileImage;
    this.level = level;
    this.chapterData = chapterData;
    this.classes = classes;
    this.gematrons = gematrions;
    this.assignments = assignments;
    this.creationDate = creationDate;
    this.leaderboardPosition = leaderboardPosition;
    this.totalPlayTime = totalPlayTime;
    this.sessionPlayTime = sessionPlayTime;
  }

  getAccountTypeAsString = (): string => {
    switch (this.accountType) {
      case AccountType.Parent:
        return "Parent";
      case AccountType.Teacher:
        return "Teacher";
      case AccountType.None:
        return "None";
    }
  };

  getOverallMinigameScore = (): number => {
    let score: number = 0;

    for (let index = 0; index < this.chapterData.length; index++) {
      const chapter = this.chapterData[index];
      score += chapter.calculateTotalMinigameScore();
    }

    return score;
  };
}

//This calculates the color of the quiz chip in the minigame card
export function CalculateQuizChipColor(value: number): string {
  if (value < 3) {
    return "#ff5c5c";
  } else if (value < 5) {
    return "#ffa754";
  }

  return "#6dd365";
}

//This calculates the color of the video chip in the minigame card
export function CalculateVideoChipColor(value: boolean): string {
  if (value) {
    return "#6dd365";
  }
  return "#ffa754";
}

//This calculates the color of the minigame chip in the chapter card
export const calculateQuizGroupChipColor = (value: number): string => {
  if (value < 50) {
    return "#ff5c5c";
  } else if (value < 100) {
    return "#ffa754";
  }
  return "#6dd365";
};

//This calculates the color of the video chip in the chapter card
export function CalculateVideoGroupChipColor(
  watched: number,
  total: number
): string {
  if (watched == 0) {
    return "#ff5c5c";
  } else if (watched < total) {
    return "#ffa754";
  }
  return "#6dd365";
}

//This loads the chapter data from the json file ChapterNames.json
export let chapters: Chapter[] = [];

export const loadChapterData = () => {
  chapters = chapterJSON.chapters.map((chapter) => {
    return new Chapter(
      chapter.title,
      chapter.location,
      chapter.minigameNames.map((minigame) => {
        let firstWeight: number = parseInt(minigame.performance_weights[0]);
        let secondWeight: number = parseInt(minigame.performance_weights[1]);
        let thirdWeight: number = parseInt(minigame.performance_weights[2]);
        return new Minigame(minigame.title, [
          firstWeight,
          secondWeight,
          thirdWeight,
        ]);
      })
    );
  });
};

export const getStatusChipColor = (status: boolean): string => {
  return status ? "lightgreen" : "lightcoral"
};

export const parseSecondsToDateTime = (seconds: number): Date => {
  let t = new Date(Date.UTC(1970, 0, 1)); // Epoch
  t.setSeconds(seconds);
  return t;
};

type RecentAccount = {
  username: string;
  email: string;
};

export const addToRecentAccounts = () => {
  let recentAccounts: RecentAccount[] = JSON.parse(
    localStorage.getItem("recentAccounts")!
  );
  if (recentAccounts == null) {
    recentAccounts = [];
  }

  console.log(recentAccounts);
};

export const setLoggedIn = (email: string, uid: string, password: string) => {
  sessionStorage.setItem("token", "true");
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("uid", uid);
  sessionStorage.setItem("password", password);
};

export const setLoggedOut = () => {
  sessionStorage.setItem("token", "false");
  sessionStorage.setItem("email", "");
  sessionStorage.setItem("uid", "");
  sessionStorage.setItem("password", "");
};

export const isLoggedIn = () => {
  return sessionStorage.getItem("token") === "true";
};

export const getEmail = () => {
  return sessionStorage.getItem("email");
};

export const getPassword = () => {
  return sessionStorage.getItem("password");
};

export const getUID = () => {
  return sessionStorage.getItem("uid");
};
