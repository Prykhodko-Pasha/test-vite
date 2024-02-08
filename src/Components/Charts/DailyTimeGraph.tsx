import { Box, Divider, Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import { ProgressCircle } from "@tremor/react";
import EditIcon from "@mui/icons-material/Edit";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { GameAccount } from "../../scripts";

const DailyTimeGraph = ({
  gameAccount,
}: {
  gameAccount: GameAccount | undefined;
}) => {
  // times comes in hors
  const maxtime = 15;
  const totalPlaytime = gameAccount ? gameAccount.totalPlayTime : 0;
  const dailyPlaytime = gameAccount ? gameAccount.sessionPlayTime : 0;
  const dailyPlayTimeMinutes = dailyPlaytime ? dailyPlaytime * 60 : 0;

  const progressPercentage = Math.round((dailyPlayTimeMinutes/ maxtime) * 100);
  return (
    <GraphCard
      color="#FFDE9E"
      columnSpan="2"
      bgColor="#fffdf9"
      fontColor="#4b412e"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
        position="relative"
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          padding="2.2vh"
        >
          <Box position="absolute" alignSelf="end">
            <EditIcon sx={{ color: "gray" }} fontSize="small" />
          </Box>
          <Typography fontSize="2.5vh">Daily Target Playtime</Typography>
          <ProgressCircle
            value={progressPercentage}
            color="yellow"
            size="xl"
            showAnimation={true}
          >
            <Typography fontSize="4vh" fontWeight="bold">
              {progressPercentage}%
            </Typography>
          </ProgressCircle>
          <Typography fontSize="2.5vh">
            Progress - {dailyPlayTimeMinutes} / {maxtime} minutes
          </Typography>
        </Box>
        <Divider flexItem variant="middle" orientation="vertical" />
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="20px"
          gap="30px"
          zIndex="1"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontSize="2.4vh">Total Playtime</Typography>
            <Typography fontSize="3.4vh">
              {totalPlaytime == 0 ? "No Data" : totalPlaytime} h
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontSize="2.4vh">Daily Playtime</Typography>
            <Typography fontSize="3.4vh">
              {dailyPlaytime == 0 ? "No Data" : dailyPlaytime} h
            </Typography>
          </Box>
        </Box>
        <AccessAlarmIcon
          sx={{
            position: "absolute",
            width: "40vh",
            height: "40vh",
            color: "#FFDE9E",
            opacity: "0.2",
            right: "-100px",
            top: "0px",
          }}
        />
      </Box>
    </GraphCard>
  );
};

export default DailyTimeGraph;
