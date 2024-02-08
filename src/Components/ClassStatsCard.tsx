import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { GameAccount } from "../scripts";

const ClassStatsCard = ({
  label,
  value,
  metric,
  gameAccount,
  background,
  columnSpan,
  rowSpan,
  fontColor,
}: {
  label: string;
  value: string;
  metric: string;
  gameAccount: GameAccount;
  background?: string;
  columnSpan?: string;
  rowSpan?: string;
  fontColor?: string;
}) => {
  return (
    <Card
      sx={{
        borderRadius: "6px",
        gridColumn: "span " + columnSpan,
        gridRow: "span " + rowSpan,
        bgcolor: background,
      }}
    >
      <CardActionArea
        sx={{
          p: "12px",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "0px",
          color: fontColor == undefined ? "white" : fontColor,
        }}
      >
        <Box>
          <Typography fontWeight="bold">{label}</Typography>
          <Box display="flex" alignItems="baseline" gap="6px">
            <Typography fontWeight="bold" fontSize="40px">
              {value}
            </Typography>
            <Typography fontSize="20px">{metric}</Typography>
          </Box>
          <Typography>
            {gameAccount.username} | Lv. {gameAccount.level}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ClassStatsCard;
