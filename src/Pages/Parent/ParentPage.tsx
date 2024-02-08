import { Box } from "@mui/material";
import {
  AccountContext,
  Settings,
  MinigameDashboard,
  Sidebar,
  ParentAssignmentPage,
  AssignmentPage,
  ParentClassPage,
} from "../../scripts/ImportRoutes";
import {
  GameAccount,
  loadChapterData,
  setLoggedOut,
  Class,
  getEmail,
  getUID
} from "../../scripts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DrawerCard } from "../../Components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChapterOverview from "./ChapterOverview";
import SchoolIcon from "@mui/icons-material/School";
import { GetClassrooms } from "../../scripts/ApiRoutes";
import { Assignment } from "../../scripts/Assignment";

const ParentPage = () => {
  loadChapterData();

  const navigator = useNavigate();

  const [account, setAccount] = useState<GameAccount | undefined>(undefined);
  const [page, setPage] = useState<JSX.Element>();
  const [classes, setClasses] = useState<Class[]>([]); 

  const getUserClasses = () => {
    const email = getEmail();
    const uid = getUID();
    if (email && uid) {
      GetClassrooms(email, uid, false).then((response) => {
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

  const RenderDashboard = () => {
    return (
      <ChapterOverview
        props={{
          account: account,
          OnChapterClicked(index) {
            setPage(
              <MinigameDashboard
                account={account!}
                level={index}
                OnClick={() => {
                  setPage(RenderDashboard);
                }}
              />
            );
          },
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
            onclick={() => setPage(RenderDashboard)}
          />
          <DrawerCard
            label="Classes"
            icon={<SchoolIcon />}
            onclick={() => setPage(<ParentClassPage 
              getUserClasses={getUserClasses}
              classesData={classes}
              onClassClicked={ (classroomCode: string) =>{
                setPage(
                  <ParentAssignmentPage
                    classroomCode={classroomCode}
                    onAssignmentClicked={ (assignment: Assignment) =>
                      setPage(
                        <AssignmentPage
                          assignment={assignment}
                          teacher={false}
                        />
                      )
                    }
                  />
                )
              }}
            />)}
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
          {page == null && RenderDashboard()}
          {page}
        </Box>
      </Box>
    </AccountContext>
  );
};

export default ParentPage;
