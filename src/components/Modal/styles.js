import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    background-color: rgba(0,0,0,.8);
    position:fixed;
    width:100%;
    height:100%;
    z-index: 1001;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: not-allowed;
    }
`

export const Content = styled.div`
    display: grid;
    grid-template-rows: 15% 70% 15%;

    background-color: #ffffff;
    background-attachment: fixed;
    border-radius: 5px;
    width: 90%;
    height: 90%;
    max-height: 500px;
    max-width: 500px;
    box-shadow: 0 3px 5px rgba(1,1,1,1);

    &:hover {
        cursor: auto;
    }
`

export const Title = styled.div`
    align-self: center;
    color: black;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
`

export const Form = styled.div`
    padding: 0 20px;
    overflow: scroll;
`

export const FormHead = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;
    padding: 0 20px;
    width: 100%;
`

export const Label = styled.label`
    margin: 0 10px;
    font-size: 1.2em;
`

export const Button = styled.button`
    background-color: #FFF;
    border-radius: .25rem;
    font-size: 1.2rem;
    line-height: 1.5;
    padding: .5rem 2.5rem;
    text-align: center;
    cursor: pointer;

    ${({ cancel }) => cancel && css`
        border: 1px solid rgba(255, 0, 0, 0.7);
        color: rgba(255, 0, 0, 0.7);

        &:hover {
            background-color: rgba(255, 0, 0, 0.7);
            color: #FFF;
        }
    `}

    ${({ primary }) => primary && css`
        border: 1px solid rgb(85,86,90);
        color: rgb(85, 86, 90);

        &:hover {
            background-color: rgb(85,86,90);
            color: #FFF;
        }
    `}
`

export const Circle = styled.button`
    background-color: #FFF;
    border-radius: 12px;
    border: 1px solid rgb(85,86,90);
    color: rgb(85, 86, 90);
    height: 25px;
    width: 25px;

        &:hover {
            background-color: rgb(85,86,90);
            color: #FFF;
        }

`

