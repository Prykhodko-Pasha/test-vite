import { Box, Typography, Card, CardActionArea, Zoom } from "@mui/material";
import { Class } from "../scripts/index";
import { useTheme } from "@mui/material/styles";


const ClassCard = ({
  classData,
  fadeInTimeOutOffset,
  OnClick,
}: {
  classData: Class;
  fadeInTimeOutOffset: number;
  OnClick: () => any;
}) => {
  const theme = useTheme();

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
            console.log("clicked");
            console.log(OnClick);
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
                Class Name: {classData.name} | Teacher: {classData.teacherName} | Code: {classData.code}
              </Typography>
              </Box>
            </Box>
        </CardActionArea>
      </Card>
    </Zoom>
  );
};

export default ClassCard;
