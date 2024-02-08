import { useState, useEffect } from "react";
import { getStatusChipColor } from "../../scripts";
import {
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { SectionHeader } from "../../scripts/ImportRoutes";
import {
  Column,
  Comparator,
  TableHeader,
  getComparator,
  sortedRowInformation,
} from "../../Components/DataTable";
import { Assignment } from "../../scripts/Assignment";
import { getEmail, getUID  } from "../../scripts";
import { GetAssignments } from "../../scripts/ApiRoutes";

const headers: Column[] = [
  { label: "Assignment", align: "left" },
  { label: "Due Date", align: "left" },
  { label: "Score", align: "right" },
  { label: "Status", align: "right" },
];

const ParentAssignmentPage = (
  { classroomCode, onAssignmentClicked }: { classroomCode: string, onAssignmentClicked: (assignment: Assignment) => void }
) => {
  const theme = useTheme();

  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const sortHandler = (property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handleComparator = () => {
    switch (valueToOrderBy) {
      case "Level":
        return CompareByDueDate;
      case "Status":
        return CompareByStatus;
      default:
        return Comparator;
    }
  };

  const CompareByDueDate = (a: Assignment, b: Assignment) => {
    if (b.limitDate < a.limitDate) return -1;
    if (b.limitDate > a.limitDate) return 1;
    return 0;
  };

  const CompareByStatus = (a: Assignment, b: Assignment) => {
    if (b.submittedDate < a.submittedDate) return -1;
    if (b.submittedDate > a.submittedDate) return 1;
    return 0;
  };

  const getUserAssignments = () => {
    const email = getEmail();
    const uid = getUID();
    if (email && uid) {
      GetAssignments(email, uid, classroomCode, false).then((response) => {
        if (response.success) {
          console.log(response.data);
          const assignmetsResult = response.data.map(Assignment.fromJSON);
          setAssignments(assignmetsResult);
        } else {
          console.log(response.message);
        }
      });
    }
  }

  useEffect(() => {
    getUserAssignments();
  }, []);

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
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" flexDirection="column" gap="10px">
        <SectionHeader>
          <Typography fontSize="24px">Your Assignments class: {classroomCode}</Typography>
        </SectionHeader>
        <Alert severity="info">
          <Typography>
            Assignments are created by teachers and are done by students in the
            game.
          </Typography>
        </Alert>
      </Box>
      <Box
        bgcolor="white"
        borderRadius="10px"
        boxShadow="2"
        borderTop={`4px solid ${theme.palette.primary.main}`}
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
              {sortedRowInformation(
                assignments,
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
                  onClick={() => onAssignmentClicked(assignment)}
                >
                  <TableCell>
                    <Typography>{assignment.description}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    <Typography>{formatUserFriendlyDate(assignment.limitDate)}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "12%" }}>
                    <Typography>{assignment.score}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "12%" }}>
                    <Box
                      bgcolor={getStatusChipColor(assignment.submitted)}
                      width="fit-content"
                      padding="6px"
                      paddingLeft="12px"
                      paddingRight="12px"
                      borderRadius="100px"
                      color="black"
                    >
                      <Typography>
                        {assignment.submitted ? "Submitted" : "Not Submitted"}
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

export default ParentAssignmentPage;
