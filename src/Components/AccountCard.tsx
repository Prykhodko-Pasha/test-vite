import { Avatar, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AccountCard = ({
  username,
  email,
  profilePicture,
}: {
  username: string;
  email: string;
  profilePicture: string;
}) => {

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap="10px"
      bgcolor="white"
      borderRadius="10px"
      padding="10px"
      alignItems="center"
    >
      <Avatar src={profilePicture} />
      <Box>
        <Typography fontWeight="bold">{username}</Typography>
        <Typography>{email}</Typography>
      </Box>
      <DeleteIcon sx={{ marginLeft: "auto" }} />
    </Box>
  );
};

export default AccountCard;
