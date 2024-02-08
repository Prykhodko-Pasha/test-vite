//This is the data parser for the game account
//This is used to parse the data from the JSON file into the GameAccount class
//I have seperated this from the index.ts file as it is quite long and I wanted to keep the index.ts file clean

import {
  AccountType,
  ChapterData,
  Class,
  GameAccount,
  MinigameData,
  parseSecondsToDateTime,
} from ".";

const getCollection = (storageList: any, name: string) => {
  for (let i = 0; i < storageList.length; i++) {
    if (storageList[i]["collection"] === name) {
      return storageList[i]["value"];
    }
  }
};

//this is the function parses the data from the JSON file into the GameAccount class
//also generates random classes for the user since at the time of writing this function
//the JSON file does not contain any class data
export const parseAccountData = (json: any): GameAccount => {
  console.log(json);

  const userRecords = getCollection(json["storage"], "sb1_user_records");
  const sb1_time = getCollection(json["storage"], "sb1_time");

  const teacherCollection = getCollection(json["storage"], "teacher");

  let account: GameAccount = new GameAccount();

  if (teacherCollection != undefined) {
    //Initialze account as teacher
    account = new GameAccount(
      json["account"]["user"]["id"],
      json["account"]["user"]["username"],
      AccountType.Teacher,
      json["account"]["email"],
      "/profileIcons/luffie.png",
      0,
      [],
      parseClasses(json),
      0,
      [],
      parseSecondsToDateTime(json["account"]["user"]["create_time"]["seconds"]),
      0,
      0,
      0
    );
  } else {
    //Initialize account as parent
    account = new GameAccount(
      json["account"]["user"]["id"],
      json["account"]["user"]["username"],
      AccountType.Parent,
      json["account"]["email"],
      "/profileIcons/luffie.png",
      userRecords["level"],
      parseChapterData(userRecords),
      [],
      userRecords["orangeGems"],
      [],
      parseSecondsToDateTime(json["account"]["user"]["create_time"]["seconds"]),
      json["leaderboards"] ? json["leaderboards"][0]["record"]["rank"] : 0,
      sb1_time != undefined ? parseTimeSpan(sb1_time["totalTimePlayed"]) : 0,
      sb1_time != undefined ? parseTimeSpan(sb1_time["sessionTimePlayed"]) : 0
    );
  }

  sessionStorage.setItem("email", json["account"]["email"]);
  sessionStorage.setItem("uid", json["account"]["user"]["id"]);

  return account;
};

//parses the chapter data from the JSON file into the ChapterData class
export const parseChapterData = (storageValue: any): ChapterData[] => {
  let chapterDatas: ChapterData[] = [];

  for (let i = 0; i < storageValue.levelGames.length; i++) {
    const minigameDataJSON = storageValue.levelGames[i];
    const videosDataJSON = storageValue.lessonVideos[i];
    const quizDataJSON = storageValue.levelQuizzes[i];

    let minigameDatas: MinigameData[] = [];

    for (let j = 0; j < minigameDataJSON.miniGames.length; j++) {
      const minigame = minigameDataJSON.miniGames[j];
      const videoWatched = videosDataJSON.videos[j];
      const quizScore = quizDataJSON.quizzes[j];

      minigameDatas.push(
        new MinigameData(minigame.score, videoWatched.video, quizScore.score)
      );
    }

    chapterDatas.push(new ChapterData(minigameDatas));
  }

  return chapterDatas;
};

export const parseClasses = (json: any): Class[] => {
  let classes: Class[] = [];

  for (let i = 0; i < json["storage"].length; i++) {
    if (json["storage"][i]["collection"] != "classroom") continue;

    const classJSON = json["storage"][i]["value"];
    const classParsed = Class.fromJSON(classJSON);
    console.log(classParsed);
    classes.push(
      classParsed
    );
  }

  return classes;
};

function parseTimeSpan(timeSpanString : string) : number {
  // Split the string into its components
  let parts = timeSpanString.split(/[:.]/);

  // Initialize variables
  let days = 0, hours = 0, minutes = 0;

  // Parse days, if present
  if (parts[0].includes('-')) {
      days = -parseInt(parts[0], 10);
      hours = -parseInt(parts[1], 10);
      minutes = parseInt(parts[2], 10);
  } else if (parts.length === 4) {
      days = parseInt(parts[0], 10);
      hours = parseInt(parts[1], 10);
      minutes = parseInt(parts[2], 10);
  } else {
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
  }

    // Convert everything to total hours (including minutes as a fraction)
    let totalHours = (days * 24) + hours + (minutes / 60);
    console.log(totalHours);
    return totalHours;
}
