import { Box, Button, Typography, useTheme } from "@mui/material";
import {
  MinigameScoresGraph,
  QuizScoresGraph,
  MinigameCard,
  SectionHeader,
} from "../../scripts/ImportRoutes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GameAccount, chapters, loadChapterData } from "../../scripts/index";
import LeaderboardGraph from "../../Components/Charts/LeaderboardGraph";

const MinigameDashboard = ({
  account,
  level,
  OnClick,
}: {
  account: GameAccount;
  level: number;
  OnClick: () => void;
}) => {
  const minigameID = level;
  const theme = useTheme();

  loadChapterData();

  return (
    <Box display="flex">
      <Box
        sx={{
          flexGrow: 8,
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
        }}
      >
        <SectionHeader>
          <Typography fontSize="30px">Level Specific Stats</Typography>
        </SectionHeader>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoFlow: "dense",
            gridGap: "40px",
          }}
        >
          <MinigameScoresGraph
            average={225}
            playerScore={account.chapterData[
              minigameID
            ].calculateAverageMinigameScore()}
          />
          <QuizScoresGraph
            average={100}
            playerScore={account.chapterData[minigameID].calculateQuizScore()}
          />
          <LeaderboardGraph
            value={account?.leaderboardPosition!}
          ></LeaderboardGraph>
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
            <SectionHeader>
              <Typography fontSize="30px">
                Level {minigameID + 1} - Minigames
              </Typography>
            </SectionHeader>
            <Button
              color="success"
              variant="contained"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => OnClick()}
            >
              <Typography fontWeight="bold" fontSize="14px">
                Back to Chapters
              </Typography>
            </Button>
          </Box>
          <Box
            borderRadius="100px"
            bgcolor={theme.palette.primary.main}
            padding="10px"
            paddingLeft="20px"
            display="flex"
            gap="10px"
            alignItems="baseline"
          >
            <Typography color="white">Legend:</Typography>
            <Box
              bgcolor="#e64445"
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography color="white" fontSize="14px">
                Poor Performance
              </Typography>
            </Box>
            <Box
              bgcolor="#e1af0c"
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography
                color="#e1af0c"
                fontSize="14px"
                sx={{ filter: "brightness(10%)" }}
              >
                Moderate Performance
              </Typography>
            </Box>
            <Box
              bgcolor="#21c05e"
              width="fit-content"
              padding="6px"
              paddingLeft="12px"
              paddingRight="12px"
              borderRadius="100px"
            >
              <Typography
                color="#21c05e"
                fontSize="14px"
                sx={{ filter: "brightness(10%)" }}
              >
                Good Performance
              </Typography>
            </Box>
          </Box>
          {account.chapterData[minigameID].minigames.map((item, index) => {
            console.log(item)
            return (
              <MinigameCard
                key={index}
                index={index}
                minigame={chapters[minigameID].minigames[index]}
                minigameData={account.chapterData[minigameID].minigames[index]}
                fadeInTimeOutOffset={index * 150}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MinigameDashboard;
