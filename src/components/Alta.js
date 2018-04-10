// Dependencies
import React, { Component } from 'react';
import firebase from 'firebase'
import 'firebase/firestore'

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
            formError: {
                numero: '',
                tomo: '',
                paginas: '',
                tipo: '',
                fecha: ''
            },
            validacionTotal : true,
            ultimoRegistro: []
        });

        this.handleInput = this.handleInput.bind(this);
        this.limpiarInputs = this.limpiarInputs.bind(this);
        this.nuevoRegistro = this.nuevoRegistro.bind(this);
        this.mensajeRegistro = this.mensajeRegistro.bind(this)
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
    activarBoton () {
        let a = 0;
        for (let i in this.state.formError) {
            if (this.state.formError[i] === false) a++;
        }
        (a === 5) ? this.setState({ validacionTotal : false }) : this.setState({ validacionTotal : true }) 
    }

    // Función que escucha los cambios en los inputs y los asigna al state correcto.
    handleInput (event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value }, () => { this.validarInput(name, value) });
    }

    // Función que valida el contenido de cada input y asigna en el "State" si existe o no error en los campos.
    validarInput (name, value) {
        let errorForms = this.state.formError;

        switch (name) {
        case 'numeroGaceta':
            errorForms.numero = (value.match(/^\d+$/)) ? false : true;
            break;

        case 'tomoGaceta':
            errorForms.tomo = (value.match(/^\d+$/)) ? false : true;
            break;

        case 'paginas':
            errorForms.paginas = (value.match(/^\d+$/)) ? false : true;
            break;

        case 'fechaEjemplar':
            errorForms.fecha = (value) ? false : true;
            break;

        case 'tipoGaceta':
            errorForms.tipo = (value) ? false : true;
            break;

        default:
            break;
        }

        this.setState({ formError : errorForms })
        this.activarBoton();
    }

    // Función que recibe el "State" de cada input y asigna una clase error a los input que tengan un contenido incorrecto o estén vacios.
    claseError (state) {
        if (state === true) {
            return 'inputInvalido'
        } else if (state === false) {
            return 'inputValido'
        }
    }

    // Función que se activa al hacer clic en el botón "Limpiar". Limpia el contenido del los input por medio del "State".
    limpiarInputs (event) {
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

    // Función que convierte la fecha ingresada en el formulario en un formato correcto para la BD.
    fecha(date) {
        let aux = new Date(date);
        let fecha = new Date()

        fecha.setDate(aux.getDate() + 1)
        fecha.setMonth(aux.getMonth())
        fecha.setFullYear(aux.getFullYear())

        return fecha;
    }

    // Función que se activa al momento de hacer clic en el boton "Guardar Registro". Crea un nuevo registro en la BD.
    nuevoRegistro (event) {
        event.preventDefault();

        let data = {
            id : this.state.folioGaceta,
            fecha : this.fecha(this.state.fechaEjemplar),
            numero_gaceta : parseInt(this.state.numeroGaceta),
            paginas : parseInt(this.state.paginas),
            tipo : this.state.tipoGaceta,
            tiraje : parseInt(this.state.tomoGaceta),
            existencia : parseInt(this.state.numeroGaceta) * 10
        }

        firebase.firestore()
            .collection('gacetas')
            .add(data)
            .then(docRef => {
                this.setState({ 
                    folioGaceta: this.state.folioGaceta + 1,
                    ultimoRegistro: data
                })
                this.limpiarInputs(event)
            })
            .catch(err => {
                console.log('Error: ', err)
            });
    }

    mensajeRegistro () {
        if (this.state.ultimoRegistro.length !== 0) {
            console.log('Aqui')
            return(
                window.setTimeout(() => { <p>Hola</p> }, 3000)
            );
        }
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
                                <input type="date" name="fechaRecepcion" className="input"/>
                            </div>
                            <div className="contenedor">
                                <label className="label">Número de ejemplares</label>
                                <input type="text" name="ejemplares" className="input"/>
                            </div>
                            <div className="contenedor">
                                <label className="label" htmlFor="Nombre persona que entrega">Persona quién entrega</label>
                                <input type="text" name="nombrePersona" className="input"/>
                            </div>
                            <div className="contenedor">
                                <label className="label" htmlFor="Número">Ejemplares en hemeroteca</label>
                                <input type="text" name="ejemplaresExistencia" className="input"/>
                            </div>
                            <div className="contenedor entrega">
                                <label className="label">Entregado a</label>
                                <div className="contenedor-radio">
                                <div>
                                    <input id="Director" type="radio" name="entrega" value="Director"/>
                                    <label htmlFor="Director">Director</label>
                                </div>
                                <div>
                                    <input id="Hemeroteca" type="radio" name="entrega" value="Hemeroteca"/>
                                    <label htmlFor="Hemeroteca">Hemeroteca</label>
                                </div>
                                <div>
                                    <input id="Ruta" type="radio" name="entrega" value="Ruta"/>
                                    <label htmlFor="Ruta">Ruta</label>
                                </div>
                                <div>
                                    <input id="Modulo" type="radio" name="entrega" value="Modulo"/>
                                    <label htmlFor="Modulo">Módulo</label>
                                </div>
                                <div>
                                    <input id="Suscripciones" type="radio" name="entrega" value="Suscripciones"/>
                                    <label htmlFor="Suscripciones">Suscripciones</label>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-btns">
                        <button className="btn">Limpiar campos</button>
                        <button className="btn" onClick={this.nuevoRegistro} id="btnRegistro" disabled={this.state.validacionTotal}>Guardar registro</button>
                    </div>
                    {this.mensajeRegistro()}
                </form>
            </div>
        );
  }
}

export default Alta