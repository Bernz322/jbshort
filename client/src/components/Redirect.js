import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import styled, { keyframes } from 'styled-components/macro';

const bounce = keyframes`
    0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
`

const StyledRedirect = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  .text {
    color: #c32148;
    display: inline-block;
    margin-left: 5px;
    }

    .bounceball {
        position: relative;
        display: inline-block;
        height: 37px;
        width: 15px;
        &:before {
            position: absolute;
            content: '';
            display: block;
            top: 0;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #c32148;
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
            <div class="loading">
                <div class="bounceball"></div>
                <div class="text">NOW LOADING</div>
            </div>
        </StyledRedirect>
    )
}
