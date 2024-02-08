import {
  Backdrop,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { CustomCard, SectionHeader } from "../../scripts/ImportRoutes";
import HelpIcon from "@mui/icons-material/Help";
import { SubmitHandler, useForm } from "react-hook-form";
import { JoinClassroom } from "../../scripts/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { Class } from "../../scripts";
import { useState } from "react";
import ClassCard from "../../Components/ClassCard";

type Inputs = {
  displayName: string;
  classroomCode: string;
};

const ParentClassesPage = (
  { getUserClasses, classesData, onClassClicked }: { getUserClasses: () => void, classesData: Class[], onClassClicked: (classroomCode: string) => void }
) => {

  const [showModal, setShowModal] = useState(false);
  const [classes] = useState<Class[]>(classesData); 
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isValid) {
      JoinClassroom(
        sessionStorage.getItem("email")!,
        sessionStorage.getItem("uid")!,
        data.displayName,
        data.classroomCode
      ).then((response) => {
        if (response.success) {
          notify(response.data.result, true);
          getUserClasses();
          window.location.reload();
        } else {
          notify(`${response.status}: ${response.message}`, false);
        }
      });
    }
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

  const RenderAddClassModal = () => {
    return (
      <Backdrop
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgb(20, 20, 20, 0.75)",
        }}
        open={showModal}
      >
        <CustomCard
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "400px",
            boxShadow: "2",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "-24px",
              right: "-24px",
            }}
            onClick={() => setShowModal(false)}
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
          <Typography fontWeight="bold" fontSize="20px" align="center">
            Join a class
          </Typography>
          <Typography align="center">
            Smartli is better with friends! Ask your teacher for a class code to
            join a class.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              required
              fullWidth
              label="Display Name"
              {...register("displayName")}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={
                      <Typography fontSize="14px">
                        This is the display name used to identify you in the
                        class. It is recommended that you use your real name.
                      </Typography>
                    }
                  >
                    <InputAdornment position="end">
                      <HelpIcon />
                    </InputAdornment>
                  </Tooltip>
                ),
              }}
            />
            <TextField
              required
              fullWidth
              label="Class Code"
              {...register("classroomCode")}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={
                      <Typography fontSize="14px">
                        When your teacher has created a class, they will be
                        given a class code to share with you. Enter that class
                        code here to join the class.
                      </Typography>
                    }
                  >
                    <InputAdornment position="end">
                      <HelpIcon />
                    </InputAdornment>
                  </Tooltip>
                ),
              }}
            />
            <Button variant="contained" type="submit" fullWidth>
              <Typography>Join Class</Typography>
            </Button>
          </form>
        </CustomCard>
      </Backdrop>
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap="10px">
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
      {RenderAddClassModal()}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <SectionHeader>
          <Typography fontSize="24px">Classes</Typography>
        </SectionHeader>
        <Button
          variant="contained"
          sx={{ borderRadius: "100px", height: "fit-content" }}
          startIcon={<AddIcon />}
          onClick={() => setShowModal(true)}
        >
          <Typography fontSize="14px" fontWeight="bold">
            Join class
          </Typography>
        </Button>
      </Box>
      {classes.map((item, index) => {
          return (
            <ClassCard
              key={index}
              classData={item}
              fadeInTimeOutOffset={150}
              OnClick={() => onClassClicked(item.code)}
            />
          );
        })
      }
    </Box>
  );
};

export default ParentClassesPage;
