import {
  Box,
  Typography,
  Drawer,
  Divider,
  useTheme,
  Skeleton,
  Card,
  CardActionArea,
} from "@mui/material";
import { GameAccount } from "../scripts";
import { AccountAvatar } from "../scripts/ImportRoutes";

export const DrawerDivider = () => {
  return (
    <Divider
      variant="middle"
      sx={{
        borderColor: "#efefef",
      }}
    />
  );
};

export const DrawerCard = ({
  label,
  icon,
  onclick,
}: {
  label: string;
  icon: JSX.Element;
  onclick: () => void;
}) => {
  return (
    <Card
      sx={{
        bgcolor: "primary.main",
        boxShadow: "none",
        color: "white",
      }}
    >
      <CardActionArea
        sx={{
          p: "16px",
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
        }}
        onClick={onclick}
      >
        {icon}
        <Typography fontWeight="bold">{label}</Typography>
      </CardActionArea>
    </Card>
  );
};

interface SidebarProps {
  account: GameAccount;
}

/*
 * This is the sidebar component for the dashboard pages.
 * If you wish to add any content to the sidebar, you can add it as a child of this component.
 * For consistency sake, an account avatar as well as the username and level will always be part of the sidebar
 */
const Sidebar = ({
  account,
  children,
}: React.PropsWithChildren<SidebarProps>) => {
  const theme = useTheme();

  if (account == undefined) {
    return (
      <Box
        bgcolor={theme.palette.primary.light}
        width="280px"
        padding="10px"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Skeleton variant="rectangular" height="100%" />
      </Box>
    );
  }

  return (
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          bgcolor: theme.palette.primary.main,
          opacity: 1,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        padding="20px"
        color="white"
      >
        <AccountAvatar gameAccount={account} size={80} />
        <Box display="flex" flexDirection="column">
          <Typography fontSize="16px" mt={1}>
            Level {account.level}
          </Typography>
          <Typography fontWeight="bold" fontSize="20px" noWrap>
            {account.username}
          </Typography>
        </Box>
      </Box>
      <DrawerDivider />
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        height="100%"
        paddingBottom="10px"
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
