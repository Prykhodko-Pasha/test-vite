import { Box, BoxProps, useTheme } from "@mui/material";

type CustomProps = {
  sx?: BoxProps;
};

const CustomCard = ({ sx, children }: React.PropsWithChildren<CustomProps>) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      padding="20px"
      borderRadius="10px"
      sx={sx}
    >
      {children}
    </Box>
  );
};

export default CustomCard;
