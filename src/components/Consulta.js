import React, { Component } from 'react';

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
      fecha_recepcion2: ''
    };
    this.handleInput = this.handleInput.bind(this)
    this.buscar = this.buscar.bind(this)
  }

  buscar(e) {
    console.log(this.state);
  }

  handleInput(e) {
    if (e.target.type === 'date') {
      let val = e.target.value;
    }

    this.setState({
      [e.target.name]: e.target.value 
    });
  }

  render() {
    return(
      <div className="main">
        <div className="contenedor">
          <h1 className="contenedor-titulo">Datos de consulta</h1>
          <div className="form">
            <div className="contenedor">
              <label className="label" htmlFor="Número de gaceta">Número de gaceta</label>
              <input type="text" name="gaceta" id="Número de gaceta" placeholder="Número de gaceta" onChange={this.handleInput}/>
            </div>
            <div className="contenedor">
              <label className="label">Fecha del ejemplar</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_ejemplar1" onChange={this.handleInput}/>
                <input type="date" name="fecha_ejemplar2" onChange={this.handleInput}/>
              </div>
            </div>
            <div className="contenedor">
              <label className="label">Fecha de recepción</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_recepcion1" onChange={this.handleInput}/>
                <input type="date" name="fecha_recepcion2" onChange={this.handleInput}/>
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
          <Gaceta />
        </div>
      </div>
    );
  }
}

export default Consulta