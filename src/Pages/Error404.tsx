import { Box, Link, Typography } from "@mui/material";

const Error404 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box height="100px">
        <Typography color="text.primary" fontWeight="bold" fontSize="24px">
          No Gematrons here...
        </Typography>
      </Box>
      <Typography color="text.primary" fontWeight="bold" fontSize="24px">
        Looks like that page doesn't exist!
      </Typography>
      <Link href="/">
        <Typography color="text.primary" fontSize="20px">
          Back to Home
        </Typography>
      </Link>
    </Box>
  );
};

export default Error404;
