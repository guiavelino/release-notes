import { Box } from '@mui/material';
import { ReactNode, useContext } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

interface PageLayoutWithSideBarProps {
    children: ReactNode;
}

export default function PageLayoutWithSideBarComponent({ children }: PageLayoutWithSideBarProps) {
    const { isDesktop } = useContext(GlobalContext);
    
    return (
        <Box
            component="main" 
            sx={{ width: isDesktop ? `calc(100% - 300px)` : '100%', marginLeft: isDesktop ? `300px` : 0 }}
        >
            {children}
        </Box>
    );
}