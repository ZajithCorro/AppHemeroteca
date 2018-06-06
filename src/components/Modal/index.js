import React, { Component } from 'react'
import PropTypes from 'prop-types'

import firebase from '../../firebase'
import validator from '../validator'
import Alta from './Alta'
import Baja from './Baja'
import { Wrapper, Content, Title, Buttons, Form, Button, Label, Circle, FormHead, Message, Link } from './styles'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            inventario: this.props.data.inventario, 
            aux: this.props.data.inventario,
            razon: '',
            nombre_entrega: '',
            numero_referencia: ''
        }

        this.infoForm = this.infoForm.bind(this)
    }

    infoForm(event) {
        let name = event.target.name
        let value = event.target.value

        this.setState({ [name] : value })
    }

    add() {
        this.setState({ inventario: this.state.inventario + 1 })
    }

    subtract() {
        if (this.state.inventario > 0) {
            this.setState({ inventario: this.state.inventario - 1 })
        }
    }

    save() {
        let movimiento = {
            num_gaceta: this.props.data.numero,
            razon: this.state.razon,
            nombre: this.state.nombre_entrega || 'N/A',
            numero: this.state.numero_referencia || 'N/A',
            movimiento: (this.state.aux > this.state.inventario) ? 'Baja' : 'Alta',
            gacetas_movimiento: this.state.inventario - this.state.aux,
        }

        firebase.firestore()
            .collection('movimientos')
            .add(movimiento)
            .then(docRef => {
                this.setState({ 
                    razon: '',
                    numero_referencia: '',
                    nombre_entrega: ''
                })
            })
            .catch(err => {
                console.log(err)
            })

        firebase.firestore()
            .collection('gacetas')
            .doc(this.props.data.key)
            .update({ inventario: this.state.inventario })
            .then(docRef => {
                this.props.hideModal()
            })
            .catch(err => {
                console.log(err)
            })
        
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
                                <Baja 
                                    change={this.infoForm}
                                    form={this.state}/> : 
                            (this.state.aux < this.state.inventario) ?
                                <Alta 
                                    change={this.infoForm}
                                    form={this.state}/> : 
                                    <Message>Ventana para cambiar la existencia en Hemeroteca</Message>
                        }
                    </Form>
                    <Buttons>
                        <Button cancel onClick={() => hideModal(null)}>Cancelar</Button>
                        <Link href={data.urlFile} target="_blank">Ver</Link>
                        <Button primary onClick={this.save.bind(this)}>Guardar</Button>
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
