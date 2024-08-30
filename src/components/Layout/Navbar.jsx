import React, { useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMachineListByType,
  setCurrentMachineType,
} from "../../store/actions/machineAction";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const machineTypes = useSelector(
    (state) => state.machineFieldReducer.machineTypes
  );

  const handleMachineClick = (item) => {
    dispatch(getMachineListByType(item?.typeId));
    dispatch(setCurrentMachineType(item));
    navigate(`/types/${item?.typeId}`);
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4 pt-0">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brd_name">
          Objector
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              All
            </Nav.Link>
            {machineTypes &&
              machineTypes.length > 0 &&
              machineTypes.map((item) => (
                <Nav.Link
                  key={item.typeId}
                  onClick={() => handleMachineClick(item)}
                >
                  {item.machineType}
                </Nav.Link>
              ))}
            <Nav.Link as={Link} to="/types">
              Manage Types
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
