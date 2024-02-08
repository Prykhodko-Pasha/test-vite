import { Box, Skeleton, Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const LeaderboardGraph = ({ value }: { value: number }) => {
  if (value == undefined) {
    return <Skeleton variant="rounded" height="100%" />;
  }

  return (
    <GraphCard color="#9594D3" bgColor="#eeeeff" fontColor="#3a3a53">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="2vh"
        position="relative"
        height="100%"
        gap="8%"
      >
        <Typography fontSize="2vh" fontWeight="bold">
          Leaderboard Ranking
        </Typography>
        <Box display="flex">
          <Typography fontSize="10vh">{value}</Typography>
          <Typography fontSize="4vh">th</Typography>
        </Box>
        <Typography fontSize="2vh" align="center">
          on the global leaderboard!
        </Typography>
        <LeaderboardIcon
          sx={{
            position: "absolute",
            width: "40vh",
            height: "40vh",
            color: "#9594D3",
            opacity: "0.1",
            right: "-100px",
            top: "0px",
          }}
        />
      </Box>
    </GraphCard>
  );
};

export default LeaderboardGraph;
