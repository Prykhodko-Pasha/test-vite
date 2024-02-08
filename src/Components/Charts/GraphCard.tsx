import { PropsWithChildren } from "react";
import { Card } from "@mui/material";

interface Props {
  color?: string;
  columnSpan?: string;
  height?: string;
  bgColor?: string;
  fontColor?: string;
}

const GraphCard = ({
  color = "black",
  columnSpan = "1",
  height = "36",
  bgColor = "white",
  fontColor = "black",
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Card
      sx={{
        gridColumn: "span " + columnSpan,
        border: "4px solid " + color,
        borderRadius: "10px",
        boxShadow: "4",
        height: height + "vh",
        bgcolor: bgColor,
        color: fontColor,
      }}
    >
      {children}
    </Card>
  );
};

export default GraphCard;
