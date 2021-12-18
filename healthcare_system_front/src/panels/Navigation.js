import React, { Component } from 'react'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../components/Auth/UserContext'
import AuthHelper from '../helpers/AuthHelper'


class Navigation extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <hr />
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" />
                            </svg>
                            <span> </span>
                            Healthcare System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            <UserContext.Consumer> 
                                {(userContext)=><>
                                        {userContext.user != null && (
                                        <Nav>    
                                                <Nav.Link href="/login">Prihlásenie</Nav.Link>                               
                                        </Nav>
                                        )}
                                        <Nav>
                                            <Nav.Link href="/register">Registrácia</Nav.Link>
                                        </Nav>
                                    </>
                                }
                            </UserContext.Consumer>
                            
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


export default withRouter(Navigation)
