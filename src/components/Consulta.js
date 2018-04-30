// Dependencies
import React, { Component } from 'react';
import firebase from '../firebase.js';

// Components
import Gaceta from './GacetaCard'

class Consulta extends Component {
    constructor(){
        super();
        this.state = {
            gaceta: '',
            fecha_ejemplar: '',
            fecha_recepcion: '',
            gacetas: [],
            errores: {
                gaceta: '',
                fechaEjem: '',
                fechaRec: ''
            },
            validacionForm: true,
        };

        this.handleInput = this.handleInput.bind(this)
        this.buscar = this.buscar.bind(this)
        this.limpiar = this.limpiar.bind(this)

        window.document.title = 'Hemeroteca | Consulta'
    }

    // Función que se activa al momento de hacer clic en el boton "Consultar". Seleccióna el campo con mayor prioridad y realiza un búsqueda.
    buscar () {
        let docs = [];
        let temp = {}

        firebase.firestore()
            .collection('gacetas')
            .where('fecha', '==' , this.state.fecha_ejemplar1)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    temp = doc.data()
                    temp.key = doc.id
                    docs.push(temp);
                })
                this.setState({gacetas : docs})
            })
            .catch(err => {
                console.error('Error: ', err)
            });
    }

    // Función que valida el contenido de cada input y asigna en el "State" si existe o no error en los campos.
    validarInput (name, val) {
        const { errores } = this.state;

        switch(name) {
            case 'gaceta':
                errores.gaceta = (val.match(/^\d+$/)) ? false : true;
                break;
            
            case 'fecha_ejemplar':
                errores.fechaEjem = (val.length) ? false : true;
                break;

            case 'fecha_recepcion':
                errores.fechaRec = (val.length) ? false : true;
                break;

            default:
                break;
        }

        this.setState({ errores: errores });
        this.activarBtn();
    }

    // Función que se activa al presionar el botón "Limpiar"
    limpiar () {
        this.setState({
            gaceta: '',
            fecha_ejemplar: '',
            fecha_recepcion: '',
            gacetas: [],
            errores: {
                gaceta: '',
                fechaEjem: '',
                fechaRec: ''
            },
            validacionForm : true,
        })
    }
    
    // Función que recibe el "State" de cada input y asigna una clase error a los input que tengan un contenido incorrecto o estén vacios.
    claseError (state) {
        if (state === true) {
            return 'inputInvalido'
        } else if (state === false) {
            return 'inputValido'
        }
    }

    // Función que activa el botón "Consultar" en caso de que el formulario este llenado correctamente.
    activarBtn () {
        let a = 0;
        for (let i in this.state.errores) {
            if (this.state.errores[i] === false) a++;
        }

        (a >= 1) ? this.setState({ validacionForm : false }) : this.setState({ validacionForm : true })
    }

    // Función que escucha los cambios en los inputs y los asigna al state correcto.
    handleInput (e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, () => { this.validarInput(name, value) });
    }

    render() {
        return(
            <div className="main">
                <div className="contenedor">
                    <h1 className="contenedor-titulo">Datos de consulta</h1>
                    <div className="form">
                        <div className="contenedor">
                            <label className="label">Número de gaceta</label>
                            <input 
                                type="text" 
                                name="gaceta" 
                                value={this.state.gaceta} 
                                onChange={this.handleInput} className="input"
                                disabled={(this.state.fecha_ejemplar || this.state.fecha_recepcion) ? true : false }/>
                            { this.state.errores.gaceta ? <div className="error">El campo no debe contener letras o espacios.</div> : '' }
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha del ejemplar</label>
                            <input 
                                type="date" 
                                name="fecha_ejemplar" 
                                onChange={this.handleInput} 
                                value={this.state.fecha_ejemplar1} className="input"
                                disabled={(this.state.gaceta || this.state.fecha_recepcion) ? true : false } />
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha de recepción</label>
                            <input 
                                type="date" 
                                name="fecha_recepcion" 
                                onChange={this.handleInput} 
                                value={this.state.fecha_recepcion1} 
                                className="input"
                                disabled={(this.state.fecha_ejemplar || this.state.gaceta) ? true : false }/>
                        </div>
                    </div>
                    <div className="contenedor-btns">
                        <button className="btn" onClick={this.limpiar}>Limpiar</button>
                        <button className="btn" onClick={this.buscar} disabled={this.state.validacionForm}>Consultar</button>
                    </div>
                </div>
                
                { (this.state.gacetas.length) ? <Gaceta valor={this.state.gacetas}/> : ''}
            </div>
        );
    }
}

export default Consulta