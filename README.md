Left Over:

##### Parent Page

3. Assignments Page

##### Teacher Page

1. Individual Class Viewing Page (half done) - managed to iterate through students but not retrieve their data for displaying it
2. Individual Student Viewing Page
3. Assignment Creation Page
4. All Assignments viewing page

=================================

##### Smartli Website

Here are some of the dependancies

- React
- react form hook
- MUI
- MUI/Labs
- MUI/base
- Toastify

=================================

##### The general structure of the website

Both accounts (Teacher / Parent) pages operate with simply switching out what element to render.

ParentPage.tsx and TeacherPage.tsx are the main pages for each account. This is where the sidebar resides
and also where each individual account respective pages are rendered and ChapterOverview.tsx and TeacherDashboard.tsx are the default sub pages for each account.

##### Parent Page

ChapterOverview.tsx - Overview of the account data. This is where the overall chapter data is shown
MinigameDashboard.tsx - Individual minigame data for a given chapter.
ParentAssignmentPage.tsx - Overview of the assignments given to the student.
ParentPage.tsx - The main landing page for a parent
Settings.tsx - Any general settings for the account. Changing password and Deletion of the account

##### Teacher Page

AssignmentCreationPage.tsx - The creation of assignments for the students.
AssignmentsPage.tsx - The viewing of all assignments handed out by this teacher
ClassCreationModal.tsx - The pop up shown when creating a new class. Shown when clicking "Create Class"
ClassPage.tsx - Overview of an individual class
TeacherChildDashboard.tsx - View of an individual student's details
TeacherDashboard.tsx - The view of all the classes as well as any details pertaining a teacher
TeacherMinigameDashboard.tsx - The individual view of a student's specific chapter details.
TeacherPage.tsx - The main landing page for a teacher

=================================

##### Components

Here are some of the key components used in the website.

CustomCard.tsx - Because I got lazy typing sx={{ bgColor: "white", borderRadius: "10px", padding: "10px" }} so I just made it a component.
SectionHeader.tsx - A component that lives in the StyledComponents.tsx file. It's the section header I've used through the website.
DataTable.tsx - A table with sorting capabilites that was initially made for viewing the students. Overtime I refactored it so it can also be used for the assignments tables in the parent and teachers page. The overall idea is that the data need only be fed to the table and you provide how each attribute is sorted in the table. Refer to ClassPage.tsx for how I did it.
PrivateRoutes.tsx - This is how I protected the routes that should only be accessed once a login is successful. You can find it's use in App.tsx
Sidebar.tsx - This is the sidebar of the entire application. Simply wrap the content you wish displayed in the sidebar around this component and it should work. Reference ParentPage.tsx and TeacherPage.tsx

AccountContext.tsx - This is how I retrieve the user's data whenever they enter a new page. Wrapping the entire component in this and giving it a useState function to set and you'll have the data of the user. This is (yes I know its weird) unfortunately done by logging in behind the scenes everytime they enter a page. The inital idea of this was the useContext react hook I recently learned about but refreshing the page unfortunately crashes the website so I've resorted to just logging in.

=================================

##### Script layout

Because I've made more games than websites, I am inclined to call this folder scripts and not utils like the rest of the web
development population.

ApiRoutes.ts - Like the name suggests, this is where all the API routes for the website resides.
Assignment.ts - The overall shape of an assignment. Since this piece of feature is a little bit more complex than the others I've decided to pull it out into its own file.
DataParser.ts - Like the name suggests, this is where we handle data parsing from the backend.
ImportRoutes.ts - For file referencing ease, I've decided to keep all the imports in one file. This should hopefully make shifting files around and renaming easy since its all in one file.
index.ts - This script contains any logic that doesn't need to be in its own script.
RandomData.ts - Remnants of the mock data phase of the website. Generation of random data happened here the only real reason I left it here is so you can see how the original structure of the website was framed before incorporating the actual data

=================================

##### data/ChapterNames.json

This is a json made by the collaborative effort of Me, Imsi and Aiman. This JSON contains the data for the names for the chapters and minigames as well as a minigame's performance weights.

=================================

##### The public folder

assets folder - These are for general assets used by the website like the background
profileIcons folder - These are for default profile icons. For testing purposes I only added luffie inside but you can add more here as placeholder profile icons before we somehow incorporate adding the actual avatar image.

=================================

##### server

I have left the nodejs server here because I do not have a real reason to delete it. There's no longer a need to start up the nodejs server. All the APIs are already reading from the Insomnia end points. It is there if you need it for some reason.

=================================

##### React Hook Forms

This is the package that I am using to speed up the process of creating form fields and submitting them.

https://react-hook-form.com/
