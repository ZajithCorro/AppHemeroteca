import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore'

// Assets
import libro from '../img/libro.svg'
import './Card.css'

class Gaceta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gacetas: []
    }
  }

  render() {
    const gacetas = this.props.valor.map((gaceta,i) => {
      return (
        <div className="card" key={i}>
          <div className="card-img">
            <img src={libro}/>
          </div>
          <div className="card-info">
            <div className="contenedor">
              <label className="label">Gaceta</label>
              <p>{gaceta.numero_gaceta}</p>
            </div>
            <div className="contenedor">
              <label className="label">Tipo</label>
              <p>{gaceta.tipo}</p>
            </div>
            <div className="contenedor">
              <label className="label">Fecha</label>
              <p>
                {
                  gaceta.fecha.getDate() + ' / ' + (gaceta.fecha.getMonth() + 1) +  ' / ' +  gaceta.fecha.getFullYear()
                }
              </p>
            </div>
            <div className="contenedor">
              <label className="label">Páginas</label>
              <p>{gaceta.paginas}</p>
            </div>
            <div className="contenedor">
              <label className="label">Tiraje</label>
              <p>{gaceta.tiraje}</p>
            </div>
            <div className="contenedor">
              <label className="label">Existencia</label>
              <p>{gaceta.existencia}</p>
            </div>
          </div>
          <div className="card-opc">
            <button className="btn">Dígital</button>
            <button className="btn">Modificar</button>
          </div>
        </div>
      )
    });

    return(
      <div className="contenedor-resultados">
        { gacetas }
      </div>
    );
  }
}

export default Gaceta