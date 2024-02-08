import { Box, Button, Skeleton, Typography, useTheme } from "@mui/material";
import {
  MinigameScoresGraph,
  QuizScoresGraph,
  MinigameCard,
} from "../../scripts/ImportRoutes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GameAccount, chapters, loadChapterData } from "../../scripts/index";
import LeaderboardGraph from "../../Components/Charts/LeaderboardGraph";

class CustomProps {
  account: GameAccount;
  minigameID: number;
  OnBack: () => void;

  constructor(account: GameAccount, minigameID: number, OnBack: () => void) {
    this.account = account;
    this.minigameID = minigameID;
    this.OnBack = OnBack;
  }
}

const TeacherMinigameDashboard = ({ props }: { props: CustomProps }) => {
  window.scrollTo(0, 0);
  const theme = useTheme();

  const account: GameAccount = props.account;
  const minigameID: number = props.minigameID;

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
          flexGrow: 8,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
        }}
      >
        <Typography fontSize="30px">Chapter Specific Stats</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoFlow: "dense",
            gridGap: "2%",
            height: "36vh",
          }}
        >
          {account != undefined ? (
            <MinigameScoresGraph
              average={225}
              playerScore={account.chapterData[
                minigameID
              ].calculateAverageMinigameScore()}
            />
          ) : (
            <Skeleton variant="rounded" height={350} />
          )}
          {account != undefined ? (
            <QuizScoresGraph
              average={100}
              playerScore={account.chapterData[minigameID].calculateQuizScore()}
            />
          ) : (
            <Skeleton variant="rounded" height={350} />
          )}
          <LeaderboardGraph value={52}></LeaderboardGraph>
        </Box>
        <Box
          sx={{
            flex: "auto",
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography fontSize="30px">
              Chapter {minigameID + 1} - Minigames
            </Typography>
            <Button
              color="success"
              variant="contained"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                props.OnBack();
              }}
            >
              <Typography fontWeight="bold" fontSize="14px">
                Back to Chapters
              </Typography>
            </Button>
          </Box>
          <Box
            borderRadius="100px"
            bgcolor={theme.palette.primary.light}
            padding="10px"
            paddingLeft="20px"
            display="flex"
            gap="10px"
            alignItems="baseline"
          >
            <Typography color="white">Legend:</Typography>
            <Box
              bgcolor={theme.palette.error.light}
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography color="white" fontSize="14px">
                Poor
              </Typography>
            </Box>
            <Box
              bgcolor={theme.palette.warning.light}
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography color="white" fontSize="14px">
                Moderate
              </Typography>
            </Box>
            <Box
              bgcolor={theme.palette.success.light}
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography color="white" fontSize="14px">
                Good
              </Typography>
            </Box>
          </Box>
          {account != undefined ? (
            account.chapterData[minigameID].minigames.map((item, index) => {
              console.log(item);
              return (
                <MinigameCard
                  key={index}
                  index={index}
                  minigame={chapters[minigameID].minigames[index]}
                  minigameData={
                    account.chapterData[minigameID].minigames[index]
                  }
                  fadeInTimeOutOffset={index * 150}
                />
              );
            })
          ) : (
            <>
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

export default TeacherMinigameDashboard;
