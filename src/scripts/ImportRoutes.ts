//This file is used to import all the routes in the application
//This makes handling any shifting of files easier as we only need to change the import here

export { default as AccountContext } from "../Components/AccountContext";

//Components
export { default as Sidebar } from "../Components/Sidebar";
export { default as ChapterCard } from "../Components/ChapterCard";
export { default as MinigameCard } from "../Components/MinigameCard";
export { default as Footer } from "../Components/Footer";
export { default as AccountCard } from "../Components/AccountCard";
export { default as PrivateRoutes } from "../Components/PrivateRoutes";
export { default as ClassStatsCard } from "../Components/ClassStatsCard";
export { default as AccountAvatar } from "../Components/AccountAvatar";
export { default as DataTable } from "../Components/DataTable";
export { default as ChangePassword } from "../Components/ChangePassword";
export { default as CustomCard } from "../Components/CustomCard";
export { default as TeacherSignUpComponent } from "../Components/TeacherSignUpComponent";
export { default as ParentSignUpComponent } from "../Components/ParentSignUpComponent";
export * from "../Components/StyledComponents";

//Pages - General
export { default as GetStarted } from "../Pages/GetStarted";
export { default as LogInPage } from "../Pages/LogIn";
export { default as SignUpPage } from "../Pages/SignUp";
export { default as Error404 } from "../Pages/Error404";
export { default as VerifyEmailPage } from "../Pages/VerifyEmailPage";
export { default as ForgotPasswordPage } from "../Pages/ForgotPassword";
export { default as AssignmentPage } from "../Pages/AssignmentPage";
export { default as ParentClassPage } from "../Pages/Parent/ParentClassesPage";

//Pages - Parent
export { default as ParentPage } from "../Pages/Parent/ParentPage";
export { default as MinigameDashboard } from "../Pages/Parent/MinigameDashboard";
export { default as Settings } from "../Pages/Parent/Settings";
export { default as ParentAssignmentPage } from "../Pages/Parent/ParentAssignmentPage";
export { default as ClassCreationModal } from "../Pages/Teacher/ClassCreationModal";

//Pages - Teacher
export { default as ClassPage } from "../Pages/Teacher/ClassPage";
export { default as ClassesPage } from "../Pages/Teacher/TeacherDashboard";
export { default as TeacherDashboard } from "../Pages/Teacher/TeacherPage";
export { default as AssignmentsPage } from "../Pages/Teacher/AssignmentsPage";
export { default as TeacherChildDashboard } from "../Pages/Teacher/TeacherChildDashboard";
export { default as TeacherMinigameDashboard } from "../Pages/Teacher/TeacherMinigameDashboard";
export { default as AssignmentCreationPage } from "../Pages/Teacher/AssignmentCreationPage";

//Graphs and Charts
export { default as GraphCard } from "../Components/Charts/GraphCard";
export { default as DailyTimeGraph } from "../Components/Charts/DailyTimeGraph";
export { default as MinigameScoresGraph } from "../Components/Charts/MinigameScoresGraph";
export { default as QuizScoresGraph } from "../Components/Charts/QuizScoresGraph";
export { default as FifiIntroCard } from "../Components/Charts/FifiIntroductionCard";
export { default as LeaderboardCard } from "../Components/Charts/LeaderboardGraph";
export { default as MoreSoonCard } from "../Components/Charts/MoreStatisticsCard";
