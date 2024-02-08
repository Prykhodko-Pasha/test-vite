import { Box, Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import QuizIcon from "@mui/icons-material/Quiz";

const QuizScoresGraph = ({
  average,
  playerScore,
}: {
  average: number;
  playerScore: number;
}) => {
  console.log(average);
  return (
    <GraphCard color="#7AD959">
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        padding="40px"
        position="relative"
      >
        <Typography fontWeight="bold" fontSize="2.2vh" align="center">
          Avg. Quiz score for this chapter
        </Typography>
        <Box display="flex" gap="10px" alignItems="baseline">
          <Typography fontWeight="bold" fontSize="8vh">
            {playerScore}
          </Typography>
          <Typography fontWeight="bold" fontSize="4vh">
            %
          </Typography>
        </Box>
        <Typography fontSize="2vh" align="center">
          {playerScore <= 20
            ? "Hmm, this score is pretty low, you can do better!"
            : playerScore == 100
            ? "Perfect score! Well done!"
            : "Great job! This is a good score!"}
        </Typography>
        <QuizIcon
          sx={{
            position: "absolute",
            width: "400px",
            height: "400px",
            color: "#7AD959",
            opacity: "0.08",
            right: "-100px",
            top: "0px",
          }}
        />
      </Box>
    </GraphCard>
  );
};

export default QuizScoresGraph;
