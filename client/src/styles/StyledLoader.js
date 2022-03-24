import styled, { keyframes } from 'styled-components/macro'

const dotFlashing = keyframes`
    0% {
        background-color: #761F14;
    }
    50%,
    100% {
        background-color: #ebe6ff;
    }
`

const StyledLoader = styled.div`
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #535353;
    color: #535353;
    animation: ${dotFlashing} 0.4s infinite linear alternate;
    animation-delay: 0.25s;

    &::before, &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }

    &::before {
        left: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #535353;
        color: #535353;
        animation: ${dotFlashing} 0.4s infinite alternate;
        animation-delay: 0s;
    }

    &::after {
        left: 15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #535353;
        color: #535353;
        animation: ${dotFlashing} 0.4s infinite alternate;
        animation-delay: .5s;
    }
`

export default StyledLoader