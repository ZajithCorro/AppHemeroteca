import styled from 'styled-components'

export const Wrapper = styled.table`
    background-color: #fff;
    border-collapse: collapse;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    text-align: left;
    width: 90%;
`

export const Thead = styled.thead`
    background-color: rgb(85, 86, 90);
    color: #FFF;
`

export const Th = styled.th`
    font-size: 1em;
    padding: .5em 1em;
`

export const Tbody = styled.tbody`
    width: 100%;
    font-size: 0.9em;
`

export const Tr = styled.tr`
    background-color: #DFE0E0;

    &:hover {
        background-color: #FFF;
        cursor: pointer;
    }
`

export const Td = styled.td`
    padding: .7em 1em;
`
