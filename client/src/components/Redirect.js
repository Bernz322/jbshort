import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import styled, { keyframes } from 'styled-components/macro';

const bounce = keyframes`
    0% {
    top: 80px;
    height: 50px;
    border-radius: 80px 80px 70px 70px;
    transform: scaleX(1.2);
  }
  35% {
    height: 65px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
`

const StyledRedirect = styled.div`
    height: calc(100vh - 135px);
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 999;

    .main-loader{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    

    .text {
        color: ${(props) => props.theme.maroon};
        display: inline-block;
        margin-left: 5px;
        font-size: clamp(2.5rem, 10vw, 6rem);
    }

    .bounceball {
        position: relative;
        display: inline-block;
        height: 87px;
        width: 65px;
        &:before {
            position: absolute;
            content: '';
            display: block;
            top: 0;
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background-color: ${(props) => props.theme.maroon};
            transform-origin: 50%;
            animation: ${bounce} 500ms alternate infinite ease;
        }
    }
`

export default function Redirect() {
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        const redirect = async () => {
            try {
                const res = await axios.get(`redirect/${id}`);
                console.log(res.data)
                if (!res.data) {
                    alert('Invalid URL');
                    history.push('/');
                } else {
                    window.location.href = `${res.data}`;
                }
            } catch (error) {
                console.log(error)
            }
        }
        redirect()
    }, [id, history])
    return (
        <StyledRedirect>
            <div className="main-loader">
                <div class="loading">
                    <div class="bounceball"></div>
                    <div class="text">NOW LOADING</div>
                </div>
            </div>
        </StyledRedirect>
    )
}
