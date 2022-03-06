import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

const StyledFooter = styled(motion.footer)`
    width: 100%;
    height: 45px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 450px) {
            font-size: 12px;
    }

    a.floating-icons{
        border-radius: 100%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;

        @media screen and (min-width: 1200px) {
            margin-top: 0;
        }

        @media screen and (max-width: 1199px){
            
        }
    }

    svg{
        color: ${(props) => props.theme.color};
    }
`

export default StyledFooter