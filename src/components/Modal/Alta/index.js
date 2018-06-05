import React, { Component } from 'react'
import { Wrapper, Label, Row } from './styles' 

const Alta = () => (
    <Row>
        <Label>Razón:</Label>
        <select>
            <option defaultValue>Elige una opción</option>
            <option>1</option>
        </select>
    </Row>
)

export default Alta;