import {
  Button,
  TextField,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CreateAccount } from "../scripts/ApiRoutes";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const ParentSignUpComponent = ({
  notifyToast,
}: {
  notifyToast: (desc: string, severity: "success" | "error") => void;
}) => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(notifyToast);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);

    CreateAccount(
      watch("username"),
      watch("email"),
      watch("password"),
      "sg"
    ).then(() => {
      navigator("/verifyEmail");
    });
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
      <Button disabled={isLoading} variant="contained" fullWidth type="submit">
        {isLoading ? <CircularProgress /> : "Proceed"}
      </Button>
    </form>
  );
};

export default ParentSignUpComponent;
