import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

const StyledHeader = styled(motion.header)`
    width: 100%;
    height: 90px;
    padding: 0 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        padding: 0 50px;
    }

    @media (max-width: 400px) {
        padding: 0 15px;
    }

    nav{
        width: var(--site-max-width);
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }

    .toggler{
        width: 24px;
        cursor: pointer;
    }

    a{
        color: var(--near-black);   
    }

    p.logo{
        display: flex;
        font-size: var(--fz-xxl);
        transition: all 0.5s ease;

        &:hover, &:focus{
            cursor: pointer;
            color: ${(props) => props.theme.maroon};
        }
    }
`

export default StyledHeader