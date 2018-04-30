// Dependencies
import React, { Component } from 'react';
import firebase from '../firebase.js';

// Components
import AlertRegistro from './AlertRegistro'

class Alta extends Component {
    constructor(){
        super();

        this.state = ({
            numeroGaceta: '',
            folioGaceta: '',
            tomoGaceta: '',
            paginas: '',
            tipoGaceta: '',
            fechaEjemplar: '',
            fechaRecep: '',
            numEjemplar: '',
            personaEntrega: '',
            ejemHemeroteca: '',
            entrega: [],
            formError: {
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
            validacionTotal : true,
            ultimoRegistro: [],
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
        for (let i in this.state.formError) {
            if (this.state.formError[i] === false) a++;
        }
        (a === 10) ? this.setState({ validacionTotal : false }) : this.setState({ validacionTotal : true }) 
    }

    // Función que escucha los cambios en los inputs y los asigna al state correcto.
    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'entrega') {
            if (event.target.checked === true) {
                this.setState({ [name]: [...this.state.entrega, value] }, () => {this.validarInput(name, value)})
            } else {
                let arrayAux = this.state.entrega;
                arrayAux.splice(arrayAux.indexOf(value), 1)
                this.setState({ [name]: arrayAux }, () => { this.validarInput(name, value) });
            }
        } else {
            this.setState({ [name]: value }, () => { this.validarInput(name, value) });
        }
    }

    // Función que valida el contenido de cada input y asigna en el "State" si existe o no error en los campos.
    validarInput (name, value) {
        const { formError }  = this.state;

        switch (name) {
            case 'numeroGaceta':
                formError.numero = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'tomoGaceta':
                formError.tomo = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'paginas':
                formError.paginas = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'fechaEjemplar':
                formError.fecha = (value) ? false : true;
                break;

            case 'tipoGaceta':
                formError.tipo = (value) ? false : true;
                break;

            case 'fechaRecep':
                formError.recepcion = (value) ? false : true;
                break;

            case 'numEjemplar':
                formError.ejemplares = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'personaEntrega':
                formError.entrega = (value.match(/^[A-Z][a-zA-Z\s]*$/)) ? false : true;
                break;

            case 'ejemHemeroteca':
                formError.inventario = (value.match(/^\d+$/)) ? false : true;
                break;

            case 'entrega':
                formError.personaEntrega = (this.state.entrega.length > 0) ? false : true;
                break;

            default:
                break;
        }

        this.setState({ formError : formError })
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
        event.preventDefault()

        this.setState({
            numeroGaceta: '',
            paginas: '',
            tomoGaceta: '',
            tipoGaceta: '',
            fechaEjemplar: '',
            formError: {
                numero: '',
                tomo: '',
                paginas: '',
                tipo: '',
                fecha: ''
            },
            validacionTotal : true
        });

        window.document.getElementById('Extraordinaria').checked = false;
        window.document.getElementById('Ordinaria').checked = false;
        window.document.getElementById('Alcance').checked = false;
    }

    // Función que se activa al momento de hacer clic en el boton "Guardar Registro". Crea un nuevo registro en la BD.
    nuevoRegistro (event) {
        event.preventDefault();
        console.log(this.state)

        // let data = {
        //     id : this.state.folioGaceta,
        //     fecha : this.state.fechaEjemplar,
        //     numero_gaceta : parseInt(this.state.numeroGaceta),
        //     paginas : parseInt(this.state.paginas),
        //     tipo : this.state.tipoGaceta,
        //     tiraje : parseInt(this.state.tomoGaceta),
        //     existencia : parseInt(this.state.numeroGaceta) * 10
        // }

        // firebase.firestore()
        //     .collection('gacetas')
        //     .add(data)
        //     .then(docRef => {
        //         this.setState({ 
        //             folioGaceta: this.state.folioGaceta + 1,
        //             ultimoRegistro: data,
        //             showAlert: true
        //         })
        //         this.limpiarInputs(event)
        //     })
        //     .catch(err => {
        //         console.log('Error: ', err)
        //     });

        // setTimeout(() => {
        //     this.setState({ showAlert: false });
        // }, 10000);
    }

    render() {
        return(
            <div className="main">
                <form action="" id="form" autoComplete="off">
                    <div className="contenedor">
                        <h1 className="contenedor-titulo">Datos de gaceta</h1>
                        <div className="form">
                            <div className="contenedor">
                                <label className="label">Número de gaceta</label>
                                <input type="text" name="numeroGaceta" value={this.state.numeroGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.formError.numero)} input`}/>
                                { this.state.formError.numero ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de tomo</label>
                                <input type="text" name="tomoGaceta" value={this.state.tomoGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.formError.tomo)} input`}/>
                                { this.state.formError.tomo ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
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
                                <input type="text" name="paginas" value={this.state.paginas} onChange={this.handleInput} className={`${this.claseError(this.state.formError.paginas)} input`}/>
                                { this.state.formError.paginas ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Fecha de ejemplar</label>
                                <input type="date" name="fechaEjemplar" value={this.state.fechaEjemplar} onChange={this.handleInput} className={`${this.claseError(this.state.formError.fecha)} input`}/>
                                { this.state.formError.fecha ? <div className="error">El campo debe de estar lleno.</div> : '' }
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
                                <input type="date" name="fechaRecep" value={this.state.fechaRecep} onChange={this.handleInput} className={`${this.claseError(this.state.formError.recepcion)} input`}/>
                                { this.state.formError.recepcion ? <div className="error">El campo debe de estar lleno.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de ejemplares</label>
                                <input type="text" name="numEjemplar" value={this.state.numEjemplar} onChange={this.handleInput} className={`${this.claseError(this.state.formError.ejemplares)} input`}/>
                                { this.state.formError.ejemplares ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Persona quién entrega</label>
                                <input type="text" name="personaEntrega" value={this.state.personaEntrega} onChange={this.handleInput} className={`${this.claseError(this.state.formError.entrega)} input`}/>
                                { this.state.formError.entrega ? <div className="error">El campo debe de estar lleno, debe comenzar con una mayuscula y no debe contener números.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Ejemplares en hemeroteca</label>
                                <input type="text" name="ejemHemeroteca" value={this.state.ejemHemeroteca} onChange={this.handleInput} className={`${this.claseError(this.state.formError.inventario)} input`}/>
                                { this.state.formError.inventario ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor entrega">
                                <label className="label">Entregado a</label>
                                <div className="contenedor-radio">
                                <div>
                                    <input type="checkbox" name="entrega" value="Director" onChange={this.handleInput}/>
                                    <label>Director</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="entrega" value="Hemeroteca" onChange={this.handleInput}/>
                                    <label>Hemeroteca</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="entrega" value="Ruta" onChange={this.handleInput}/>
                                    <label >Ruta</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="entrega" value="Modulo" onChange={this.handleInput}/>
                                    <label >Módulo</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="entrega" value="Suscripciones" onChange={this.handleInput}/>
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
                </form>
            </div>
        );
    }
}

export default Alta