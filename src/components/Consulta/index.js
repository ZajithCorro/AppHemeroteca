import React, { Component } from 'react';
import firebase from '../../firebase.js';

import Table from '../Table'
import Modal from '../Modal'
import { Button } from '../Modal/styles'

class Consulta extends Component {
    constructor(props){
        super(props);
        this.state = {
            gaceta: '',
            dateEjemplar: '',
            dateRecepcion: '',
            opcSelect: '',
            errores: {
                gaceta: '',
                dateEjemplar: '',
                dateRecepcion: ''
            },
            validacionForm: true,
            modal: false,
            gacetas: []
        };

        this.handleInput = this.handleInput.bind(this)
        this.handleClickBuscar = this.handleClickBuscar.bind(this)
    }

    
    createQuery(data) {
        let aux = {};
        
        switch (data) {
            case 'gaceta':
                aux.query = 'numero'
                aux.value = parseInt(this.state.gaceta)
                break;
            
            case 'dateEjemplar':
                aux.query = 'fecha_ejemplar'
                aux.value = this.state.dateEjemplar
                break;
            
            case 'dateRecepcion':
                aux.query = 'fecha_recepcion'
                aux.value = this.state.dateRecepcion
                break;

            default:
                break;
        }

        return aux;
    }

    mensajeError(opc, data) {
        let message

        switch (opc) {
            case 'gaceta':
                message = `No se encontrarón resultados para la gaceta: ${data}`
                break;
            
            case 'dateEjemplar':
                message = `No se encontrarón resultados para fecha de ejemplar: ${data}`
                break;
            
            case 'dateRecepcion':
                message = `No se encontrarón resultados para fecha de recepción: ${data}`
                break;

            default:
                break;
        }

        return message;
    }

    handleInput (e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, () => { this.validarInput(name, value) });
    }

    handleClickBuscar () {
        let docs = [];
        let temp = {}
        let error;
        let attr = this.createQuery(this.state.opcSelect);

        firebase.firestore()
            .collection('gacetas')
            .where(attr.query, '==' , attr.value)
            .get()
            .then(snapshot => {
                if (snapshot.docChanges.length == 0) error = this.mensajeError(this.state.opcSelect, attr.value);

                snapshot.forEach(doc => {
                    temp = doc.data()
                    temp.key = doc.id
                    docs.push(temp);
                })
                this.setState({ gacetas: docs, error: error })
            })
            .catch(err => {
                console.error('Error: ', err)
            });
    }
    
    validarInput (name, val) {
        const { errores } = this.state;

        switch(name) {
            case 'gaceta':
                errores.gaceta = (val.match(/^\d+$/)) ? false : true;
                break;
            
            case 'dateEjemplar':
                errores.dateEjemplar = (val.length) ? false : true;
                break;

            case 'dateRecepcion':
                errores.dateRecepcion = (val.length) ? false : true;
                break;

            default:
                break;
        }

        this.setState({ errores: errores, opcSelect: name });
        this.activarBtn();
    }

    activarBtn () {
        let a = 0;
        for (let i in this.state.errores) {
            if (this.state.errores[i] === false) a++;
        }

        (a >= 1) ? this.setState({ validacionForm : false }) : this.setState({ validacionForm : true })
    }

    newModal(data) {
        this.setState({ 
            modal: !this.state.modal,
            editGaceta: data 
        });
    }


    render() {
        return(
            <div className="main">
                <div className="contenedor">
                    <h1 className="contenedor-titulo">Datos de consulta</h1>
                    <div className="form">
                        <div className="contenedor">
                            <label className="label">Número de gaceta</label>
                            <input 
                                type="text" 
                                name="gaceta" 
                                value={this.state.gaceta} 
                                onChange={this.handleInput} className="input"
                                disabled={(this.state.dateEjemplar || this.state.dateRecepcion) ? true : false }/>
                            { this.state.errores.gaceta && this.state.validacionForm == true ? <div className="error">El campo no debe contener letras o espacios.</div> : null }
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha del ejemplar</label>
                            <input 
                                type="date" 
                                name="dateEjemplar" 
                                onChange={this.handleInput} 
                                value={this.state.dateEjemplar} className="input"
                                disabled={(this.state.gaceta || this.state.dateRecepcion) ? true : false } />
                        </div>
                        <div className="contenedor">
                            <label className="label">Fecha de recepción</label>
                            <input 
                                type="date" 
                                name="dateRecepcion" 
                                onChange={this.handleInput} 
                                value={this.state.dateRecepcion} 
                                className="input"
                                disabled={ (this.state.dateEjemplar || this.state.gaceta) ? true : false }/>
                        </div>
                    </div>
                    <div className="contenedor-btns">
                        <Button primary onClick={this.handleClickBuscar} disabled={this.state.validacionForm}>Buscar</Button>
                    </div>
                </div>

                <Table 
                    data={ this.state.gacetas } 
                    seeModal={ this.newModal.bind(this) }
                    error={ this.state.error }
                />

                { (this.state.modal) ? 
                    <Modal 
                        hideModal={ this.newModal.bind(this) } 
                        data={ this.state.editGaceta }
                    /> : 
                    null }
            </div>
        );
    }
}

export default Consulta