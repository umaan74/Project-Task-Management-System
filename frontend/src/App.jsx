import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setup_Organ from "./pages/Setup_Organ";
import Create_Organ from "./pages/Create_Organ";
import Join_Organ from "./pages/Join_Organ";
import Organi_Created from "./pages/Organi_Created";
import Organi_Joined from "./pages/Organi_Joined";
import Invalid_Code from "./pages/Invalid_Code";
import Already_joined from "./pages/Already_joined";
import Admin_Dashboard from "./pages/Admin_Dashboard";
import Member_Dashboard from "./pages/Member_Dashboard";
import Admin_Project from "./components/project/Admin/Admin_Project";
import Member_Project from "./components/project/Member/Member_Project";
import Admin_In_Single_Project from "./components/project/Admin/Admins_Inside_the_single_Project";
import Member_In_Single_Project from "./components/project/Member/Member_Inside_the_single_Project";
import Admin_Inside_Task from "./components/project/Admin/Admin_Inside_the_Task";
import Member_Inside_Task from "./components/project/Member/Member_Inside_the_Task";
import Admin_Organization_Members from './components/organization/admin/Admin_Organization_Members_Page.jsx'

import Member_Organization_Members from "./components/organization/member/Members_Organization_Members_Page.jsx";
import Admin_Organization_Settings from "./components/organization/admin/Admin_Organization_Settings.jsx";
import Edit_Profile from './components/Profile/Edit_Profile.jsx'
import Profile_Page from './components/Profile/profile_page.jsx'
import Change_Password from './components/Profile/Password_change.jsx'
function App() {
  const role = "ADMIN";
  return (<>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/setup-organization" element={<Setup_Organ />} />
      <Route path="/create-organization" element={<Create_Organ />} />
      <Route path="/join-organization" element={<Join_Organ />} />
      <Route path="/organization-created" element={<Organi_Created />} />
      <Route path="/organization-joined" element={<Organi_Joined />} />
      <Route path="/invalid-code" element={<Invalid_Code />} />
      <Route path="/already-joined" element={<Already_joined />} />
      <Route
        path="/dashboard"
        element={
          role === "ADMIN"
            ? <Admin_Dashboard />
            : <Member_Dashboard />
        }
      />
      <Route
        path="/projects"
        element={
          role === "ADMIN"
            ? <Admin_Project />
            : <Member_Project />
        }
      />

      <Route path="/projects/:projectId" element={
        role === "ADMIN" ? <Admin_In_Single_Project /> : <Member_In_Single_Project />
      } />

      <Route
        path="/projects/:projectId/tasks/:taskId"
        element={
          role === "ADMIN"
            ? <Admin_Inside_Task />
            : <Member_Inside_Task />
        }
      />
      <Route path="/members" element={
        role==='ADMIN'?<Admin_Organization_Members/>:<Member_Organization_Members/>
      }/>

      <Route path="/settings" element={
        role==="ADMIN"?<Admin_Organization_Settings/>:null
      }/>
      <Route path="/profile" element={
      <Profile_Page/>}/>
      <Route path="/profile/edit" element={
      <Edit_Profile/>}/>
      <Route path="/profile/change-password" element={
      <Change_Password/>}/>
    </Routes>
  </>
  );
}

export default App;