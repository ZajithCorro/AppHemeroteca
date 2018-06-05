import React, { Component } from 'react'
import PropTypes from 'prop-types'

import firebase from '../../firebase'
import Alta from './Alta'
import Baja from './Baja'
import { Wrapper, Content, Title, Buttons, Form, Button, Label, Circle, FormHead } from './styles'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            inventario: this.props.data.inventario, 
            aux: this.props.data.inventario
        }
    }

    infoForm(event) {
        console.log(event.target.value)
    }

    add() {
        this.setState({ inventario: this.state.inventario + 1 })
    }

    subtract() {
        if (this.state.inventario > 0) {
            this.setState({ inventario: this.state.inventario - 1 })
        }
    }

    render()  {
        const { data, hideModal } = this.props

        return (
            <Wrapper>
                <Content>
                    <Title>Gaceta #{data.numero}</Title>
                    <Form>
                        <FormHead>
                            <Circle onClick={this.add.bind(this)}>+</Circle>
                            <Label>{ this.state.inventario }</Label>
                            <Circle onClick={this.subtract.bind(this)}>-</Circle>
                        </FormHead>

                        { 
                            (this.state.aux > this.state.inventario) ?
                                <Baja change={this.infoForm}/> : 
                            (this.state.aux < this.state.inventario) ?
                                <Alta /> : null
                        }
                    </Form>
                    <Buttons>
                        <Button cancel onClick={() => hideModal(null)}>Cancelar</Button>
                        <Button primary>Guardar</Button>
                    </Buttons>
                </Content>
            </Wrapper>
        )
    }
}

Modal.propTypes = {
    hideModal: PropTypes.func.isRequired,
    data: PropTypes.object
}

export default Modal
