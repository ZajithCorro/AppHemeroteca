import React, { Component } from 'react'
import PropTypes from 'prop-types'

import firebase from '../../firebase.js'
import { Wrapper, Thead, Tbody, Th, Td, Tr } from './styles'

const Table = ({ data, seeModal }) => (
    <div>
        { (data) ? (
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
                        { data.map(( gaceta,i)  => (
                            <Tr 
                                key={i} 
                                onClick={ () => seeModal(gaceta) }
                            >
                                <Td># { gaceta.numero }</Td>
                                <Td>Value</Td>
                                <Td>{ gaceta.fecha_ejemplar }</Td>
                                <Td>{ gaceta.paginas }</Td>
                                <Td>{ gaceta.ejemplares }</Td>
                                <Td>{ gaceta.inventario }</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Wrapper>
        ) : (
            <p>Sin datos para mostrar</p>
        )}
    </div>
)

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            numero: PropTypes.number.isRequired,
            fecha_ejemplar: PropTypes.string.isRequired,
            paginas: PropTypes.number.isRequired,
            ejemplares: PropTypes.number.isRequired,
            inventario: PropTypes.number.isRequired
        })
    ),
    seeModal: PropTypes.func
}

export default Table;