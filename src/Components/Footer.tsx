import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      height="130px"
      bgcolor="#1f1f1f"
      position="absolute"
      bottom="0"
      width="100%"
    >
      <Typography color="white" padding="20px">
        Property of Smartli
      </Typography>
    </Box>
  );
};

export default Footer;
