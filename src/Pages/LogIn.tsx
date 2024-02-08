import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountType, setLoggedIn } from "../scripts";

type Inputs = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);

    login(data.email, data.password).then((response) => {
      if (response.success) {
        if (response.account?.accountType == AccountType.Parent) {
          if (response.data.message == "Email not verified") {
            navigator("/verifyEmail");
          }

          navigator("/parentdashboard");
          setLoggedIn(data.email, response.account.uid, data.password);
        } else {
          navigator("/teacherdashboard");
          setLoggedIn(data.email, response.account!.uid, data.password);
        }
      } else {
        notify();
      }

      setIsLoading(false);
    });
  };

  const notify = () => {
    toast.error("Invalid Email or Password", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box
        paddingTop="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        height="100vh"
      >
        <Box
          bgcolor="white"
          borderRadius="10px"
          width="100%"
          padding="20px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          boxShadow="4"
        >
          <Typography fontWeight="bold" fontSize="24px">
            Logging in
          </Typography>
          <Alert severity="info">
            <AlertTitle>
              <Typography>
                Please use the email you've used for creating an account in the
                games.
              </Typography>
            </AlertTitle>
          </Alert>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <TextField
              disabled={isLoading}
              type="email"
              label="Email"
              fullWidth
              {...register("email", { required: true })}
              error={errors.email != null}
              helperText={errors.email && <>This field needs attention</>}
            />
            <TextField
              disabled={isLoading}
              type="password"
              label="Password"
              fullWidth
              {...register("password", { required: true })}
              error={errors.password != null}
              helperText={errors.password && <>This field needs attention</>}
            />
            <Button
              disabled={isLoading}
              variant="contained"
              fullWidth
              type="submit"
            >
              {isLoading ? <CircularProgress size="16px" /> : "Submit"}
            </Button>
          </form>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Button
            sx={{ textTransform: "none" }}
            disabled={isLoading}
            variant="contained"
            type="submit"
            onClick={() => {
              navigator("/forgotPassword");
            }}
          >
            Forgot your password? We'll email you!
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => {
              navigator("/signup");
            }}
          >
            <Typography color="black">
              Don't have an account? Sign Up For Free!
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;
