// Dependencies
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
      files: [],
      errores: {
        gaceta: '',
        fechaEjem: '',
        fechaEjem2: '',
        fechaRec: '',
        fechaRec2: ''
      },
      validacionForm : true,
    };
    this.handleInput = this.handleInput.bind(this)
    this.buscar = this.buscar.bind(this)
    window.document.title = 'Hemeroteca | Consulta'
  }

  buscar() {
    let docs = [];

    firebase.firestore()
      .collection('gacetas')
      .where('fecha', '==' , parseInt(this.state.fecha_ejemplar1))
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

  validarInput(name, val) {
    let error = this.state.errores;

    switch(name) {
      case 'gaceta':
        error.gaceta = (val.match(/^\d+$/)) ? false : true;
        break;
      
      case 'fecha_ejemplar1':
        error.fechaEjem = (val.length) ? false : true;
        break;

      case 'fecha_ejemplar2':
        error.fechaEjem2 = (val.length) ? false : true;
        break;

      case 'fecha_recepcion1':
        error.fechaRec = (val.length) ? false : true;
        break;

      case 'fecha_recepcion2':
        error.fechaRec2 = (val.length) ? false : true;
        break;

      default:
        break;
    }

    this.setState({ errores: error });
    this.activarBtn(name);
  }

  claseError(state) {
    if (state === true) {
      return 'inputInvalido'
    } else if (state === false) {
        return 'inputValido'
    }
  }

  activarBtn(name) {
    let a = 0;
    for (let i in this.state.errores) {
     if (this.state.errores[i] === false) a++;
    }

    (a >= 1) ? this.setState({ validacionForm : false }) : this.setState({ validacionForm : true })
  }

  handleInput(e) {
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
              <input type="text" name="gaceta" onChange={this.handleInput} className={`${this.claseError(this.state.errores.gaceta)} input`}/>
              { this.state.errores.gaceta ? <div className="error">El campo debe de estar lleno y no debe contener letras o espacios.</div> : '' }
            </div>
            <div className="contenedor">
              <label className="label">Fecha del ejemplar</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_ejemplar1" onChange={this.handleInput} className="input" className={`${this.claseError(this.state.errores.fechaEjem)} input`}/>
                <input type="date" name="fecha_ejemplar2" onChange={this.handleInput} className="input" className={`${this.claseError(this.state.errores.fechaEjem2)} input`}/>
              </div>
              { (this.state.errores.fechaEjem2 && this.state.errores.fechaEjem) ? <div className="error">Alguno de los dos campos debde de estar lleno.</div> : '' }
            </div>
            <div className="contenedor">
              <label className="label">Fecha de recepción</label>
              <div className="contenedor-2-input">
                <input type="date" name="fecha_recepcion1" onChange={this.handleInput} className="input" className={`${this.claseError(this.state.errores.fechaRec)} input`}/>
                <input type="date" name="fecha_recepcion2" onChange={this.handleInput} className="input" className={`${this.claseError(this.state.errores.fechaRec2)} input`}/>
              </div>
              { (this.state.errores.fechaRec2 && this.state.errores.fechaRec) ? <div className="error">Alguno de los dos campos debde de estar lleno.</div> : '' }
            </div>
          </div>
          <div className="contenedor-btns">
            <button className="btn">Limpiar</button>
            <button className="btn" onClick={this.buscar} disabled={this.state.validacionForm}>Consultar</button>
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