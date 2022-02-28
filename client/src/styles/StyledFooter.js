import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

const StyledFooter = styled(motion.footer)`
    width: 100%;
    height: 45px;
    padding: 0 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 450px) {
            font-size: 12px;
    }
`

export default StyledFooter