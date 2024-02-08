import {
  Box,
  Button,
  Container,
  Divider,
  List,
  Typography,
} from "@mui/material";
import { AccountCard } from "../scripts/ImportRoutes";
import { useNavigate } from "react-router";

const GetStarted = () => {
  const navigator = useNavigate();

  return (
    <Container maxWidth="xs">
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
        <img
          src="/assets/SmartliLogo.svg"
          loading="lazy"
          style={{ height: "200px" }}
        />
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap="10px"
          alignItems="center"
        >
          <Typography fontWeight="bold" fontSize="20px">
            Recent Accounts
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            bgcolor="white"
            borderRadius="10px"
            width="100%"
            gap="20px"
            boxShadow="4"
            height="310px"
            overflow="auto"
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                gap: "10px",
              }}
            >
              <AccountCard
                username="Smartli Champion"
                email="email@email.com"
                profilePicture="/profileIcons/luffie.png"
              />
              <Divider />
              <AccountCard
                username="Smartli Champion"
                email="email@email.com"
                profilePicture="/profileIcons/luffie.png"
              />
              <Divider />
              <AccountCard
                username="Smartli Champion"
                email="email@email.com"
                profilePicture="/profileIcons/luffie.png"
              />
            </List>
          </Box>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ textTransform: "none", padding: "12px" }}
            onClick={() => {
              navigator("/login");
            }}
          >
            <Typography fontWeight="bold">Use another account</Typography>
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ textTransform: "none" }}
            onClick={() => {
              navigator("/signup");
            }}
          >
            Don't have an account? Sign up!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default GetStarted;
