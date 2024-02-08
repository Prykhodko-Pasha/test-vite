import {
  Button,
  TextField,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { CreateTeacherAccount } from "../scripts/ApiRoutes";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  accountType: string;
  displayName: string;
  institutionCode: string;
};

const TeacherSignUpComponent = ({
  notifyToast,
}: {
  notifyToast: (desc: string, severity: "success" | "error") => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isValid) {
      setIsLoading(true);

      CreateTeacherAccount(
        data.email,
        data.password,
        data.username,
        data.displayName,
        data.institutionCode
      ).then((response) => {
        console.log(response);
        if (response.success) {
          notifyToast("Account created successfully!", "success");
          navigator("/teacherdashboard");
        } else {
          notifyToast(`${response.status}: ${response.message}`, "error");
          setIsLoading(false);
        }
      });
    }
  };

  return (
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
        type="text"
        label="Username"
        fullWidth
        {...register("username", {
          required: "This field is required!",
          minLength: { value: 3, message: "Username is too short!" },
        })}
        error={errors.username != null}
        helperText={errors.username && <>{errors.username.message}</>}
      />
      <TextField
        disabled={isLoading}
        type="email"
        label="Email"
        fullWidth
        {...register("email", { required: "This field is required!" })}
        error={errors.email != null}
        helperText={errors.email && <>{errors.email.message}</>}
      />
      <TextField
        disabled={isLoading}
        type="password"
        label="Password"
        fullWidth
        {...register("password", {
          required: "This field is required!",
          minLength: { value: 8, message: "Password is too short!" },
        })}
        error={errors.password != null}
        helperText={errors.password && <>{errors.password.message}</>}
      />
      <TextField
        disabled={isLoading}
        type="password"
        label="Repeat Password"
        fullWidth
        {...register("repeatPassword", {
          required: "This field is required!",
          minLength: { value: 8, message: "Password is too short!" },
          validate: {
            matchesPreviousPassword: (value) => {
              return watch("password") == value || "Passwords should match!";
            },
          },
        })}
        error={errors.repeatPassword != null}
        helperText={
          errors.repeatPassword && <>{errors.repeatPassword.message}</>
        }
      />
      <Divider flexItem variant="middle">
        Teacher Specific
      </Divider>
      <TextField
        disabled={isLoading}
        type="text"
        label="Display Name"
        fullWidth
        {...register("displayName", {
          required: "This field is required!",
          minLength: { value: 3, message: "Username is too short!" },
        })}
        error={errors.username != null}
        helperText={errors.username && <>{errors.username.message}</>}
        InputProps={{
          endAdornment: (
            <Tooltip
              placement="top"
              title={
                <Typography>
                  This username is used when presenting your account to your
                  students. We recommend using your real name.
                </Typography>
              }
            >
              <HelpIcon
                sx={{ cursor: "pointer", color: "#555555" }}
                onClick={() => {
                  console.log("Help");
                }}
              />
            </Tooltip>
          ),
        }}
      />
      <TextField
        disabled={isLoading}
        type="text"
        label="School Code"
        fullWidth
        {...register("institutionCode", {
          required: "This field is required!",
        })}
        error={errors.username != null}
        helperText={errors.username && <>{errors.username.message}</>}
        InputProps={{
          endAdornment: (
            <Tooltip
              placement="top"
              title={
                <Typography>
                  This is a code that's given by the school. If you don't have a
                  code, please contact your school's administrator.
                </Typography>
              }
            >
              <HelpIcon
                sx={{ cursor: "pointer", color: "#555555" }}
                onClick={() => {
                  console.log("Help");
                }}
              />
            </Tooltip>
          ),
        }}
      />
      <Button disabled={isLoading} variant="contained" fullWidth type="submit">
        {isLoading ? <CircularProgress /> : "Proceed"}
      </Button>
    </form>
  );
};

export default TeacherSignUpComponent;
