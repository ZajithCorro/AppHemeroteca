import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Label, Row, Select } from './styles' 

const Alta = ({ change, form }) => (
    <Row>
        <Label>Razón:</Label>
        <Select onChange={change} name="razon" value={form.razon}>
            <option defaultValue>Elige una opción</option>
            <option value="compltar">Completar un pedido</option>
            <option value="salidas">Futuras salidas</option>
        </Select>
    </Row>
)

Alta.propTypes = {
    change: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
}

export default Alta;