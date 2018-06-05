import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Row, Label, Input, Select } from './styles';

const Baja = ({ change }) => (
    <Wrapper>
        <Row>
            <Label>Razón:</Label>
            <select onChange={change}>
                <option value="0">Elige una opción</option>
                <option value="A">1</option>
                <option value="C">2</option>
                <option value="D">3</option>
                <option value="E">4</option>
                <option value="F">5</option>
            </select>
        </Row>

        <Row>
            <Label>Nombre entrega:</Label>
            <Input type="text" name="nombre_entrega" onChange={change}/>
        </Row>

        <Row>
            <Label>Número referencia:</Label>
            <Input type="text" nombre="numero_referencia" onChange={change}/>
        </Row>
    </Wrapper>
)

Baja.propTypes = {
    change: PropTypes.func
}

export default Baja