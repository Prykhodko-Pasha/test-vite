import { styled } from "@mui/material";

export const SectionHeader = styled("div")(({ theme }) => ({
  padding: "6px",
  paddingLeft: "20px",
  paddingRight: "20px",
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  width: "fit-content",
  border: "3px solid white",
  userSelect: "none",
}));

export const SettingsCard = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.25)",
}));

export const DataLabel = styled("div")(() => ({
  fontSize: "20px",
  color: "#888888",
}));
