import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Hamburguer } from './styles'

class IconMenu extends Component {
    constructor() {
        super();
        this.state = {
           isActive: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({ isActive: !this.state.isActive })
    }

    render() {
        return(
            <Hamburguer onClick={this.handleToggle} active={this.state.isActive}>
                <span></span>
                <span></span>
                <span></span>
            </Hamburguer>
        );
    }
}

export default IconMenu;