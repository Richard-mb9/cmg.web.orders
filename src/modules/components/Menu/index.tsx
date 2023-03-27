import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import TableBarIcon from '@mui/icons-material/TableBar';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';


import LinkDashboardMenu from '../LinkDashboardMenu';
import { useSessionData } from '../../../context/hooks/sessionData';


interface Props {
    window?: () => Window;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

export default function Menu(props: Props) {
    const { window, mobileOpen, handleDrawerToggle, drawerWidth } = props;

    const { storeId, tableName } = useSessionData();

    const container = window !== undefined ? () => window().document.body : undefined;

    const menu = (
        <div>
            <List>
                <LinkDashboardMenu to={`/store/${storeId}`} text='Cardápio' icon={<ListIcon/>} />
                <LinkDashboardMenu to={`/store/${storeId}/products-categories`} text='Categorias' icon={<CategoryIcon/>} />
                <LinkDashboardMenu to={`/store/${storeId}/table/${tableName}`} text='Meus Pedidos' icon={<DescriptionIcon/>} />
            </List>
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {menu}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {menu}
            </Drawer>
        </Box>
    )
}