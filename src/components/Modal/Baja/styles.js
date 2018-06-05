import styled, { css } from 'styled-components'

export const Wrapper = styled.div`

`

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

export const Label = styled.label`
    font-size: .8em;
    font-weight: bold;
`

export const Input = styled.input`
    color: #55565A;
    border-radius: .25rem;
    border: 1px solid #CED4DA;
    margin-top: 5px;
    line-height: 1.5;
    padding: .375rem .75rem;
`

export const Select = Input.extend``