import { Navbar, Nav } from 'rsuite';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <Navbar style={{padding: "10px 10px 10px 10px", flexDirection:"column-reverse"}} className="d-flex d-md-block px-md-4 px-2">
      <Nav className="d-flex mt-1 align-items-center justify-content-between w-100" >
        <Navbar.Brand as={NavLink} to="/" className="p-2 ps-3" style={{fontSize:24, fontWeight: "bold"}}>LOGO</Navbar.Brand>
      </Nav>
    </Navbar>
  );
};

export default Header;
