import { Box, Skeleton, Typography } from "@mui/material";
import {
  ChapterCard,
  LeaderboardCard,
  DailyTimeGraph,
} from "../../scripts/ImportRoutes";
import { GameAccount, chapters, loadChapterData } from "../../scripts";

class CustomProps {
  gameAccount: GameAccount;
  OnClick: (index: number) => void;

  constructor(gameAccount: GameAccount, onClick: (index: number) => void) {
    this.gameAccount = gameAccount;
    this.OnClick = onClick;
  }
}

const TeacherChildDashboard = ({ props }: { props: CustomProps }) => {
  window.scrollTo(0, 0);
  loadChapterData();

  return (
    <Box
      display="flex"
      flexDirection={{
        xs: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
      }}
      gap="20px"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: "100px",
            padding: "10px",
          }}
        >
          <Typography align="center" fontSize="14px" fontWeight="bold">
            You are viewing this account as a teacher
          </Typography>
        </Box>
        <Typography fontSize="24px">Overview</Typography>
        {props.gameAccount != undefined ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "4vh",
              height: "36vh",
            }}
          >
            <DailyTimeGraph gameAccount={undefined} />
            <LeaderboardCard value={52} />
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            height: "fit-content",
          }}
        >
          <Typography fontSize="3.4vh">Book 1 Chapters</Typography>
          {props.gameAccount != undefined ? (
            props.gameAccount.chapterData.map((item, index) => {
              return (
                <ChapterCard
                  key={index}
                  index={index}
                  chapter={chapters[index]}
                  chapterData={item}
                  fadeInTimeOutOffset={index * 50}
                  OnClick={() => {
                    props.OnClick(index);
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
    </Box>
  );
};

export default TeacherChildDashboard;
