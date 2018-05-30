import styled , { keyframes } from 'styled-components';
import { Transform } from 'stream';

export const Hamburguer = styled.div`
    height: auto;

    &:hover {
        cursor: pointer;
    }

    span {
        border-radius: 2px;
        background: rgb(85, 86, 90);
        display: block;
        height: 4px;
        transition: .5s;
        width: 40px;
    }

    span:nth-child(1) {
        margin-bottom: 5px;
        ${({ active }) => active && `
            transform: scaleX(0);
        `}
    }

    span:nth-child(2) {
        margin-bottom: 5px;
        ${({ active }) => active && `
            transform: rotate(45deg);
        `}
    }

     span:nth-child(3) {
        ${({ active }) => active && `
            transform: translateY(-9px) rotate(-45deg);
        `}
    }
`