import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import GraphCard from "./GraphCard";
import { GameAccount } from "../../scripts";

const FifiIntroductionCard = ({
  gameAccount,
}: {
  gameAccount: GameAccount | undefined;
}) => {
  const theme = useTheme();

  if (gameAccount == null) {
    return (
      <Skeleton variant="rounded" height={140} sx={{ gridColumn: "span 3" }} />
    );
  }

  return (
    <GraphCard
      color={theme.palette.info.main}
      columnSpan="3"
      height="10px"
      bgColor="#e5f3ff"
      fontColor="#005683"
    >
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        padding="20px"
        gap="10px"
      >
        <Typography fontWeight="bold" fontSize="20px">
          Welcome, {gameAccount.username}!
        </Typography>
        <Typography align="center" fontSize="20px">
          This is the portal to track your child's adventure and progress
          through Planet Smartli!
        </Typography>
      </Box>
    </GraphCard>
  );
};

export default FifiIntroductionCard;
