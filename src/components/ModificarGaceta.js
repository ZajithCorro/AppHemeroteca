import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';
import firebase from '../firebase'

class Modificar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gaceta: '',
            tipoGaceta: '',
            entregaGaceta: [],
            inventario: '',
            redirect: false
        }
        window.document.title = 'Hemeroteca | Modificar Gaceta'
        this.handleClickGuardar = this.handleClickGuardar.bind(this)
    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            this.setState({ 
                gaceta: this.props.location.state.gaceta,
            })
        }
    }

    componentDidMount() {
        let { tipo } = this.state.gaceta;
        let { entregado } = this.state.gaceta;
        let aux = []

        for (let i in tipo) {
            if (tipo[i] === true) this.setState({ tipoGaceta : i })
        }

        for (let i in entregado) {
            if (entregado[i] === true) aux.push(i)
        }

        this.setState({ entregaGaceta: aux })
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let  { gaceta } = this.state;

        gaceta.inventario = value
        this.setState({ gaceta: gaceta })
    }

    handleClickGuardar() {
        let data = {
            folio : this.state.gaceta.folio,
            numero : parseInt(this.state.gaceta.numero),
            tomo : parseInt(this.state.gaceta.tomo) || null,
            tipo : this.state.gaceta.tipo,
            paginas : parseInt(this.state.gaceta.paginas),
            fecha_ejemplar : this.state.gaceta.fecha_ejemplar,
            fecha_recepcion: this.state.gaceta.fecha_recepcion,
            ejemplares: this.state.gaceta.ejemplares,
            nombre_entrega: this.state.gaceta.nombre_entrega,
            inventario : parseInt(this.state.gaceta.inventario),
            entregado: this.state.gaceta.entregado
        }

        firebase.firestore()
            .collection('gacetas')
            .doc(this.state.gaceta.key)
            .set(data)
            .then(respose => {
                this.setState({redirect: true})
            })
            .catch(err => {
                console.log('Error')
            });
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/modificacion'/>
        }

        return(
            <div className="main">
                { 
                    (this.props.location.state === undefined) ? 'Error al acceder a este apartado.' :
                        <div>
                            <div className="contenedor">
                                <h1 className="contenedor-titulo">Datos de gaceta</h1>
                                <div className="form">
                                    <div className="contenedor">
                                        <label className="label">Número de gaceta</label>
                                        <input type="text" name="numeroGaceta" className="input" value={this.state.gaceta.numero} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Número de tomo</label>
                                        <input type="text" name="tomoGaceta" className="input" value={this.state.gaceta.tomo || ''} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Tipo</label>
                                        <div className="contenedor-radio">
                                            <div>
                                                <input id="Ordinaria" type="radio" name="tipoGaceta" value="Ordinaria" checked={(this.state.tipoGaceta === 'Ordinaria') ? true : false } disabled/>
                                                <label htmlFor="Ordinaria">Ordinaria</label>
                                            </div>
                                            <div>
                                                <input id="Extraordinaria" type="radio" name="tipoGaceta" value="Extraordinaria" checked={(this.state.tipoGaceta === 'Extraordinaria') ? true : false} disabled/>
                                                <label htmlFor="Extraordinaria">Extraordinaria</label>
                                            </div>
                                            <div>
                                                <input id="Alcance" type="radio" name="tipoGaceta" value="Alcance" checked={(this.state.tipoGaceta === 'Alcance') ? true : false} disabled/>
                                                <label htmlFor="Alcance">Alcance</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Páginas</label>
                                        <input type="text" name="paginas" className="input" value={this.state.gaceta.paginas} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Fecha del ejemplar</label>
                                        <input type="date" name="dateEjemplar" className="input" value={this.state.gaceta.fecha_ejemplar} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Archivo digital</label>
                                        <input type="text" className="input" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="contenedor">
                                <h1 className="contenedor-titulo">Recepción</h1>
                                <div className="form">
                                    <div className="contenedor">
                                        <label className="label">Fecha de recepción</label>
                                        <input type="date" name="dateRecepcion" className="input" value={this.state.gaceta.fecha_recepcion} onChange={this.handleChange.bind(this)} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Número de ejemplares</label>
                                        <input type="text" name="ejemplares" className="input" value={this.state.gaceta.ejemplares} onChange={this.handleChange.bind(this)} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Persona quién entrega</label>
                                        <input type="text" name="nombreEntrega" className="input" value={this.state.gaceta.nombre_entrega} onChange={this.handleChange.bind(this)} disabled/>
                                    </div>
                                    <div className="contenedor">
                                        <label className="label">Ejemplares en hemeroteca</label>
                                        <input type="text" name="inventario" className="input" value={this.state.gaceta.inventario} onChange={this.handleChange.bind(this)}/>
                                    </div>
                                    <div className="contenedor entrega">
                                        <label className="label">Entregado a</label>
                                        <div className="contenedor-radio">
                                            <div>
                                                <input type="checkbox" name="opcEntrega" value="Director" checked={(this.state.entregaGaceta.indexOf('Director') != -1) ? true : false}disabled/>
                                                <label>Director</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="opcEntrega" value="Hemeroteca" checked={(this.state.entregaGaceta.indexOf('Hemeroteca') != -1) ? true : false}disabled/>
                                                <label>Hemeroteca</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="opcEntrega" value="Ruta" checked={(this.state.entregaGaceta.indexOf('Ruta') != -1) ? true : false}disabled/>
                                                <label >Ruta</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="opcEntrega" value="Modulo" checked={(this.state.entregaGaceta.indexOf('Modulo') != -1) ? true : false}disabled/>
                                                <label >Módulo</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="opcEntrega" value="Suscripciones" checked={(this.state.entregaGaceta.indexOf('Suscripciones') != -1) ? true : false}disabled/>
                                                <label >Suscripciones</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contenedor-btns">
                                <NavLink
                                    to = '/modificacion'
                                    className="btn"> Cancelar </NavLink>
                                <button className="btn" onClick={this.handleClickGuardar}>Guardar registro</button>
                            </div>
                        </div>
                }
                </div>
        );
    }
}

export default Modificar