// Dependencies
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../firebase.js';
import styled from 'styled-components'

// Assets
import libro from './img/libro.svg'

// Estilos del componente
const Resultados = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;

    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`

const Card = styled.div`
    background-color: #FFF;
    border-radius: .25rem;
    border: 2px solid #DFE0E0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column; 
`

const Image = styled.div`
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    width: 90%;
    margin: 0 auto;

    img {
        width: 50px;
    }

    @media screen and (max-width: 500px) {
        img {
            width: 70px;
        }
    }
`

const CardInfo = styled.div`
    padding: 10px 0;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid #000;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;

    label {
        font-weight: 700;
    }

    p {
        font-style: italic;
    }
`

const CardOpc = styled.div`
    padding-top: 5px;
    text-align: center;
    width: 90%;
    margin: 10px auto;

    a {
        padding: 2px 5px;
    }
`

// Programación del complemento
class Gaceta extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const gacetas = this.props.valor.map((gaceta,i) => {
            return (
                <Card key={i}>
                    <Image>
                        <img src={libro}/>
                    </Image>
                    <CardInfo>
                        <div className="contenedor">
                            <label className="label">Gaceta</label>
                            <p>{gaceta.numero_gaceta}</p>
                        </div>
                        <div className="contenedor">
                            <label className="label">Tipo</label>
                            <p>{gaceta.tipo}</p>
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha</label>
                            <p>
                                { gaceta.fecha }
                            </p>
                        </div>
                        <div className="contenedor">
                            <label className="label">Páginas</label>
                            <p>{gaceta.paginas}</p>
                        </div>
                        <div className="contenedor">
                            <label className="label">Tiraje</label>
                            <p>{gaceta.tiraje}</p>
                        </div>
                        <div className="contenedor">
                            <label className="label">Existencia</label>
                            <p>{gaceta.existencia}</p>
                        </div>
                    </CardInfo>
                    <CardOpc>
                        <NavLink 
                            to={{
                                pathname : `/modificacion/${gaceta.id}`,
                                state : {
                                    gaceta: gaceta
                                }
                            }} 
                        className="btn">
                            Modificar
                        </NavLink>
                    </CardOpc>
                </Card>
            )
        });

        return(
            <div className="contenedor">
                <h1 className="contenedor-titulo">Resultados de búsqueda</h1>
                <Resultados>  
                    { gacetas }
                </Resultados>
             </div>
        );
    }
}

export default Gaceta