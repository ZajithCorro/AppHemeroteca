import styled from 'styled-components'

export const Wrapper = styled.table`
    background-color: #fff;
    border-collapse: collapse;
    border-radius: 5px;
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
    background-color: rgba(223, 224, 224, .4);

    &:hover {
        background-color: rgba(223, 224, 224);
        cursor: pointer;
    }
`

export const Td = styled.td`
    padding: .7em 1em;
`

export const Error = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 15px;
    width: 25%;
    text-align: center;

    & > span {
        font-size: 1.4em;
    }
`

export const Img = styled.img`
    width: 150px;
    margin-bottom: 20px;
`
