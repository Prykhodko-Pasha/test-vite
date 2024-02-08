import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  AlertTitle,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
  Theme,
  Backdrop,
  Card,
  CardActionArea,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AccountType } from "../scripts";
import ParentSignUpComponent from "../Components/ParentSignUpComponent";
import TeacherSignUpComponent from "../Components/TeacherSignUpComponent";
import HelpIcon from "@mui/icons-material/Help";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  const [accountType, setAccountType] = useState(AccountType.Parent);
  const [showAccountTypeInfo, setShowAccountTypeInfo] =
    useState<boolean>(false);

  const handleAccountTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAccountType: AccountType
  ) => {
    console.log(event);
    if (newAccountType !== null) {
      setAccountType(newAccountType);
    }
  };
  const renderAccountTypeInfo = (theme: Theme) => {
    return (
      <Backdrop
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgb(20, 20, 20, 0.75)",
        }}
        open={showAccountTypeInfo}
      >
        <Box
          position="relative"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Box
            display="flex"
            flexDirection="column"
            padding="20px"
            borderRadius="8px"
            gap="20px"
            color="white"
          >
            <Typography fontSize="34px" fontWeight="bold">
              I am a
              {accountType != AccountType.None ? ` ${accountType}!` : "..."}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="20px"
            >
              <Card
                sx={{
                  bgcolor: `${theme.palette.primary.light}`,
                  borderRadius: "8px",
                  boxShadow: "6",
                }}
              >
                <CardActionArea
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "120px 1px auto auto",
                    gap: "14px",
                    padding: "30px",
                    alignItems: "center",
                    color: "white",
                  }}
                  onClick={() => {
                    setAccountType(AccountType.Parent);
                  }}
                >
                  <Typography fontSize="30px" fontWeight="bold">
                    Parent
                  </Typography>
                  <Divider
                    orientation="vertical"
                    color="white"
                    sx={{ width: "1px" }}
                  />
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Typography>- monitor your child's progress</Typography>
                    <Typography>- entire game grades at a glance</Typography>
                  </Box>
                </CardActionArea>
              </Card>
              <Card
                sx={{
                  bgcolor: `${theme.palette.primary.main}`,
                  borderRadius: "8px",
                  boxShadow: "6",
                }}
              >
                <CardActionArea
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "120px 1px auto auto",
                    gap: "14px",
                    padding: "30px",
                    alignItems: "center",
                    color: "white",
                  }}
                  onClick={() => {
                    setAccountType(AccountType.Teacher);
                  }}
                >
                  <Typography fontSize="30px" fontWeight="bold">
                    Teacher
                  </Typography>
                  <Divider
                    orientation="vertical"
                    color="white"
                    sx={{ width: "1px" }}
                  />
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Typography>- entire class grades at a glance</Typography>
                    <Typography>- manage multiple game accounts</Typography>
                  </Box>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "0",
                      justifySelf: "end",
                      marginTop: "6px",
                      marginRight: "10px",
                      color: "#ffd16e",
                    }}
                    fontWeight="bold"
                    fontSize="12px"
                  >
                    School code required!
                  </Typography>
                </CardActionArea>
              </Card>
            </Box>
            <Button
              disabled={accountType == AccountType.None}
              variant="contained"
              sx={{ width: "fit-content", alignSelf: "center" }}
              onClick={() => {
                setShowAccountTypeInfo(false);
              }}
            >
              <Typography fontWeight="bold">Back</Typography>
            </Button>
          </Box>
        </Box>
      </Backdrop>
    );
  };

  const notify = (desc: string, severity: "success" | "error") => {
    if (severity == "success") {
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
    <Container maxWidth="xs">
      {renderAccountTypeInfo(theme)}
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
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        paddingTop="auto"
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
          gap="10px"
          boxShadow="4"
        >
          <Typography fontWeight="bold" fontSize="24px">
            Sign Up
          </Typography>
          <Alert severity="info">
            <AlertTitle>
              <Typography>
                If you've created an account with the games then please proceed
                to log in with that email instead.
              </Typography>
            </AlertTitle>
          </Alert>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            paddingRight="6px"
            marginBottom="-12px"
          >
            <Typography sx={{ color: "#666666" }}>Account Type</Typography>
            <Tooltip
              placement="top"
              title={<Typography>Click to learn more</Typography>}
            >
              <IconButton
                onClick={() => {
                  setShowAccountTypeInfo(true);
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <ToggleButtonGroup
            value={accountType}
            onChange={handleAccountTypeChange}
            color="primary"
            exclusive
            fullWidth
          >
            <ToggleButton
              value={AccountType.Parent}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              <Typography>Parent</Typography>
            </ToggleButton>
            <ToggleButton
              value={AccountType.Teacher}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              <Typography>Teacher</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          {accountType == AccountType.Parent ? (
            <ParentSignUpComponent notifyToast={notify} />
          ) : (
            <TeacherSignUpComponent notifyToast={notify} />
          )}
        </Box>
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => {
            navigator("/login");
          }}
        >
          <Typography color="black">
            Already have an account? Log In Here
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
