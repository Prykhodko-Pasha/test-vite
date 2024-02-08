import { Avatar, Skeleton } from "@mui/material";
import { GameAccount } from "../scripts";

const AccountAvatar = ({
  gameAccount,
  size,
}: {
  gameAccount: GameAccount | undefined;
  size: number;
}) => {
  if (gameAccount == null) {
    return <Skeleton variant="circular" width={size} height={size} />;
  }

  return (
    <Avatar
      src={gameAccount.profileImage}
      alt=""
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        border: "2px solid white",
        boxShadow: "4",
      }}
    />
  );
};

export default AccountAvatar;
