// Dependencies
import React, { Component } from 'react';
import firebase from '../firebase.js';

// Components
import AlertRegistro from './AlertRegistro'

class Alta extends Component {
    constructor(){
        super();

        this.state = ({
            folio: '',
            numeroGaceta: '',
            tomoGaceta: '',
            tipoGaceta: '',
            paginas: '',
            dateEjemplar: '',
            dateRecepcion: '',
            ejemplares: '',
            nombreEntrega: '',
            inventario: '',
            opcEntrega: [],
            inputErrores: {
                numero: '',
                tomo: '',
                paginas: '',
                tipo: '',
                fecha: '',
                recepcion: '',
                ejemplares: '',
                entrega: '',
                inventario: '',
                personaEntrega: ''
            },
            ultimoRegistro: [],
            validacionTotal : true,
            showAlert: false
        });

        this.handleInput = this.handleInput.bind(this);
        this.limpiarInputs = this.limpiarInputs.bind(this);
        this.nuevoRegistro = this.nuevoRegistro.bind(this);
        window.document.title = 'Hemeroteca | Alta'
    }

    // Función que se activa al momento que el componente es renderizado.
    componentWillMount () {
        firebase.firestore()
            .collection('gacetas')
            .orderBy('id', 'desc')
            .limit(1)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    (doc.length !== 0) ? this.setState({ folioGaceta: doc.data().id + 1 }) : this.setState({ folioGaceta: 1 });
                })
            })
            .catch(err => {
                console.log('Error :' , err )
            });
    }

    // Función que activa el botón "Guardar Registro" en caso de que el formulario este llenado correctamente.
    activarBoton () {
        let a = 0;
        for (let i in this.state.inputErrores) {
            if (this.state.inputErrores[i] === false) a++;
        }
        (a === 10) ? this.setState({ validacionTotal : false }) : this.setState({ validacionTotal : true }) 
    }

    // Función que escucha los cambios en los inputs y los asigna al state correcto.
    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'opcEntrega') {
            if (event.target.checked === true) {
                this.setState({ [name]: [...this.state.opcEntrega, value] }, () => {this.validarInput(name, value)})
            } else {
                let arrayAux = this.state.opcEntrega;
                arrayAux.splice(arrayAux.indexOf(value), 1)
                this.setState({ [name]: arrayAux }, () => { this.validarInput(name, value) });
            }
        } else {
            this.setState({ [name]: value }, () => { this.validarInput(name, value) });
        }
    }

    // Función que valida el contenido de cada input y asigna en el "State" si existe o no error en los campos.
    validarInput (name, value) {
        const { inputErrores }  = this.state;

        switch (name) {
            case 'numeroGaceta':
                inputErrores.numero = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'tomoGaceta':
                inputErrores.tomo = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'paginas':
                inputErrores.paginas = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'dateEjemplar':
                inputErrores.fecha = (value) ? false : true;
                break;

            case 'tipoGaceta':
                inputErrores.tipo = (value) ? false : true;
                break;

            case 'dateRecepcion':
                inputErrores.recepcion = (value) ? false : true;
                break;

            case 'ejemplares':
                inputErrores.ejemplares = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'nombreEntrega':
                inputErrores.entrega = (value.match(/^[A-Z][a-zA-Z\s]*$/)) ? false : true;
                break;

            case 'inventario':
                inputErrores.inventario = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'opcEntrega':
                inputErrores.personaEntrega = (this.state.opcEntrega.length > 0) ? false : true;
                break;

            default:
                break;
        }

        this.setState({ inputErrores : inputErrores })
        this.activarBoton();
    }

    // Función que recibe el "State" de cada input y asigna una clase error a los input que tengan un contenido incorrecto o estén vacios.
    claseError (state) {
        if (state === true) {
            return 'inputInvalido'
        } else if (state === false) {
            return 'inputValido'
        }
    }

    // Función que se activa al hacer clic en el botón "Limpiar". Limpia el contenido del los input por medio del "State".
    limpiarInputs (event) {
        this.setState({
            folio: '',
            numeroGaceta: '',
            tomoGaceta: '',
            tipoGaceta: '',
            paginas: '',
            dateEjemplar: '',
            dateRecepcion: '',
            ejemplares: '',
            nombreEntrega: '',
            inventario: '',
            opcEntrega: [],
            inputErrores: {
                numero: '',
                tomo: '',
                paginas: '',
                tipo: '',
                fecha: '',
                recepcion: '',
                ejemplares: '',
                entrega: '',
                inventario: '',
                personaEntrega: ''
            },
            ultimoRegistro: [],
            validacionTotal : true,
            showAlert: false
        });

        window.document.getElementById('Extraordinaria').checked = false;
        window.document.getElementById('Ordinaria').checked = false;
        window.document.getElementById('Alcance').checked = false;
    }

    // Función que se activa al momento de hacer clic en el boton "Guardar Registro". Crea un nuevo registro en la BD.
    nuevoRegistro (event) {
        let data = {
            folio : this.state.folioGaceta,
            numero : parseInt(this.state.numeroGaceta),
            tomo : parseInt(this.state.tomoGaceta),
            tipo : this.state.tipoGaceta,
            paginas : parseInt(this.state.paginas),
            fecha_ejemplar : this.state.dateEjemplar,
            fecha_recepcion: this.state.dateRecepcion,
            ejemplares: this.state.ejemplares,
            nombre_entrega: this.state.nombreEntrega,
            inventario : parseInt(this.state.inventario),
            entregado: this.state.opcEntrega
        }

        firebase.firestore()
            .collection('gacetas')
            .add(data)
            .then(docRef => {
                this.setState({ 
                    folio: this.state.folio + 1,
                    ultimoRegistro: data,
                    showAlert: true
                })
                this.limpiarInputs(event)
            })
            .catch(err => {
                console.log('Error: ', err)
            });

        setTimeout(() => {
            this.setState({ showAlert: false });
        }, 10000);
    }

    render() {
        return(
            <div className="main">
                <div>
                    <div className="contenedor">
                        <h1 className="contenedor-titulo">Datos de gaceta</h1>
                        <div className="form">
                            <div className="contenedor">
                                <label className="label">Número de gaceta</label>
                                <input type="text" name="numeroGaceta" value={this.state.numeroGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.numero)} input`}/>
                                { this.state.inputErrores.numero ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de tomo</label>
                                <input type="text" name="tomoGaceta" value={this.state.tomoGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.tomo)} input`}/>
                                { this.state.inputErrores.tomo ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Tipo</label>
                                <div className="contenedor-radio">
                                <div>
                                    <input id="Ordinaria" type="radio" name="tipoGaceta" value="Ordinaria" onChange={this.handleInput}/>
                                    <label htmlFor="Ordinaria">Ordinaria</label>
                                </div>
                                <div>
                                    <input id="Extraordinaria" type="radio" name="tipoGaceta" value="Extraordinaria" onChange={this.handleInput}/>
                                    <label htmlFor="Extraordinaria">Extraordinaria</label>
                                </div>
                                <div>
                                    <input id="Alcance" type="radio" name="tipoGaceta" value="Alcance" onChange={this.handleInput}/>
                                    <label htmlFor="Alcance">Alcance</label>
                                </div>
                                </div>
                            </div>
                            <div className="contenedor">
                                <label className="label">Páginas</label>
                                <input type="text" name="paginas" value={this.state.paginas} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.paginas)} input`}/>
                                { this.state.inputErrores.paginas ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Fecha del ejemplar</label>
                                <input type="date" name="dateEjemplar" value={this.state.dateEjemplar} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.fecha)} input`}/>
                                { this.state.inputErrores.fecha ? <div className="error">El campo debe de estar lleno.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Archivo digital</label>
                                <input type="text" className="input"/>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor">
                        <h1 className="contenedor-titulo">Recepción</h1>
                        <div className="form">
                            <div className="contenedor">
                                <label className="label">Fecha de recepción</label>
                                <input type="date" name="dateRecepcion" value={this.state.dateRecepcion} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.recepcion)} input`}/>
                                { this.state.inputErrores.recepcion ? <div className="error">El campo debe de estar lleno.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de ejemplares</label>
                                <input type="text" name="ejemplares" value={this.state.ejemplares} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.ejemplares)} input`}/>
                                { this.state.inputErrores.ejemplares ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Persona quién entrega</label>
                                <input type="text" name="nombreEntrega" value={this.state.nombreEntrega} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.entrega)} input`}/>
                                { this.state.inputErrores.entrega ? <div className="error">El campo debe de estar lleno, debe comenzar con una mayuscula y no debe contener números.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Ejemplares en hemeroteca</label>
                                <input type="text" name="inventario" value={this.state.inventario} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.inventario)} input`}/>
                                { this.state.inputErrores.inventario ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor entrega">
                                <label className="label">Entregado a</label>
                                <div className="contenedor-radio">
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Director" onChange={this.handleInput}/>
                                    <label>Director</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Hemeroteca" onChange={this.handleInput}/>
                                    <label>Hemeroteca</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Ruta" onChange={this.handleInput}/>
                                    <label >Ruta</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Modulo" onChange={this.handleInput}/>
                                    <label >Módulo</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Suscripciones" onChange={this.handleInput}/>
                                    <label >Suscripciones</label>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-btns">
                        <button className="btn" onClick={this.limpiarInputs}>Limpiar campos</button>
                        <button className="btn" onClick={this.nuevoRegistro} id="btnRegistro" disabled={this.state.validacionTotal}>Guardar registro</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alta