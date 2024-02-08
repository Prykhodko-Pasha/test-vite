import { Box, Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import { BarChart } from "@tremor/react";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

const MinigameScoresGraph = ({
  average,
  playerScore,
}: {
  average: number;
  playerScore: number;
}) => {
  const chartdata = [
    {
      name: "Average",
      score: average,
    },
    {
      name: "You",
      score: playerScore,
    },
  ];

  return (
    <GraphCard color="#3D6D9A">
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        padding="20px"
        position="relative"
      >
        <Typography fontWeight="bold" fontSize="16px">
          Minigame Score Graph
        </Typography>
        <BarChart
          className="p-0"
          data={chartdata}
          index="name"
          categories={["score"]}
          colors={["blue"]}
          yAxisWidth={38}
          showAnimation
        />
        <ScoreboardIcon
          sx={{
            position: "absolute",
            width: "400px",
            height: "400px",
            color: "#3D6D9A",
            opacity: "0.08",
            right: "-100px",
            top: "0px",
          }}
        />
      </Box>
    </GraphCard>
  );
};

export default MinigameScoresGraph;
