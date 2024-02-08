import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail } from "../scripts/ApiRoutes";

const VerifyEmailPage = () => {
  const navigator = useNavigate();

  const email = sessionStorage.getItem("email");
  const uid = sessionStorage.getItem("uid");

  //redirect out if for some reason this page was entered without a uid or email

  const handleClick = () => {
    if (email == undefined || uid == undefined) {
      navigator("/login");
    } else {
      sendVerificationEmail(email, uid);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <Box
        bgcolor="white"
        padding="20px"
        borderRadius="10px"
        display="flex"
        flexDirection="column"
        gap="16px"
        justifyContent="center"
        alignItems="center"
        maxWidth="500px"
      >
        <Typography fontWeight="bold" fontSize="24px" color="#011c28">
          Email Verification Required
        </Typography>
        <Typography align="center" color="text.primary">
          Fifi wants to make sure you aren't a mischievous Gollyplop
        </Typography>
        <Box display="flex" flexDirection="column">
          <Typography align="center" color="text.primary" component="div">
            Click the button below and we'll send a link to
            <Typography
              fontSize="18px"
              fontWeight="bold"
              align="center"
              color="text.primary"
            >
              {email}
            </Typography>
            to authenticate your email
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Button variant="contained" onClick={handleClick}>
            Send verification email
          </Button>
          <Button
            onClick={() => {
              navigator("/login");
            }}
          >
            Return to login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmailPage;
