import React, { Component } from 'react'
import PropTypes from 'prop-types'

import firebase from '../../firebase.js'
import { Wrapper, Thead, Tbody, Th, Td, Tr, Error, Img } from './styles'
import iconError from '../Img/cancelar.svg'

const Table = ({ data, seeModal, error }) => (
    (data.length != 0) ? (
        <Wrapper>
            <Thead>
                <tr>
                    <Th>No. gaceta</Th>
                    <Th>Tipo</Th>
                    <Th>Páginas</Th>
                    <Th>Tiraje</Th>
                    <Th>Existencia</Th>
                    <Th>Fecha publicación</Th>
                </tr>
            </Thead>
            <Tbody>
                { data.map((gaceta,i)  => (
                    <Tr 
                        key={i} 
                        onClick={ () => seeModal(gaceta) }
                    >
                        <Td># { gaceta.numero }</Td>
                        <Td> - </Td>
                        <Td>{ gaceta.paginas }</Td>
                        <Td>{ gaceta.ejemplares }</Td>
                        <Td>{ gaceta.inventario }</Td>
                        <Td>{ gaceta.fecha_ejemplar }</Td>
                    </Tr>
                ))}
            </Tbody>
        </Wrapper>
    ) : (
        (error) ? (
            <Error>
                <Img src={iconError}/>
                <span>{ error }</span>
            </Error>
        ) : ( null )
    )
)

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            numero: PropTypes.number.isRequired,
            fecha_ejemplar: PropTypes.string.isRequired,
            paginas: PropTypes.number.isRequired,
            ejemplares: PropTypes.number.isRequired,
            inventario: PropTypes.number.isRequired
        }).isRequired
    ),
    seeModal: PropTypes.func,
    error: PropTypes.string
}

export default Table;