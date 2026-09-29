import Admin_Project from "./components/project/Admin_Project";
import No_Project_Yet_Dashboard from "./components/project/No_Project_Yet_Dashboard";
import Admin_Dashboard from "./pages/Admin_Dashboard";
import Already_joined from "./pages/Already_joined";
import Create_Organ from "./pages/Create_Organ";
import Invalid_Code from "./pages/Invalid_code";
import Join_Organ from "./pages/Join_Organ";
import Login from "./pages/Login";
import Member_Dashboard from "./pages/Member_Dashboard";
import Organi_Created from "./pages/Organi_Created";
import Organi_Joined from "./pages/Organi_joined";
import Register from "./pages/Register";
import Setup_Organ from "./pages/Setup_Organ";

function App() {
  return (
    <>
    {/* <Register/>
    <Login/>
    <Setup_Organ/>
    <Create_Organ/>
    <Join_Organ/>

    <Organi_Created/>
    <Organi_Joined/>

    <Invalid_Code/>
    <Already_joined/> */}

    {/* <Admin_Dashboard/> */}
    {/* <Member_Dashboard/> */}
    {/* <No_Project_Yet_Dashboard/> */}
    <Admin_Project/>
    </>  
    
  )
}

export default App