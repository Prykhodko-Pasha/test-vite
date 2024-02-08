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
import { SectionHeader } from "../../Components/StyledComponents";
import { GameAccount, getStatusChipColor } from "../../scripts";
import { Assignment } from "../../scripts/Assignment";
import {
  Column,
  Comparator,
  TableHeader,
  getComparator,
  sortedRowInformation,
} from "../../Components/DataTable";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const headers: Column[] = [
  { label: "Assignment", align: "left" },
  { label: "Due Date", align: "left" },
  { label: "Status", align: "right" },
];

const AssignmentsPage = ({
  account,
  OnAssignmentClicked,
  OnCreateAssignmentClicked,
}: {
  account: GameAccount;
  OnAssignmentClicked: (index: number) => void;
  OnCreateAssignmentClicked: () => void;
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
    if (b.submitted < a.submitted) return -1;
    if (b.submitted > a.submitted) return 1;
    return 0;
  };

  return (
    <Box display="flex" flexDirection="column" gap="30px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Box display="flex" justifyContent="space-between">
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
              alignSelf: "center",
            }}
            startIcon={<AddCircleIcon fontSize="large" />}
            onClick={() => {
              OnCreateAssignmentClicked();
            }}
          >
            <Typography fontWeight="bold">Create Assignment</Typography>
          </Button>
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
                  account.assignments!,
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
                      OnAssignmentClicked!(index);
                    }}
                  >
                    <TableCell>
                      <Typography>{assignment.title}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: "12%" }}>
                      <Typography>{assignment.dueDate}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: "10%" }}>
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
    </Box>
  );
};

export default AssignmentsPage;
