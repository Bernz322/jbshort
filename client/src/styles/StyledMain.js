import styled from 'styled-components/macro'
import { motion } from 'framer-motion'


const StyledMain = styled(motion.main)`
    height: calc(100vh - 135px);
    width: 100vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    section{
        width: 600px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0 15px;
    }

    .description{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        font-size: var(--fz-xl);

        @media screen and (max-height: 620px) {
            display: none;
        }
    }

    p{
        color: ${(props) => props.theme.p};
        text-align: center;
    }

    h1{
        color: ${(props) => props.theme.maroon};

        span{
            font-size: var(--fz-xl);
            color: ${(props) => props.theme.p};
            font-weight: 400;
        }
    }

    .desc__ {
        display: flex;
    }

    .desc__ > svg{
        width:20px;
        height: 20px;
        margin-right: 10px;
        color: ${(props) => props.theme.maroon};
    }

    h3{

        @media screen and (max-width: 400px){
            font-size: var(--fz-sm);
        }
        
    }

    .output__url{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .container{
        width: 100%;
        padding: 25px;
        height: fit-content;
        background: rgba( 255, 255, 255, 0.1 );
        box-shadow: 0 8px 32px 0 rgba( 220, 20, 60, 0.37 );
        backdrop-filter: blur( 4.5px );
        -webkit-backdrop-filter: blur( 4.5px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        /* background-color: #e1e3e4; */
        margin: 15px;
    }

    input.input__url{
        width: 100%;
        margin: 15px 0;
        height: 50px;
        border-radius: 5px;
        outline: none;
        border: 1px solid var(--light-grey);
        padding: 10px;
        font-weight: 400;
        font-size: var(--fz-lg);
        color: ${(props) => props.theme.maroon};

        @media (max-width: 400px) {
            font-size: var(--fz-sm);
        }
    }

    input.input__url__after{
        width: calc(100% - 100px);
        margin: 15px 0;
        height: 50px;
        border-radius: 5px 0 0 5px;
        outline: none;
        border: 1px solid var(--light-grey);
        padding: 10px;
        font-weight: 400;
        font-size: var(--fz-lg);
        color: ${(props) => props.theme.maroon};
        border-left: none;

        @media (max-width: 400px) {
            font-size: var(--fz-sm);
        }
    }

    div.copy__url{
        width: 100px;
        margin: 15px 0;
        border: 1px solid var(--light-grey);
        border-left: none;
        padding: 10px;
        font-weight: 400;
        font-size: var(--fz-lg);
        border-radius: 0 5px 5px 0 ;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.maroon};
        color: var(--white);
        cursor: pointer;
    }

    .short__url__input{
        display: flex;
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

        @media (max-width: 400px) {
            font-size: var(--fz-sm);
        }

        &:hover{
            filter: brightness(1.1);
        }
    }
`

export default StyledMain