import React from 'react'

import { StyledFooter } from '../styles'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <StyledFooter initial="hidden"
            animate="visible"
            transition={{ duration: 1.2 }}
            variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 200 }
            }}>© {year} JBShort | Jeffrey Bernadas. All rights reserved.
        </StyledFooter>
    )
}
