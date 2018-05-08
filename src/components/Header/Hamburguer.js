// Dependencies
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled , { keyframes } from 'styled-components';
import { Transform } from 'stream';

const Hamburguer = styled.div`
    height: auto;

    &:hover {
        cursor: pointer;
    }

    span {
        border-radius: 2px;
        background: rgb(85, 86, 90);
        display: block;
        height: 4px;
        transition: .5s;
        width: 40px;
    }

    span:nth-child(1) {
        margin-bottom: 5px;
        ${({ active }) => active && `
            transform: scaleX(0);
        `}
    }

    span:nth-child(2) {
        margin-bottom: 5px;
        ${({ active }) => active && `
            transform: rotate(45deg);
        `}
    }

     span:nth-child(3) {
        ${({ active }) => active && `
            transform: translateY(-9px) rotate(-45deg);
        `}
    }
` 

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