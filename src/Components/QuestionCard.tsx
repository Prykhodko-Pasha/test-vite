import { Box, Typography, Card, CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Question } from "../scripts/Assignment";
import Draggable from 'react-draggable';
import { useState } from 'react';


const QuestionCard = ({
  questionData,
  OnClick,
}: {
  questionData: Question;
  OnClick: () => any;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStop = () => {
    setPosition({ x: 0, y: 0 });
  };
  const theme = useTheme();

  return (
    <Draggable position={position} onStop={handleStop}>
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
                color="white"
                align="center"
              >
                Question: {questionData.question}
              </Typography>
              </Box>
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
                color="white"
                align="center"
              >
                Options: {`${questionData.options[0]} ${questionData.options[1]} ${questionData.options[2]}`}
              </Typography>
              </Box>
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
                color="white"
                align="center"
              >
                Answer: {`${questionData.options[questionData.answer]}`}
              </Typography>
              </Box>
            </Box>
        </CardActionArea>
      </Card>
    </Draggable>
  );
};

export default QuestionCard;
