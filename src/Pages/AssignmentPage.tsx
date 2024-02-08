import React from "react";
import { Assignment } from "../scripts/Assignment";
import { SectionHeader } from "../Components/StyledComponents";
import { Box, Divider, Typography } from "@mui/material";
import { CustomCard } from "../scripts/ImportRoutes";
import { getStatusChipColor } from "../scripts";

class CustomProps {
  description: string = "";
  color?: string;
  fontColor?: string = "black";
  fontSize?: string = "16px";
}

const CustomChip = ({
  description,
  color,
  fontColor,
  fontSize,
  children,
}: React.PropsWithChildren<CustomProps>) => {
  return (
    <Box
      bgcolor={color}
      width="fit-content"
      padding="4px"
      paddingLeft="10px"
      paddingRight="10px"
      borderRadius="100px"
      color={fontColor}
    >
      <Typography fontSize={fontSize}>{description}</Typography>
      {children}
    </Box>
  );
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

function setStatus(teacher : boolean, limitDate : string, submitted : boolean) {
  if (teacher) {
    return new Date() > new Date(limitDate) ? "Closed" : "Opened";
  } else {
    return submitted ? "Submitted" : "Not Submitted";
  }
}

const AssignmentPage = (
  { assignment, teacher = false }: { assignment: Assignment, teacher: boolean }
  ) => {
  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" justifyContent="space-between">
        <SectionHeader>
          <Typography fontSize="24px">Assignment</Typography>
        </SectionHeader>
      </Box>
      <CustomCard
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Box display="flex" gap="10px" alignItems="center">
          <Typography fontSize="24px">{assignment.description}</Typography>

          <CustomChip
            description={setStatus(teacher, assignment.limitDate, assignment.submitted)}
            color={getStatusChipColor(teacher ? new Date() < new Date(assignment.limitDate) : assignment.submitted)}
          />
        </Box>
        <CustomChip
          description={`Due: ${formatUserFriendlyDate(assignment.limitDate)}`}
          color="#eaeaea"
        ></CustomChip>
        <Typography fontSize="18px">{assignment.description}</Typography>
        <Divider />
      </CustomCard>

      {assignment.questions.map((question, index) => {
        return (
          <CustomCard>
            <Box display="flex" flexDirection="column" gap="10px" key={index}>
              <Typography fontSize="24px">
                Q{index + 1}. {question.question}
              </Typography>

              <Box display="flex" gap="10px" alignItems="baseline" key={index}>
                <Typography>Answer Options: </Typography>
                {question.options.map((option) => {
                  return (
                    <CustomChip
                      description={option}
                    />
                  );
                })}
              </Box>
            </Box>
          </CustomCard>
        );
      })}
    </Box>
  );
};

export default AssignmentPage;
