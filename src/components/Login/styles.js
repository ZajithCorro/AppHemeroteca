import styled from 'styled-components'

export const Fondo = styled.div`
    background-color: rgba(211, 209, 209, 0.165);
    display: flex;
    height: 100vh;
    width: 100vw;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    background: #fff;
    border: 1px solid #DFE0E0;
    border-radius: 5px;
    box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.1);
    margin: auto;
    padding: 20px;
    width: auto;
`

export const CardHead = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`

export const Img = styled.img`
    width: 100px;
    margin: 0 auto;
`

export const CardInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`

export const CardBtn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

export const MessageError = styled.div`
    font-size: .7em;
    color: red;
    margin-bottom: 10px;
    text-align: center;
`

