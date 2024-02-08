import CustomCard from "../../Components/CustomCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Class, getUID } from "../../scripts";
import { AssignmentPayload, Question } from "../../scripts/Assignment";
import { submitAssignment } from "../../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import questionJson from "../../data/Questions.json";
import QuestionCard from "../../Components/QuestionCard";


const AssignmentCreationPage = (
  { classes }: { classes: Class[] }
) => {
  const theme = useTheme();
  const [classroom, setClassroom] = useState("0");
  const [chapter, setChapterIndex] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [limitDate, setLimitDate] = useState<Date>(new Date());
  const [assignmentDescription, setAssignmentDescription] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setClassroom(event.target.value);
  };

  const handleQuestionNumberChange = (event: SelectChangeEvent) => {
    const newNumber = parseInt(event.target.value);
    setQuestionNumber(newNumber);
    let currentQuestions : Question[] = [];
    for (let i = 0; i < newNumber; i++) {
      const questionFormat = new Question("", 0, ["", "", ""], "");
      currentQuestions.push(questionFormat);
    }
    setQuestions(currentQuestions);
  };

  const handleChapterChange = (event: SelectChangeEvent) => {
    setChapterIndex(event.target.value);
  };

  const LoadShowQuestionsFromJson = () => {
    if (chapter === "") return (<></>);
    const chapterData = questionJson[parseInt(chapter)];
    const newQuestions : Question[] = [];
    for (let i = 0; i < chapterData.questions.length; i++) {
      const questionData = chapterData.questions[i];
      const question = new Question(questionData.question, questionData.answer, questionData.options, "");
      newQuestions.push(question);
    }
    return newQuestions.map((question : Question, index : number) => (
      <Box display="flex" flexDirection="column" gap="10px">
        <QuestionCard key={index} questionData={question} OnClick={() => {}} />
      </Box>
    ));
  }

  const handleQuestionChange = (index: number, value : string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value : string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };


  const handleCorrectAnswerChange = (questionIndex : number, value : number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const showQuestions = () => {
    return questions.map((question : Question, questionIndex: number) => (
      <Box key={questionIndex} display="flex" flexDirection="column" gap="10px" flexGrow="1">
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography>Question {questionIndex + 1}</Typography>
          <TextField
            fullWidth
            label="Question" 
            variant="standard"
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            InputProps={{
              style: { fontSize: 24 }, // Adjust the font size as needed
            }}
          />
          {question.options.map((option, optionIndex) => (
            <TextField
              key={optionIndex}
              fullWidth
              label={`Answer Option ${optionIndex + 1}`}
              variant="standard"
              value={option}
              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              InputProps={{
                style: { fontSize: 15 }, // Adjust the font size as needed
              }}
            />
          ))}
          <FormControl fullWidth>
            <InputLabel id={`select-correct-answer-${questionIndex}`}>Correct Answer</InputLabel>
            <Select
              labelId={`select-correct-answer-${questionIndex}`}
              id={`correct-answer-${questionIndex}`}
              value={question.answer.toString()}
              label="Correct Answer"
              onChange={(e) => handleCorrectAnswerChange(questionIndex, parseInt(e.target.value))}
            >
              {question.options.map((_, index) => (
                <MenuItem key={index} value={index}>
                  Answer Option {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    ));
  };

  const CreateAssignment = () => {
    const id = getUID();
    if (!id || questions.length === 0 || classroom === "-1") {
      notify();
      return;
    }
    const newAssignment = new AssignmentPayload(
      questions, 
      classes[parseInt(classroom)].code, 
      id,
      limitDate.toISOString(), 
      assignmentDescription
    );
    console.log(newAssignment);
    submitAssignment(newAssignment).then((response) => {
      if (response.success) {
        console.log(response.data);
        window.location.reload();
      }
    }).catch((error) => {
      console.log(error);
      notify();
    });
  }
  
  const notify = () => {
    toast.error("Error creating assignment check all the fields", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box display="flex" gap="10px" width="100%">
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box display="flex" flexDirection="column" gap="20px" width="100%">
        <CustomCard
          sx={{
            borderTop: "10px solid" + theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            defaultValue="Assignment Description"
            InputProps={{
              style: { fontSize: 32 }, // Adjust the font size as needed
            }}
            onChange={(e) => setAssignmentDescription(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography>Duration</Typography>
            <Box display="flex" flexDirection="column" gap="10px">
              <DateTimePicker 
                label="Due Date and Time"
                onChange={(newDate) => setLimitDate(newDate as Date)}
              />
            </Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              key="classroom"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classroom}
              label="Class"
              onChange={handleChange}
            >
              {classes.map((c, index) => {
                return (
                  <MenuItem value={index}>
                    {c.name}
                  </MenuItem>
                );
              }
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth>
          <InputLabel id="select-number-questions">Questions</InputLabel>
            <Select
              key="questionNumber"
              labelId="select-number-questions"
              id="number-questions"
              value={questionNumber.toString()}
              label="Questions"
              onChange={handleQuestionNumberChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </CustomCard>
        <Box display="flex" flexDirection="column" gap="10px" flexGrow="1">
          <CustomCard sx={{ height: "auto" }}>
              {showQuestions()}
              <Box display="flex" flexDirection="column" gap="10px" flexGrow="1">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "100px",
                  padding: "10px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  height: "fit-content",
                  alignSelf: "right",
                }}
                onClick={() => {
                  CreateAssignment();
                }}
              >
                <Typography fontWeight="bold" >Create Assignment</Typography>
              </Button>
            </Box>
          </CustomCard>
        </Box>
      </Box>
      <CustomCard
        sx={{
          width: "500px",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold">Preset Questions</Typography>
          <Box width="50%">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapter}
                label="Class"
                onChange={handleChapterChange}
              >
                {
                  questionJson.map((chapter : any, index : number) => {
                    return (
                      <MenuItem value={index}>
                        {chapter.chapter}
                      </MenuItem>
                    );
                  })
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
      {LoadShowQuestionsFromJson()}
      </CustomCard>
    </Box>
  );
};

export default AssignmentCreationPage;
