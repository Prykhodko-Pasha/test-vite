import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AccountContext,
  AssignmentCreationPage,
  ClassPage,
  Settings,
  Sidebar,
  AssignmentPage
} from "../../scripts/ImportRoutes";
import { useState, useEffect } from "react";
import { GameAccount, setLoggedOut, Class, getEmail, getUID } from "../../scripts";
import { DrawerCard } from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import TeacherDashboard from "./TeacherDashboard";
import { GetClassrooms } from "../../scripts/ApiRoutes";

export default function TeacherPage() {
  const navigator = useNavigate();
  const [account, setAccount] = useState<GameAccount | undefined>(undefined);
  const [page, setPage] = useState<JSX.Element>();
  const [classes, setClasses] = useState<Class[]>([]); 

  const getUserClasses = () => {
    const email = getEmail();
    const uid = getUID();
    if (email && uid) {
      GetClassrooms(email, uid, true).then((response) => {
        if (response.success) {
          console.log(response.data);
          const classes = response.data.map(Class.fromJSON);
          setClasses(classes);
        } else {
          console.log(response.message);
        }
      });
    }
  }

  useEffect(() => {
    getUserClasses();
  }, []);


  const RenderTeacherDashboard = () => {
    return (
      <TeacherDashboard
        classes={classes}
        OnClick={(id) => {
          setPage(
            <ClassPage
              studentClass={classes[id]!}
              OnStudentClicked={() => {}}
              OnBackClicked={() => {
                setPage(RenderTeacherDashboard);
              }}
              onAssignmentClicked={(index) => {
                setPage(
                  <AssignmentPage
                    assignment={classes[id].assignments[index]}
                    teacher={true}
                  />
                );
              }}
              onCreateAssignmentClicked={() => {
                setPage(<AssignmentCreationPage 
                  classes={classes}
                />);
              }}
            />
          );
        }}
      />
    );
  };
  return (
    <AccountContext setAccount={setAccount}>
      <Box display="flex">
        <Sidebar account={account!}>
          <DrawerCard
            label="Dashboard"
            icon={<DashboardIcon />}
            onclick={() => setPage(RenderTeacherDashboard)}
          />
          <DrawerCard
            label="Settings"
            icon={<SettingsIcon />}
            onclick={() => setPage(<Settings />)}
          />
          <Box marginTop="auto">
            <DrawerCard
              label="Log Out"
              icon={<LogoutIcon />}
              onclick={() => {
                setLoggedOut();
                navigator("/");
              }}
            />
          </Box>
        </Sidebar>
        <Box
          component="main"
          sx={{
            padding: "2%",
            paddingLeft: "4%",
            width: "100vw",
            maxWidth: "67%",
          }}
        >
          {page == null && RenderTeacherDashboard()}
          {page}
        </Box>
      </Box>
    </AccountContext>
  );
}
