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
            dateEjemplar: '',
            dateRecepcion: '',
            gacetas: [],
            opcSelect: '',
            errores: {
                gaceta: '',
                dateEjemplar: '',
                dateRecepcion: ''
            },
            validacionForm: true,
            errorMessage: false
        };

        this.handleInput = this.handleInput.bind(this)
        this.handleClickBuscar = this.handleClickBuscar.bind(this)
        this.handleClickLimpiar = this.handleClickLimpiar.bind(this)

        window.document.title = 'Hemeroteca | Consulta'
    }

    createQuery(data) {
        let aux = {};

        switch (data) {
            case 'gaceta':
                aux.query = 'numero'
                aux.value = parseInt(this.state.gaceta)
                break;
            
            case 'dateEjemplar':
                aux.query = 'fecha_ejemplar'
                aux.value = this.state.dateEjemplar
                break;

            case 'dateRecepcion':
                aux.query = 'fecha_recepcion'
                aux.value = this.state.dateRecepcion
                break;

            default:
                break;
        }

        return aux;
    }

    // Función que escucha los cambios en los inputs y los asigna al state correcto.
    handleInput (e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, () => { this.validarInput(name, value) });
    }

    // Función que se activa al momento de hacer clic en el boton "Consultar". Seleccióna el campo con mayor prioridad y realiza un búsqueda.
    handleClickBuscar () {
        let docs = [];
        let temp = {}
        let attr = this.createQuery(this.state.opcSelect);

        firebase.firestore()
            .collection('gacetas')
            .where(attr.query, '==' , attr.value)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    temp = doc.data()
                    temp.key = doc.id
                    docs.push(temp);
                })

                if (docs.length) {
                    this.setState ({ 
                        gacetas : docs, 
                        errorMessage: false
                    })
                } else {
                    this.setState ({ 
                        errorMessage: true, 
                        gacetas: [] 
                    })
                }
            })
            .catch(err => {
                console.error('Error: ', err)
            });
    }
    
    // Función que se activa al presionar el botón "Limpiar"
    handleClickLimpiar () {
        this.setState({
            gaceta: '',
            dateEjemplar: '',
            dateRecepcion: '',
            gacetas: [],
            errores: {
                gaceta: '',
                dateEjemplar: '',
                dateRecepcion: ''
            },
            validacionForm : true,
            errorMessage: false
        })
    }

    // Función que valida el contenido de cada input y asigna en el "State" si existe o no error en los campos.
    validarInput (name, val) {
        const { errores } = this.state;

        switch(name) {
            case 'gaceta':
                errores.gaceta = (val.match(/^\d+$/)) ? false : true;
                break;
            
            case 'dateEjemplar':
                errores.dateEjemplar = (val.length) ? false : true;
                break;

            case 'dateRecepcion':
                errores.dateRecepcion = (val.length) ? false : true;
                break;

            default:
                break;
        }

        this.setState({ errores: errores, opcSelect: name });
        this.activarBtn();
    }

    // Función que activa el botón "Consultar" en caso de que el formulario este llenado correctamente.
    activarBtn () {
        let a = 0;
        for (let i in this.state.errores) {
            if (this.state.errores[i] === false) a++;
        }

        (a >= 1) ? this.setState({ validacionForm : false }) : this.setState({ validacionForm : true })
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
                                disabled={(this.state.dateEjemplar || this.state.dateRecepcion) ? true : false }/>
                            { this.state.errores.gaceta && this.state.validacionForm == true ? <div className="error">El campo no debe contener letras o espacios.</div> : null }
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha del ejemplar</label>
                            <input 
                                type="date" 
                                name="dateEjemplar" 
                                onChange={this.handleInput} 
                                value={this.state.dateEjemplar} className="input"
                                disabled={(this.state.gaceta || this.state.dateRecepcion) ? true : false } />
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha de recepción</label>
                            <input 
                                type="date" 
                                name="dateRecepcion" 
                                onChange={this.handleInput} 
                                value={this.state.dateRecepcion} 
                                className="input"
                                disabled={(this.state.dateEjemplar || this.state.gaceta) ? true : false }/>
                        </div>
                    </div>
                    <div className="contenedor-btns">
                        <button className="btn" onClick={this.handleClickLimpiar}>Limpiar</button>
                        <button className="btn" onClick={this.handleClickBuscar} disabled={this.state.validacionForm}>Consultar</button>
                    </div>
                </div>
                
                { (this.state.gacetas.length) ? <Gaceta valor={this.state.gacetas} modificar={false}/> : null}
                { (this.state.errorMessage) ? <div>No se encontraron coincidencias. Pruebe con otros datos. </div> : null}
            </div>
        );
    }
}

export default Consulta