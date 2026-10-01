import Admin_Project from "./components/project/Admin/Admin_Project";
import Member_Project from "./components/project/Member/Member_Project";
import No_Project_Yet_Dashboard from "./pages/Dashboard_Member_No_Project_Yet";
import Member_Dashboard from "./pages/Member_Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Setup_Organ from "./pages/Setup_Organ";
import Create_Organ from "./pages/Create_Organ";
import Join_Organ from "./pages/Join_Organ";
import Organi_Created from "./pages/Organi_Created";
import Organi_Joined from "./pages/Organi_Joined";
import Invalid_Code from "./pages/Invalid_Code";
import Already_joined from "./pages/Already_joined";
import Admin_Dashboard from "./pages/Admin_Dashboard";
import Admin_No_Project from "./components/project/Admin/Admin_No_Project_Yet";
import Member_No_Project from "./components/project/Project-components/Member_No_Project_component";
import Member_No_Project_Yet from "./components/project/Member/Member_No_Project_Yet";
import Admin_Create_Project from "./components/project/Admin/Admin_Create_Project";
import Admin_In_Single_Project from "./components/project/Admin/Admins_Inside_the_single_Project";
import Member_In_Single_Project from "./components/project/Member/Member_Inside_the_single_Project";
import Admin_Add_Project_Member from "./components/project/Admin/Admin_Add_Project_Member";
import Admin_Create_Task from "./components/project/Admin/Admin_Create_Task";
import Admin_Inside_Task from "./components/project/Admin/Admin_Inside_the_Task";
import Member_Inside_Task from "./components/project/Member/Member_Inside_the_Task";
import Admin_Organization_Members_Page from "./components/organization/admin/Admin_Organization_Members_Page";
import Admin_Organization_Members from "./components/organization/admin/Admin_Organization_Members_Page";
import Member_Organization_Members_Page from "./components/organization/members/Members_Organization_Members_Page";

function App() {
  return (
    <>
      {/* <Register />
      <Login />
      <Setup_Organ />
      <Create_Organ />
      <Join_Organ />

      <Organi_Created />
      <Organi_Joined />

      <Invalid_Code />
      <Already_joined />

      <Admin_Dashboard />
      <Member_Dashboard />
      <No_Project_Yet_Dashboard />
      <Admin_Project />
      <Member_Project />
      <Admin_No_Project />
      <Member_No_Project_Yet />
      <Admin_Create_Project />
      <Admin_In_Single_Project />
      <Member_In_Single_Project />
      <Admin_Add_Project_Member/> */}
      {/* <Admin_Create_Task/> */}
      {/* <Admin_Inside_Task/> */}
      {/* <Member_Inside_Task/> */}
      {/* <Admin_Organization_Members/> */}
      <Member_Organization_Members_Page/>
    </>

  )
}

export default App

