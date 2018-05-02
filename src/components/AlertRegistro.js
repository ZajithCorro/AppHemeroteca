import React, { Component } from 'react'
import styled from 'styled-components'

const Message = styled.div`
    background-color: rgb(120, 189, 120);
    border-radius: 5px;
    width: 80%;
    margin: 0 auto;
    padding: 10px 15px;
`
const MessageTitle = styled.p`
    text-align: center;
    color: #FFF;
`

const MessageBody = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Row = styled.p`

`

class AlertRegistro extends Component {
    render() {
        return(
            <div className="contenedor">
                <Message>
                    <MessageTitle>Registro realizado con éxito</MessageTitle>
                    <MessageBody>
                        <Row>Número de gaceta: </Row>
                        <Row>Número de tomo:</Row>
                        <Row>Tipo: </Row>
                        <Row>Páginas: </Row>
                        <Row>Fecha de ejemplar:</Row>
                    </MessageBody>
                </Message>
            </div>
        );
    }
}

export default AlertRegistro;