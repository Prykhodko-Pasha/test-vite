import { Box, Divider, Skeleton, Typography } from "@mui/material";
import {
  ChapterCard,
  DailyTimeGraph,
  FifiIntroCard,
  LeaderboardCard,
  SectionHeader,
} from "../../scripts/ImportRoutes";
import { GameAccount, chapters, loadChapterData } from "../../scripts";

interface Props {
  account: GameAccount | undefined;
  OnChapterClicked: (index: number) => void;
}

const ChapterOverview = ({ props }: { props: Props }) => {
  loadChapterData();

  const account = props.account;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      <SectionHeader>
        <Typography fontSize="30px">Overview</Typography>
      </SectionHeader>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoFlow: "dense",
          gridGap: "20px",
        }}
      >
        <FifiIntroCard gameAccount={account} />
        <DailyTimeGraph gameAccount={account} />
        <LeaderboardCard value={account?.leaderboardPosition!} />
      </Box>
      <Divider flexItem />
      <Box
        sx={{
          // background: "#b4b4b4",
          flex: "auto",
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          height: "fit-content",
        }}
      >
        <SectionHeader>
          <Typography fontSize="30px">Book 1 Chapters</Typography>
        </SectionHeader>
        {account != undefined ? (
          chapters.map((item, index) => {
            return (
              <ChapterCard
                key={index}
                index={index}
                chapter={item}
                chapterData={account.chapterData[index]}
                fadeInTimeOutOffset={index * 50}
                OnClick={() => {
                  props.OnChapterClicked(index);
                }}
              />
            );
          })
        ) : (
          <>
            <Skeleton variant="rounded" height={200} />
            <Skeleton variant="rounded" height={200} />
            <Skeleton variant="rounded" height={200} />
            <Skeleton variant="rounded" height={200} />
            <Skeleton variant="rounded" height={200} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChapterOverview;
