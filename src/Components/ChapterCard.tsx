import { Box, Typography, Card, CardActionArea, Zoom } from "@mui/material";
import {
  CalculateVideoGroupChipColor,
  Chapter,
  ChapterData,
  calculateQuizGroupChipColor,
} from "../scripts/index";
import { useTheme } from "@mui/material/styles";
import QuizIcon from "@mui/icons-material/Quiz";
import TheatersIcon from "@mui/icons-material/Theaters";
import useMediaQuery from "@mui/material/useMediaQuery";

const MinigameScoreField = ({ score }: { score: number }) => {
  return (
    <Box display="flex" columnGap="4px" alignItems="baseline">
      <Typography
        fontSize={{
          xs: "14px",
          sm: "16px",
          md: "18px",
          lg: "18px",
        }}
        color="white"
      >
        Total Minigame Score:
      </Typography>
      <Typography
        fontSize={{
          xs: "16px",
          sm: "18px",
          md: "20px",
          lg: "20px",
        }}
        color="white"
        fontWeight="bold"
      >
        {score}
      </Typography>
    </Box>
  );
};

const ChapterCard = ({
  index,
  chapterData,
  chapter,
  fadeInTimeOutOffset,
  OnClick,
}: {
  index: number;
  chapterData: ChapterData;
  chapter: Chapter;
  fadeInTimeOutOffset?: number;
  OnClick: () => any;
}) => {
  const theme = useTheme();

  if (chapterData == undefined) {
    return (
      <Zoom in={true} timeout={fadeInTimeOutOffset! + 250}>
        <Card
          sx={{
            background: theme.palette.primary.main,
            boxShadow: "3",
            borderRadius: "10px",
            display: "flex",
            opacity: "0.75",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Typography
                  fontWeight="bold"
                  fontSize={{
                    xs: "14px",
                    sm: "16px",
                    md: "18px",
                    lg: "22px",
                  }}
                  color="white"
                  align="center"
                >
                  Level {index + 1} | {chapter.title} | {chapter.location}
                </Typography>
                <Typography fontWeight="bold" align="center">
                  No data to display.
                </Typography>
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      </Zoom>
    );
  }

  const quizScore = chapterData.calculateQuizScore();
  const videoResult = chapterData.calculateVideosWatched();

  const outsideMobileSize = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Zoom in={true} timeout={fadeInTimeOutOffset! + 250}>
      <Card
        sx={{
          background: theme.palette.primary.main,
          boxShadow: "3",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
          }}
          onClick={() => {
            OnClick();
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize={{
                  xs: "14px",
                  sm: "16px",
                  md: "18px",
                  lg: "22px",
                }}
                color="white"
                align="center"
              >
                Level {index + 1} | {chapter.title} | {chapter.location}
              </Typography>
              <MinigameScoreField
                score={chapterData.calculateTotalMinigameScore()}
              />
              <Box
                display="flex"
                gap="6px"
                bgcolor={calculateQuizGroupChipColor(quizScore)}
                padding="6px"
                borderRadius="4px"
                width="fit-content"
              >
                <QuizIcon
                  sx={{
                    color: `${calculateQuizGroupChipColor(quizScore)}`,
                    filter: "brightness(20%)",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                  }}
                />
                <Typography
                  noWrap
                  fontSize={{
                    xs: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "16px",
                  }}
                  fontWeight="bold"
                  sx={{
                    color: `${calculateQuizGroupChipColor(quizScore)}`,
                    filter: "brightness(20%)",
                  }}
                >
                  {outsideMobileSize
                    ? `Avg. Quiz Score: ${quizScore} / 100%`
                    : `Quiz: ${quizScore}%`}
                </Typography>
              </Box>
              <Box
                display="flex"
                gap="6px"
                bgcolor={CalculateVideoGroupChipColor(
                  videoResult,
                  chapter.minigames.length
                )}
                padding="6px"
                borderRadius="4px"
                width="fit-content"
              >
                <TheatersIcon
                  sx={{
                    color: `${CalculateVideoGroupChipColor(
                      videoResult,
                      chapter.minigames.length
                    )}`,
                    filter: "brightness(20%)",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                  }}
                />
                <Typography
                  noWrap
                  align={outsideMobileSize ? "right" : "left"}
                  fontSize={{
                    xs: "14px",
                    sm: "16px",
                    md: "16px",
                    lg: "16px",
                  }}
                  fontWeight="bold"
                  sx={{
                    color: `${CalculateVideoGroupChipColor(
                      videoResult,
                      chapter.minigames.length
                    )}`,
                    filter: "brightness(20%)",
                  }}
                >
                  {outsideMobileSize
                    ? `Videos Watched: ${videoResult}/${chapter.minigames.length}`
                    : `Vids: ${videoResult}/${chapter.minigames.length}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Zoom>
  );
};

export default ChapterCard;
