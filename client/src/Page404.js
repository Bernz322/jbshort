import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const Styled404 = styled.div`
    height: calc(100vh - 135px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 25px;
    margin: 15px;

    .text {
        color: ${(props) => props.theme.maroon};
        display: inline-block;
        margin-left: 5px;
        font-size: clamp(2.5rem, 10vw, 6rem);
    }
    .root{
        padding-top: 80px;
        padding-bottom: 80px;
    }

    .label{
        text-align: center;
        font-weight: 900;
        font-size: 220px;
        line-height: 1;
        margin-bottom: 1.5rem;
        color: ${(props) => props.theme.maroon};
        @media (max-width: 470px) {
            font-size: 120px;
        }
    }

    .title {
        text-align: center;
        font-weight: 900;
        font-size: var(--fz-xxl);

        @media (max-width: 470px) {
            font-size: var(--fz-md);
        }
    }

    .description {
        margin-top: 1.5rem;
        margin-bottom: 1.5;
        @media (max-width: 470px) {
            font-size: var(--fz-xs);
        }
    }

    button{
        background-color: ${(props) => props.theme.maroon};
        color: var(--white);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        font-weight: 400;
        font-size: var(--fz-lg);
        height: 50px;
        border-radius: 5px;
        margin: 15px 0 0;

        @media (max-width: 470px) {
            font-size: var(--fz-xs);
            height: 35px;
        }

        &:hover{
            filter: brightness(1.1);
        }
    }

`

export default function Page404() {
    const history = useNavigate()
    return (
        <Styled404>
            <div className='root'>
                <div className='label'>404</div>
                <h1 className='title'>You have found a secret place.</h1>
                <p className='description'>
                    Oh, you may have stumbled to nothingness, or your link may have expired and is no longer with us. We're so sorry if this is the case.
                </p>
                <div position="center">
                    <button onClick={() => history("/")}>Take me back to home page</button>
                </div>
            </div>
        </Styled404>
    )
}
