import { Button, TextField, Typography } from "@mui/material";
import { SettingsCard } from "../scripts/ImportRoutes";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { ResetPassword } from "../scripts/ApiRoutes";
import { getEmail } from "../scripts";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    if (isValid) {
      notify(
        ResetPassword(getEmail()!, watch("oldPassword"), watch("newPassword"))
      );
    }
  };

  const notify = (detail: Promise<unknown>) => {
    toast.promise(detail, {
      pending: "Verifying...",
      success: "Password Changed!",
      error: "Error changing password",
    });
  };

  return (
    <div>
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
      <SettingsCard>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography fontWeight="bold" fontSize="24px" color="#888888">
            Change Password
          </Typography>
          <TextField
            id="outlined-basic"
            label="Old Password"
            variant="outlined"
            type="password"
            {...register("oldPassword", { required: true })}
            required
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            type="password"
            {...register("newPassword", {
              required: "This field is required!",
              minLength: { value: 8, message: "Password is too short!" },
            })}
            required
          />
          <TextField
            id="outlined-basic"
            label="Repeat New Password"
            variant="outlined"
            type="password"
            {...register("repeatPassword", {
              required: "This field is required!",
              minLength: { value: 8, message: "Password is too short!" },
              validate: {
                matchesPreviousPassword: (value) => {
                  return (
                    watch("newPassword") == value || "Passwords should match!"
                  );
                },
              },
            })}
            error={errors.repeatPassword != null}
            helperText={
              errors.repeatPassword && <>{errors.repeatPassword.message}</>
            }
          />
          <Button variant="contained" color="info" type="submit">
            Change Password
          </Button>
        </form>
      </SettingsCard>
    </div>
  );
};

export default ChangePassword;
