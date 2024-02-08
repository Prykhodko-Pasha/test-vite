import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { SendPasswordRecoveryEmail } from "../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = () => {
    if (isValid) {
      notify(SendPasswordRecoveryEmail(watch("email")));
    }
  };

  const notify = (detail: Promise<unknown>) => {
    toast.promise(detail, {
      pending: "Sending email...",
      success: "Email sent!",
      error: "Error sending email",
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
          borderTop={`4px solid ${theme.palette.primary.main}`}
        >
          <Typography fontWeight="bold">Password Recovery</Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Typography align="center">
              We'll send you an email with a newly generated password.
            </Typography>
            <TextField
              label="Email"
              type="email"
              required
              {...register("email", { required: true })}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
