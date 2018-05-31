import React, { Component } from 'react';
import firebase from '../../firebase.js';

import AlertRegistro from '../Alert'

class Alta extends Component {
    constructor(){
        super();

        this.state = ({
            folio: '',
            numeroGaceta: '',
            tomoGaceta: '',
            tipoGaceta: {
                'Ordinaria': false,
                'Extraordinaria': false,
                'Alcance': false
            },
            paginas: '',
            dateEjemplar: '',
            dateRecepcion: '',
            ejemplares: '',
            nombreEntrega: '',
            inventario: '',
            opcEntrega: {
                'Director': false,
                'Hemeroteca': false,
                'Ruta': false,
                'Modulo': false,
                'Suscripciones': false
            },
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
                personaEntrega: '',
                file: ''
            },
            ultimoRegistro: [],
            validacionTotal : true,
            showAlert: false,
            upload: 0
        });

        this.handleInput = this.handleInput.bind(this);
        this.limpiarInputs = this.limpiarInputs.bind(this);
        this.nuevoRegistro = this.nuevoRegistro.bind(this);
    }

    componentWillMount () {
        firebase.firestore()
            .collection('gacetas')
            .orderBy('folio', 'desc')
            .limit(1)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    (doc.exists) ? this.setState({ folio : doc.data().folio + 1}) : this.setState({ folio: 1});
                })
            })
            .catch(err => {
                console.log('Error :' , err )
            });
    }

    activarBoton () {
        let a = 0;
        for (let i in this.state.inputErrores) {
            if (this.state.inputErrores[i] === false) a++;
        }
        (a === 11) ? this.setState({ validacionTotal : false }) : this.setState({ validacionTotal : true }) 
    }

    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;
        
        this.setState({ [name]: value }, () => { this.validarInput(name, value) });
    }

    handleCheckbox(event) {
        let name = event.target.name;
        let value = event.target.value;
        let { opcEntrega } = this.state;

        opcEntrega[value] = !opcEntrega[value];
        this.setState({ opcEntrega: opcEntrega} , () => { this.validarInput(name, value) })
    }

    handleRadio(event) {
        let name = event.target.name;
        let value = event.target.value;
        let { tipoGaceta } = this.state;

        for (let i in tipoGaceta) {
            if (i === value) {
                tipoGaceta[i] = !tipoGaceta[i]
            } else {
                tipoGaceta[i] = false
            }
        }

        this.setState({tipoGaceta: tipoGaceta} , () => { this.validarInput(name, value) })
    }
    
    handleInputFile(event) { 
        let file = event.target.files[0]
        let { inputErrores } = this.state

        inputErrores.file = (file) ? false : true

        this.setState({ file: file, inputErrores: inputErrores})


    }

    validarInput (name, value) {
        const { inputErrores }  = this.state
        const { opcEntrega } = this.state
        const { tipoGaceta } = this.state
        let count = 0;

        switch (name) {
            case 'numeroGaceta':
                inputErrores.numero = (value.match(/^[1-9]+\d*$/)) ? false : true;
                break;

            case 'tomoGaceta':
                inputErrores.tomo = (value.match(/^[1-9]+\d*$/)) ? false : true;
                if (!value) inputErrores.tomo = false;
                break;

            case 'paginas':
                inputErrores.paginas = (value.match(/^[1-9]+\d*$/)) ? false : true;
                break;

            case 'dateEjemplar':
                inputErrores.fecha = (value) ? false : true

                let dateNow = new Date()
                let dateVal = new Date(value)

                console.log(dateNow > dateVal)

                if (!value && this.state.dateRecepcion) {
                    inputErrores.recepcion = true
                }

                if (value && this.state.dateRecepcion) {
                    let dateEjem = new Date(value)
                    let dateRecep = new Date(this.state.dateRecepcion)

                    inputErrores.recepcion = (dateRecep >= dateEjem) ? false : true
                }
                break;

            case 'tipoGaceta':
                inputErrores.tipo = (value) ? false : true;

                if (value === 'Extraordinaria') this.setState({ status: false })

                if (value === 'Alcance' || value === 'Ordinaria') {
                    this.setState({ 
                        status: true,
                        tomoGaceta: ''
                    })
                }
                inputErrores.tomo = false
                break;

            case 'dateRecepcion':
                let dateEjem = new Date(this.state.dateEjemplar);
                let dateRecep = new Date(value)

                inputErrores.recepcion = (dateRecep >= dateEjem) ? false : true
                break;

            case 'ejemplares':
                inputErrores.ejemplares = (value.match(/^[1-9]+\d*$/)) ? false : true;
                break;

            case 'nombreEntrega':
                inputErrores.entrega = (value.match(/^[A-Z][a-z]*(\s[A-Z])*[a-z]+$/)) ? false : true;
                break;

            case 'inventario':
                inputErrores.inventario = (value.match(/^[1-9]+\d*$/)) ? false : true;
                break;

            case 'opcEntrega':
                for (let i in opcEntrega) {
                    if (opcEntrega[i] === true) count++
                }
                inputErrores.personaEntrega = (count != 0) ? false : true;
                break;

            default:
                break;
        }

        this.setState({inputErrores : inputErrores})
        this.activarBoton();
    }

    claseError (state) {
        if (state === true) {
            return 'inputInvalido'
        } else if (state === false) {
            return 'inputValido'
        }
    }

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
        window.document.getElementById('Director').checked = false;
        window.document.getElementById('Hemeroteca').checked = false;
        window.document.getElementById('Ruta').checked = false;
        window.document.getElementById('Modulo').checked = false;
        window.document.getElementById('Suscripciones').checked = false;
    }

    nuevoRegistro (event) {
        let newGaceta = {
            folio : this.state.folio,
            numero : parseInt(this.state.numeroGaceta),
            tomo : parseInt(this.state.tomoGaceta) || null,
            tipo : this.state.tipoGaceta,
            paginas : parseInt(this.state.paginas),
            fecha_ejemplar : this.state.dateEjemplar,
            fecha_recepcion: this.state.dateRecepcion,
            ejemplares: parseInt(this.state.ejemplares),
            nombre_entrega: this.state.nombreEntrega,
            inventario : parseInt(this.state.inventario),
            entregado: this.state.opcEntrega
        }

        const task = firebase.storage().ref(`archivosDigitales/${this.state.file.name}`).put(this.state.file)
        task.on('state_changed', (snapshot) =>{

            }, (error) =>{
                console.error(error.message)
            }, () =>{
                newGaceta.urlFile = task.snapshot.downloadURL
                firebase.firestore()
                    .collection('gacetas')
                    .add(newGaceta)
                    .then(docRef => {
                        this.setState({ 
                            folio: this.state.folio + 1,
                            ultimoRegistro: data,
                            showAlert: true
                        })
                    })
                    .catch(err => {
                        console.log('Error: ', err)
                    });
            })

        // setTimeout(() => {
        //     this.setState({ showAlert: false });
        // }, 10000);
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
                                <label className="label">Fecha del ejemplar</label>
                                <input type="date" name="dateEjemplar" value={this.state.dateEjemplar} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.fecha)} input`}/>
                                { this.state.inputErrores.fecha ? <div className="error">El campo debe de estar lleno y no puede ser posterior a la fecha de recepción.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Páginas</label>
                                <input type="text" name="paginas" value={this.state.paginas} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.paginas)} input`}/>
                                { this.state.inputErrores.paginas ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
                            </div>
                            <div className="contenedor">
                                <label className="label">Archivo digital</label>
                                <input type="file" className="input" accept="application/pdf" onChange={this.handleInputFile.bind(this)}/>
                            </div>
                            <div className="contenedor">
                                <label className="label">Tipo</label>
                                <div className="contenedor-radio">
                                    <div>
                                        <input id="Ordinaria" type="radio" name="tipoGaceta" value="Ordinaria" onChange={this.handleRadio.bind(this)}/>
                                        <label htmlFor="Ordinaria">Ordinaria</label>
                                    </div>
                                    <div>
                                        <input id="Extraordinaria" type="radio" name="tipoGaceta" value="Extraordinaria" onChange={this.handleRadio.bind(this)}/>
                                        <label htmlFor="Extraordinaria">Extraordinaria</label>
                                    </div>
                                    <div>
                                        <input id="Alcance" type="radio" name="tipoGaceta" value="Alcance" onChange={this.handleRadio.bind(this)}/>
                                        <label htmlFor="Alcance">Alcance</label>
                                    </div>
                                </div>
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de tomo</label>
                                <input type="text" name="tomoGaceta" value={this.state.tomoGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.tomo)} input`} disabled={this.state.status}/>
                                { this.state.inputErrores.tomo ? <div className="error">El campo debe de estar lleno y no debe contener letras, espacios o empezar con cero.</div> : '' }
                            </div>
                        </div>
                    </div>
                    <div className="contenedor">
                        <h1 className="contenedor-titulo">Recepción</h1>
                        <div className="form">
                            <div className="contenedor">
                                <label className="label">Fecha de recepción</label>
                                <input type="date" name="dateRecepcion" value={this.state.dateRecepcion} onChange={this.handleInput} className={`${this.claseError(this.state.inputErrores.recepcion)} input`}/>
                                { this.state.inputErrores.recepcion ? <div className="error">El campo debe de estar lleno y no puede ser anterior a la fecha de publicación.</div> : '' }
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
                                    <input type="checkbox" name="opcEntrega" value="Director" onChange={this.handleCheckbox.bind(this)} id="Director"/>
                                    <label>Director</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Hemeroteca" onChange={this.handleCheckbox.bind(this)} id="Hemeroteca"/>
                                    <label>Hemeroteca</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Ruta" onChange={this.handleCheckbox.bind(this)} id="Ruta"/>
                                    <label >Ruta</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Modulo" onChange={this.handleCheckbox.bind(this)} id="Modulo"/>
                                    <label >Módulo</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="opcEntrega" value="Suscripciones" onChange={this.handleCheckbox.bind(this)} id="Suscripciones"/>
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