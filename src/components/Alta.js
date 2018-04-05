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
      fechaEjemplar: ''
    })
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

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  limpiarInputs(event) {
    event.preventDefault();
    this.setState({
      numeroGaceta: '',
      tomoGaceta: '',
      paginas: '',
      tipoGaceta: '',
      fechaEjemplar: ''
    });

    window.document.getElementById('Extraordinaria').checked = false;
    window.document.getElementById('Ordinaria').checked = false;
    window.document.getElementById('Alcance').checked = false;
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

    console.log(data)

    firebase.firestore()
      .collection('gacetas')
      .add(data)
      .then(docRef => {
        console.log(docRef.id)
      })
      .catch(err => {
        console.log('Error: ', err)
      });

    this.limpiarInputs(event)
  }

  render() {
    return(
      <div className="main">
        <form action="" id="form">
          <div className="contenedor">
            <h1 className="contenedor-titulo">Datos de gaceta</h1>
            <div className="form">
              <div className="contenedor">
                <label htmlFor="Número de gaceta" className="label">Número de gaceta</label>
                <input type="number" name="numeroGaceta" id="Número de gaceta" placeholder="Número de gaceta" value={this.state.numeroGaceta} min="0" onChange={this.handleInput}/>
              </div>
              <div className="contenedor">
                <label className="label">Folio</label>
                <input type="number" name="folioGaceta" min="0" disabled value={this.state.folioGaceta} onChange={this.handleInput}/>
              </div>
              <div className="contenedor">
                <label className="label" htmlFor="Número de tomo de gaceta">Número de tomo</label>
                <input type="text" name="tomoGaceta" id="Número de tomo de gaceta" placeholder="Número de tomo de gaceta" value={this.state.tomoGaceta} onChange={this.handleInput}/>
              </div>
              <div className="contenedor">
                <label className="label" htmlFor="Número páginas">Páginas</label>
                <input type="number" name="paginas" id="Número páginas" placeholder="Número páginas" value={this.state.paginas} onChange={this.handleInput}/>
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
                <label className="label" htmlFor="Fecha de gaceta">Fecha de ejemplar</label>
                <input type="date" name="fechaEjemplar" id="Fecha de gaceta" placeholder="Fecha de gaceta" value={this.state.fechaEjemplar} onChange={this.handleInput}/>
              </div>
              <div className="contenedor-btns entrega">
                <button className="btn" onClick={this.limpiarInputs}>Limpiar</button>
                <button className="btn" onClick={this.nuevoRegistro}>Registro</button>
              </div>
            </div>
          </div>
          <div className="contenedor">
            <h1 className="contenedor-titulo">Recepción</h1>
            <div className="form">
              <div className="contenedor">
                <label className="label" htmlFor="Fecha de recepción">Fecha de recepción</label>
                <input type="date" name="fechaRecepcion" id="Fecha de recepción" placeholder="Fecha de recepción"/>
              </div>
              <div className="contenedor">
                <label className="label" htmlFor="Número de ejemplares de gaceta">Número de ejemplares</label>
                <input type="number" name="ejemplares" id="Número de ejemplares de gaceta" placeholder="Número de ejemplares de gaceta"/>
              </div>
              <div className="contenedor">
                <label className="label" htmlFor="Nombre persona que entrega">Persona quién entrega</label>
                <input type="text" name="nombrePersona" id="Nombre persona que entrega" placeholder="Nombre persona que entrega"/>
              </div>
              <div className="contenedor">
                <label className="label" htmlFor="Número">Ejemplares en hemeroteca</label>
                <input type="number" name="ejemplaresExistencia" id="Número" placeholder="Número"/>
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