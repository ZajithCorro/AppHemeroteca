import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Row, Label, Input, Select } from './styles';

const Baja = ({ change, form }) => (
    <Wrapper>
        <Row>
            <Label>Razón:</Label>
            <Select onChange={change} name="razon" value={form.razon}>
                <option value="0">Elige una opción</option>
                <option value="Cliente">Pedido por Cliente</option>
                <option value="Director">Pedido por Director</option>
                <option value="Modulo">Pedido por Módulo de Gaceta Oficial</option>
            </Select>
        </Row>

        <Row>
            <Label>Nombre entrega:</Label>
            <Input type="text" name="nombre_entrega" onChange={change} value={form.nombre_entrega}/>
        </Row>

        <Row>
            <Label>Número referencia:</Label>
            <Input type="text" name="numero_referencia" onChange={change} value={form.numero_referencia}/>
        </Row>
    </Wrapper>
)

Baja.propTypes = {
    change: PropTypes.func
}

export default Baja