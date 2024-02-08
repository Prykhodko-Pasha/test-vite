import { AccountType, ChapterData, GameAccount, MinigameData } from ".";

//For testing purposes, I've created functions that
//generate random data to populate the fields in the website.

export const generateRandomGameAccount = (): GameAccount => {
  const chapterDatas: ChapterData[] = [];

  for (let i = 0; i < 20; i++) {
    const minigameDatas: MinigameData[] = [];

    for (let j = 0; j < 3; j++) {
      minigameDatas.push(
        new MinigameData(
          Math.floor(Math.random() * 350),
          true,
          Math.floor(Math.random() * 5)
        )
      );
    }

    chapterDatas.push(new ChapterData(minigameDatas));
  }

  const randomIndex: number = Math.floor(Math.random() * 10000);
  const randomGematronAmount: number = Math.floor(Math.random() * 10000);

  return new GameAccount(
    "uid",
    `Student${randomIndex}`,
    AccountType.Parent,
    "student@email.com",
    "/profileIcons/luffie.png",
    Math.floor(Math.random() * 20) + 1,
    chapterDatas,
    [],
    randomGematronAmount
  );
};
