import {
  Box,
  Card,
  CardActionArea,
  Fade,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CalculateQuizChipColor,
  CalculateVideoChipColor,
  Minigame,
  MinigameData,
} from "../scripts";
import { CategoryBar } from "@tremor/react";
import TheatersIcon from "@mui/icons-material/Theaters";
import QuizIcon from "@mui/icons-material/Quiz";

const MinigameCard = ({
  index,
  minigame,
  minigameData,
  fadeInTimeOutOffset,
}: {
  index: number;
  minigame: Minigame;
  minigameData: MinigameData;
  fadeInTimeOutOffset?: number;
}) => {
  const theme = useTheme();

  const minigameScore = (total: number): number =>
    Math.min((minigameData.score / total) * 100, 100);

  if (!minigame) {
    return <></>;
  }

  return (
    <Fade
      in
      timeout={fadeInTimeOutOffset != undefined ? fadeInTimeOutOffset + 400 : 0}
    >
      <div>
        <Slide
          in={true}
          direction="up"
          timeout={
            fadeInTimeOutOffset != undefined ? fadeInTimeOutOffset + 300 : 0
          }
        >
          <Card
            sx={{
              background: theme.palette.primary.main,
              boxShadow: "4",
              borderRadius: "10px",
            }}
          >
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                  height: "fit-content",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "75%",
                  }}
                >
                  <Typography fontWeight="bold" fontSize="2.4vh" color="white">
                    Lesson {index + 1} | {minigame.title}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="14px"
                    width="70%"
                  >
                    <CategoryBar
                      values={[
                        minigame.performance_weights[0],
                        minigame.performance_weights[1],
                        minigameData.score > minigame.performanceWeightsSum()
                          ? minigameData.score -
                            (minigame.performance_weights[1] +
                              minigame.performance_weights[0])
                          : minigame.performance_weights[2],
                      ]}
                      colors={["red", "yellow", "green"]}
                      markerValue={
                        minigameData.score >
                        minigame.performance_weights[2] +
                          minigame.performance_weights[1] +
                          minigame.performance_weights[0]
                          ? 100
                          : minigameScore(
                              minigame.performance_weights[2] +
                                minigame.performance_weights[1] +
                                minigame.performance_weights[0]
                            )
                      }
                      className="text-white"
                      showAnimation={true}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "18px",
                      }}
                    >
                      Score: {minigameData.score}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap="6px"
                    bgcolor={CalculateQuizChipColor(minigameData.quizScore)}
                    padding="6px"
                    paddingLeft="12px"
                    paddingRight="12px"
                    borderRadius="4px"
                  >
                    <QuizIcon
                      sx={{
                        color: `${CalculateQuizChipColor(
                          minigameData.quizScore
                        )}`,
                        filter: "brightness(40%)",
                      }}
                    />
                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: `${CalculateQuizChipColor(
                          minigameData.quizScore
                        )}`,
                        filter: "brightness(40%)",
                      }}
                    >
                      Quiz Score: {minigameData.quizScore * 20} / 100%
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap="6px"
                    bgcolor={CalculateVideoChipColor(minigameData.videoWatched)}
                    padding="6px"
                    paddingLeft="12px"
                    paddingRight="12px"
                    borderRadius="4px"
                  >
                    <TheatersIcon
                      sx={{
                        color: `${CalculateVideoChipColor(
                          minigameData.videoWatched
                        )}`,
                        filter: "brightness(40%)",
                      }}
                    />
                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: `${CalculateVideoChipColor(
                          minigameData.videoWatched
                        )}`,
                        filter: "brightness(40%)",
                      }}
                    >
                      {minigameData.videoWatched
                        ? "Video Watched"
                        : "Video Not Watched"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Slide>
      </div>
    </Fade>
  );
};

export default MinigameCard;
