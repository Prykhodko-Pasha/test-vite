import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { ClassStatsCard, SectionHeader } from "../../scripts/ImportRoutes";
import { Class, GameAccount, getStatusChipColor } from "../../scripts";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Column,
  Comparator,
  TableHeader,
  getComparator,
  sortedRowInformation,
} from "../../Components/DataTable";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const headers: Column[] = [
  { label: "Name", align: "left" },
  // { label: "Level", align: "left" },
  // { label: "Gematrons", align: "left" },
  // { label: "Total Score", align: "left" },
];

const assignmentHeaders: Column[] = [
  { label: "Assignment", align: "left" },
  { label: "Due Date", align: "left" },
  { label: "Status", align: "right" },
];

const ClassPage = ({
  studentClass,
  OnStudentClicked,
  OnBackClicked,
  onAssignmentClicked,
  onCreateAssignmentClicked,
}: {
  studentClass: Class;
  OnStudentClicked?: (index: number) => void;
  OnBackClicked?: () => void;
  onAssignmentClicked: (index: number) => void;
  onCreateAssignmentClicked: () => void;
}) => {
  const theme = useTheme();

  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const sortHandler = (property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handleComparator = () => {
    switch (valueToOrderBy) {
      case "Level":
        return CompareByLevel;
      case "Gematrons":
        return CompareByGematrons;
      case "Total Score":
        return CompareByScore;
      case "Username":
        return CompareByUsername;
      default:
        return Comparator;
    }
  };

  const CompareByLevel = (a: any, b: any) => {
    if (b.level < a.level) return -1;
    if (b.level > a.level) return 1;
    return 0;
  };

  const CompareByGematrons = (a: GameAccount, b: GameAccount) => {
    if (b.gematrons! < a.gematrons!) return -1;
    if (b.gematrons! > a.gematrons!) return 1;
    return 0;
  };

  const CompareByScore = (a: GameAccount, b: GameAccount) => {
    if (b.getOverallMinigameScore() < a.getOverallMinigameScore()) return -1;
    if (b.getOverallMinigameScore() > a.getOverallMinigameScore()) return 1;
    return 0;
  };

  const CompareByUsername = (a: GameAccount, b: GameAccount) => {
    if (b.username < a.username) return -1;
    if (b.username > a.username) return 1;
    return 0;
  };

  function formatUserFriendlyDate(isoDateString : string) {
    // Parse the ISO date string
    const date = new Date(isoDateString);

    // Options for formatting
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    // Format the date according to the user's locale and time zone
    const formattedDate = new Intl.DateTimeFormat('default', options).format(date);
  
    return formattedDate;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      columnGap="10px"
      rowGap="20px"
    >
      <Box gridColumn="span 4" display="flex" justifyContent="space-between">
        <SectionHeader>
          <Typography fontSize="30px">{studentClass.name}</Typography>
        </SectionHeader>
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon fontSize="large" />}
          onClick={OnBackClicked!}
          sx={{
            height: "fit-content",
            alignSelf: "center",
            padding: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "100px",
          }}
        >
          <Typography>Back to classes</Typography>
        </Button>
      </Box>
      <Box
        gridColumn="span 2"
        gridRow="span 2"
        bgcolor="#83ccff"
        color="#203b4e"
        borderRadius="6px"
        padding="10px"
        gap="10px"
        display="flex"
        flexDirection="column"
      >
        <Typography fontSize="20px" fontWeight="bold">
          Class Cumulative Results
        </Typography>
        <Box>
          <Typography>Total Score</Typography>
          <Typography fontSize="30px" fontWeight="bold">
            NaN
          </Typography>
        </Box>
        <Box>
          <Typography>Total Playtime</Typography>
          <Typography fontSize="30px" fontWeight="bold">
            NaN
          </Typography>
        </Box>
      </Box>
      <ClassStatsCard
        label="Class Champion"
        value="NaN"
        metric="points"
        gameAccount={new GameAccount("Student A")}
        background="#eae879"
        fontColor="#51502b"
      />
      <ClassStatsCard
        label="Richest Player"
        value="NaN"
        metric="Gematrons"
        gameAccount={new GameAccount("Student B")}
        background="#6dc16c"
        fontColor="#172B17"
      />
      <ClassStatsCard
        label="Most Dedicated"
        value="22"
        metric="hrs"
        gameAccount={new GameAccount("Student C")}
        background="#1a5d87"
        fontColor="#dff2ff"
      />
      <ClassStatsCard
        label="Wardrobe Collector"
        value="34"
        metric="total outfits"
        gameAccount={new GameAccount("Student D")}
        background="#7554a3"
        fontColor="#f3ebff"
      />
      <SectionHeader>
        <Typography fontSize="26px">Students</Typography>
      </SectionHeader>
      <Box
        gridColumn="span 4"
        bgcolor="rgb(255, 255, 255, 0.75)"
        p="10px"
        borderRadius="6px"
        boxShadow="3"
        sx={{
          borderTop: "4px solid " + theme.palette.primary.main,
        }}
      >
        <TableContainer>
          <Table>
            <TableHeader
              headers={headers}
              OnClick={sortHandler}
              activeProperty={valueToOrderBy}
              sortDirection={orderDirection}
            />
            <TableBody>
              {studentClass.students.map((student, index) => (
                <TableRow
                  key={student + index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      bgcolor: "rgb(19, 141, 197, 0.1)",
                      cursor: "pointer",
                    },
                    userSelect: "none",
                  }}
                  onClick={() => {
                    OnStudentClicked!(index);
                  }}
                >
                  <TableCell align="left">
                    <Typography>{student.displayName}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {/* <Typography>{student.level}</Typography> */}
                  </TableCell>
                  <TableCell align="left">
                    {/* <Typography>{student.gematrons}</Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Typography align="right">
                      {/* {student.getOverallMinigameScore()} */}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <SectionHeader>
        <Typography fontSize="30px">Assignments</Typography>
      </SectionHeader>
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
        startIcon={<AddCircleIcon fontSize="large" />}
        onClick={() => {
          onCreateAssignmentClicked();
        }}
      >
        <Typography fontWeight="bold" >Create Assignment</Typography>
      </Button>
      <Box
        gridColumn="span 4"
        bgcolor="rgb(255, 255, 255, 0.75)"
        p="10px"
        borderRadius="6px"
        boxShadow="3"
        sx={{
          borderTop: "4px solid " + theme.palette.primary.main,
        }}
      >
        <TableContainer>
          <Table>
            <TableHeader
              headers={assignmentHeaders}
              OnClick={sortHandler}
              activeProperty={valueToOrderBy}
              sortDirection={orderDirection}
            />
            <TableBody>
              {sortedRowInformation(
                studentClass.assignments!,
                getComparator(orderDirection, handleComparator())
              ).map((assignment, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      bgcolor: "rgb(19, 141, 197, 0.1)",
                      cursor: "pointer",
                    },
                    userSelect: "none",
                  }}
                  onClick={() => {
                    onAssignmentClicked(index);
                  }}
                >
                  <TableCell>
                    <Typography>{assignment.description ? assignment.description : "No description"}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    <Typography>{formatUserFriendlyDate(assignment.limitDate)}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "10%" }}>
                    <Box
                      bgcolor={getStatusChipColor(new Date() < new Date(assignment.limitDate))}
                      width="fit-content"
                      padding="6px"
                      paddingLeft="12px"
                      paddingRight="12px"
                      borderRadius="100px"
                      color="black"
                    >
                      <Typography>
                        {new Date() > new Date(assignment.limitDate) ? "Closed" : "Opened"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ClassPage;
