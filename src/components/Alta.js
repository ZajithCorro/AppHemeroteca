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
      numeroErrores: 5,
      validacionTotal : false
    });

    this.handleInput = this.handleInput.bind(this);
    this.limpiarInputs = this.limpiarInputs.bind(this);
    this.nuevoRegistro = this.nuevoRegistro.bind(this);
  }
  
  componentDidMount() {
    firebase.firestore()
      .collection('gacetas')
      .orderBy('id', 'desc')
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ folioGaceta: doc.data().id + 1 })
        })
      })
      .catch(err => {
        console.log('Error :' , err )
      });
  }

  componentWillUpdate() {
    let a = 0;
    for (let i in this.state.formError) {
     if (this.state.formError[i] === false) {
       a++;
     }
    }
    (this.state.numeroErrores === 0) ? window.document.getElementById('btnRegistro').disabled = false : window.document.getElementById('btnRegistro').disabled = true;
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value }, () => { this.validarInput(name, value) });
  }

  validarInput(name, value) {
    let errorForms = this.state.formError;
    let state;

    switch (name) {
      case 'numeroGaceta':
        state = (value.match(/^\d+$/)) ? false : true;
        errorForms.numero = state;
        break;

      case 'tomoGaceta':
        state = (value.match(/^\d+$/)) ? false : true;
        errorForms.tomo = state;
        break;

      case 'paginas':
        state = (value.match(/^\d+$/)) ? false : true;
        errorForms.paginas = state;
        break;

      case 'fechaEjemplar':
        state = (value) ? false : true;
        errorForms.fecha = state;
        break;

      case 'tipoGaceta':
        state = (value) ? false : true;
        errorForms.tipo = state;
        break;

      default:
        break;
    }

    this.setState({ formError : errorForms })
  }

  claseError(state) {
    if (state === true) {
      return 'inputInvalido'
    } else if (state === false) {
        return 'inputValido'
    }
  }

  limpiarInputs(event) {
    event.preventDefault();

    // this.setState({
    //   numeroGaceta: '',
    //   tomoGaceta: '',
    //   paginas: '',
    //   tipoGaceta: '',
    //   fechaEjemplar: ''
    // });

    // window.document.getElementById('Extraordinaria').checked = false;
    // window.document.getElementById('Ordinaria').checked = false;
    // window.document.getElementById('Alcance').checked = false;
  }

  nuevoRegistro(event) {
    event.preventDefault();

    let data = {
      id : this.state.folioGaceta,
      fecha : new Date(this.state.fechaEjemplar),
      numero_gaceta : parseInt(this.state.numeroGaceta),
      paginas : parseInt(this.state.paginas),
      tipo : this.state.tipoGaceta,
      tiraje : parseInt(this.state.tomoGaceta),
      existencia : parseInt(this.state.numeroGaceta) * 10
    }

    // firebase.firestore()
    //   .collection('gacetas')
    //   .add(data)
    //   .then(docRef => {
    //     console.log(docRef.id)
    //   })
    //   .catch(err => {
    //     console.log('Error: ', err)
    //   });

    // this.limpiarInputs(event)
    console.log(data);
  }

  render() {
    return(
      <div className="main">
        <form action="" id="form" onSubmit={this.limpiarInputs}>
          <div className="contenedor">
            <h1 className="contenedor-titulo">Datos de gaceta</h1>
            <div className="form">
              <div className="contenedor">
                <label className="label">Número de gaceta</label>
                <input type="text" name="numeroGaceta" value={this.state.numeroGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.formError.numero)} input`}/>
                { this.state.formError.numero ? <div className="error">El campo debe de estar lleno y no debe contener letras.</div> : '' }
              </div>
              <div className="contenedor">
                <label className="label">Folio</label>
                <input type="text" name="folioGaceta" min="0" disabled value={this.state.folioGaceta} onChange={this.handleInput} className="input"/>
              </div>
              <div className="contenedor">
                <label className="label">Número de tomo</label>
                <input type="text" name="tomoGaceta" value={this.state.tomoGaceta} onChange={this.handleInput} className={`${this.claseError(this.state.formError.tomo)} input`}/>
                { this.state.formError.tomo ? <div className="error">El campo debe de estar lleno y no debe contener letras.</div> : '' }
              </div>
              <div className="contenedor">
                <label className="label">Páginas</label>
                <input type="text" name="paginas" value={this.state.paginas} onChange={this.handleInput} className={`${this.claseError(this.state.formError.paginas)} input`}/>
                { this.state.formError.paginas ? <div className="error">El campo debe de estar lleno y no debe contener letras.</div> : '' }
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
                <label className="label">Fecha de ejemplar</label>
                <input type="date" name="fechaEjemplar" value={this.state.fechaEjemplar} onChange={this.handleInput} className={`${this.claseError(this.state.formError.fecha)} input`}/>
              </div>
              <div className="contenedor-btns entrega">
                <button className="btn">Limpiar</button>
                <button className="btn" onClick={this.nuevoRegistro} disabled id="btnRegistro">Registro</button>
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
        </form>
      </div>
    );
  }
}

export default Alta