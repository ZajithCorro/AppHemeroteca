import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

// Components
import Gaceta from './Card/GacetaCard'

class Consulta extends Component {
  constructor(){
    super();
    this.state = {
      gaceta: '',
      fecha_ejemplar1: '',
      fecha_ejemplar2: '',
      fecha_recepcion1: '',
      fecha_recepcion2: '',
      files: []
    };
    this.handleInput = this.handleInput.bind(this)
    this.buscar = this.buscar.bind(this)
  }

  buscar(e) {
    let docs = [];

    firebase.firestore()
      .collection('gacetas')
      .where('numero_gaceta', '==' , parseInt(this.state.gaceta))
      .limit(2)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          docs.push(doc.data())
        })
        this.setState({files : docs})
      })
      .catch(err => {
        console.error('Error: ', err)
      });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return(
      <div className="main">
        <div className="contenedor">
          <h1 className="contenedor-titulo">Datos de consulta</h1>
          <div className="form">
            <div className="contenedor">
              <label className="label">Número de gaceta</label>
              <input type="text" name="gaceta" onChange={this.handleInput} className="input"/>
            </div>
            <div className="contenedor">
              <label className="label">Fecha del ejemplar</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_ejemplar1" onChange={this.handleInput} className="input"/>
                <input type="date" name="fecha_ejemplar2" onChange={this.handleInput} className="input"/>
              </div>
            </div>
            <div className="contenedor">
              <label className="label">Fecha de recepción</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_recepcion1" onChange={this.handleInput} className="input"/>
                <input type="date" name="fecha_recepcion2" onChange={this.handleInput} className="input"/>
              </div>
            </div>
            <div className="contenedor-btns">
              <button className="btn">Limpiar</button>
              <button className="btn" onClick={this.buscar}>Consultar</button>
            </div>
          </div>
        </div>
        <div className="contenedor">
          <h1 className="contenedor-titulo">Resultados de búsqueda</h1>
          { (this.state.files.length === 0) ? '' : <Gaceta  valor={this.state.files}/>}
        </div>
      </div>
    );
  }
}

export default Consulta