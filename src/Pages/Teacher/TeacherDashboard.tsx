import { Box, Card, CardActionArea, Typography, useTheme } from "@mui/material";
import { SectionHeader } from "../../Components/StyledComponents";
import { Class } from "../../scripts";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ClassCreationModal } from "../../scripts/ImportRoutes";
import { useState } from "react";

const ClassCard = ({
  name,
  icon,
  bgColor,
  OnClick,
}: {
  name: string;
  icon?: JSX.Element;
  bgColor?: string;
  OnClick?: () => void;
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        aspectRatio: "1 / 1",
        bgcolor: bgColor == undefined ? theme.palette.primary.main : bgColor,
        width: "10vw",
        minWidth: "170px",
      }}
    >
      <CardActionArea
        onClick={OnClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          color: "white",
          height: "100%",
          gap: "10px",
        }}
      >
        {icon == undefined ? <SchoolIcon fontSize="large" /> : icon}
        <Typography align="center" fontSize="20px" fontWeight="bold">
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

const TeacherDashboard = ({
  classes,
  OnClick,
}: {
  classes: Class[];
  OnClick: (index: number) => void;
}) => {
  const theme = useTheme();
  const [shouldShowCreateClass, setShowCreateClass] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <ClassCreationModal
        open={shouldShowCreateClass}
        OnDismiss={() => setShowCreateClass(false)}
      />
      <SectionHeader>
        <Typography fontSize="30px">Classes</Typography>
      </SectionHeader>
      <Box display="flex" gap="10px">
        {classes.map((c, index) => (
          <ClassCard
            key={index}
            name={c.name}
            OnClick={() => {
              OnClick(index);
            }}
          />
        ))}
        <ClassCard
          name="Create Class"
          icon={<AddCircleIcon fontSize="large" />}
          bgColor={theme.palette.primary.light}
          OnClick={() => {
            setShowCreateClass(true);
          }}
        />
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
