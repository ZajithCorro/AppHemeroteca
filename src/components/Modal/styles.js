import styled from 'styled-components'

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
    background-color: #ffffff;
    background-attachment: fixed;
    border-radius: 5px;
    width: 50%;
    height: 50%;
    border: 1px solid transparent;
    box-shadow: 0 3px 5px rgba(1,1,1,1);

    &:hover {
        cursor: auto;
    }
`