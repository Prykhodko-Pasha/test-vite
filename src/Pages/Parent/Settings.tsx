import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { GameAccount, setLoggedOut } from "../../scripts";
import AccountContext from "../../Components/AccountContext";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ChangePassword,
  DataLabel,
  SettingsCard,
} from "../../scripts/ImportRoutes";
import { deleteAccount } from "../../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Settings = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<GameAccount | undefined>(undefined);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);

    deleteAccount(data.email, data.password).then((response) => {
      if (response.success) {
        setLoggedOut();
        navigator("/");
      }
      else {
        notify();
      }
    });

    setIsLoading(false);

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
    <AccountContext setAccount={setAccount}>
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
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap="20px"
        >
          {account != undefined ? (
            <Box display="flex" flexDirection="column" rowGap="20px">
              <SettingsCard>
                <Typography fontWeight="bold" fontSize="24px" color="#888888">
                  General Information
                </Typography>
                <Alert severity="info">
                  Profile pictures are automatically generated by your in-game
                  character
                </Alert>
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
                  gap="10px"
                >
                  <DataLabel>Username:</DataLabel>
                  <Typography fontSize="20px" gridColumn="span 3">
                    {account.username}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                  >
                    {/* <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      sx={{ width: "fit-content" }}
                    >
                      <Typography fontWeight="bold">Edit</Typography>
                    </Button> */}
                  </Box>
                  <DataLabel>Email:</DataLabel>
                  <Typography fontSize="20px" gridColumn="span 4">
                    {account.email}
                  </Typography>
                  <DataLabel>Account Type:</DataLabel>
                  <Typography fontSize="20px" gridColumn="span 4" color="gray">
                    {account.getAccountTypeAsString()}
                  </Typography>
                  <DataLabel>Date Created:</DataLabel>
                  <Typography fontSize="20px" gridColumn="span 4" color="gray">
                    {account.creationDate?.toLocaleDateString()}
                    {" | "}
                    {account.creationDate?.toLocaleTimeString()}
                  </Typography>
                  <DataLabel>Gematrons:</DataLabel>
                  <Typography
                    fontSize="20px"
                    color="#888888"
                    gridColumn="span 4"
                  >
                    {account.gematrons}
                  </Typography>
                </Box>
              </SettingsCard>
              <ChangePassword />
              <Box
                padding="20px"
                bgcolor="white"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                gap="20px"
                border="2px solid red"
                boxShadow="5"
              >
                <Typography fontWeight="bold" fontSize="24px" color="#880000">
                  Delete Account
                </Typography>
                <Alert severity="error">
                  <AlertTitle>
                    <Typography fontWeight="Bold">
                      This is a destructive action
                    </Typography>
                  </AlertTitle>
                  <Typography>
                    This action is irreversible and all your data with Smartli{" "}
                    <Box component="span" fontWeight="bold">
                      (INCLUDING GAME DATA)
                    </Box>
                    will be deleted.
                  </Typography>
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
                    id="outlined-basic"
                    label="Type Email to confirm"
                    variant="outlined"
                    color="warning"
                    disabled={isLoading}
                    type="email"
                    {...register("email", { required: true })}
                    error={errors.email != null}
                    helperText={errors.email && <>This field needs attention</>}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Type Password to confirm"
                    variant="outlined"
                    color="warning"
                    disabled={isLoading}
                    type="password"
                    {...register("password", { required: true })}
                    error={errors.password != null}
                    helperText={errors.password && <>This field needs attention</>}
                  />
                  <Button 
                    disabled={isLoading}
                    variant="contained"
                    color="error"
                    type="submit"
                  >
                    Confirm
                  </Button>
                </form>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              height="100vh"
              width="100vw"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                flexDirection="row"
                gap="6px"
                padding="12px"
                borderRadius="10px"
                bgcolor="white"
                justifyContent="center"
                alignItems="center"
              >
                <Typography>Loading...</Typography>
                <CircularProgress />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </AccountContext>
  );
};

export default Settings;
