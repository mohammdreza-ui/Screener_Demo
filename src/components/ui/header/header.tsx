import { Navbar, Nav } from 'rsuite';
import { NavLink } from 'react-router-dom';

const SunIcon = "assets/icons/sun.svg";
const MoonIcon = "assets/icons/moon.svg";

export const Header = ({toggleMode, isDark}:any) => {

  return (
    <Navbar style={{padding: "10px 10px 10px 10px", flexDirection:"column-reverse"}} className="d-flex d-md-block px-md-4 px-2">
      <Nav className="d-flex mt-1 align-items-center justify-content-between w-100" >
        <Navbar.Brand as={NavLink} to="/" className="p-2 ps-3" style={{fontSize:24, fontWeight: "bold"}}>LOGO</Navbar.Brand>
        <span onClick={toggleMode} style={{cursor:"pointer", marginRight:20}}><img src={isDark?SunIcon:MoonIcon} alt="" style={{width:30, height:30 }} /></span>
      </Nav>
    </Navbar>
  );
};
