import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand
} from 'reactstrap';
import Home from './Home';

export default class Header extends Component {
    constructor (props) {
        super(props);
    }

    toggle () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logClick () {
        this.setState({ register: false });
        if (this.state.loggedIn) {
            sessionStorage.removeItem('user');
            this.loginHandler(false);
        }
    }

    loginHandler (logged) {
        this.setState({ loggedIn: logged });
    }

    registerHandler (e, val) {
        this.setState({ register: val });
    }

    render () {
        let board = <Home />;

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Accueil</NavbarBrand>
                </Navbar>

                {board}

            </div>
        );
    }
}
