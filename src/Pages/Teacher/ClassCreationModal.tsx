import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CustomCard } from "../../scripts/ImportRoutes";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateClassroom } from "../../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";

type Inputs = {
  name: string;
};

const ClassCreationModal = ({
  open,
  OnDismiss,
}: {
  open: boolean;
  OnDismiss: () => void;
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    CreateClassroom(
      sessionStorage.getItem("email")!,
      sessionStorage.getItem("uid")!,
      data.name
    ).then((response) => {
      console.log(response);

      if (response.success) {
        setIsLoading(false);
        OnDismiss();
        notify("Class Created", true);
        window.location.reload();
      } else {
        setIsLoading(false);
        notify(response.message, false);
      }
    });
  };

  const notify = (desc: string, success: boolean) => {
    if (success) {
      toast.success(desc, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(desc, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Backdrop
      open={open}
      sx={{
        display: "flex",
        flexDirection: "column",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgb(20, 20, 20, 0.75)",
      }}
    >
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
        position="relative"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        width="100%"
      >
        <CustomCard
          sx={{
            position: "relative",
            width: "25%",
            minWidth: "400px",
            borderTop: "10px solid " + theme.palette.primary.main,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "-32px",
              right: "-24px",
            }}
            onClick={OnDismiss}
          >
            <CancelIcon
              sx={{
                width: "30px",
                height: "30px",
                color: "gray",
                bgcolor: "white",
                borderRadius: "50%",
              }}
            />
          </IconButton>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography fontSize="20px" sx={{ width: "100%" }}>
              Create a class
            </Typography>
            <TextField
              label="UID"
              value={sessionStorage.getItem("uid")}
              disabled
            />
            <TextField
              label="email"
              value={sessionStorage.getItem("email")}
              disabled
            />
            <TextField
              disabled={isLoading}
              label="Class Name"
              {...register("name")}
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress
                  size="20px"
                  sx={{ color: "white", margin: "6px" }}
                />
              ) : (
                <Typography>Create class!</Typography>
              )}
            </Button>
          </form>
        </CustomCard>
        <Alert severity="info" sx={{ width: "25%", minWidth: "400px" }}>
          <Typography>
            Upon creation, you will be given a class code to share with your
            students so they can join your class.
          </Typography>
        </Alert>
      </Box>
    </Backdrop>
  );
};

export default ClassCreationModal;
