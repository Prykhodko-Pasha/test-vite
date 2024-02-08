import { Box, Typography } from "@mui/material";
import GraphCard from "./GraphCard";

const MoreStatisticsCard = () => {
  return (
    <GraphCard color="grey">
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontWeight="bold">More statistics coming soon!</Typography>
      </Box>
    </GraphCard>
  );
};

export default MoreStatisticsCard;
