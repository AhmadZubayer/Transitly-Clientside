import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Nav from '../components/Nav';

const VendorDashboardLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const anchor = isMobile ? 'bottom' : 'left';

    const toggleDrawer = (shouldOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(shouldOpen);
    };

    const sidebarContent = (
        <Box
            sx={{
                width: anchor === 'left' ? 300 : 'auto',
                height: anchor === 'bottom' ? 'auto' : '100%',
                p: 2,
            }}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List sx={{ width: '100%' }}>
                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/vendor-dashboard/profile"
                        sx={{
                            '&.active': {
                                backgroundColor: '#e0e7ff',
                                fontWeight: 600,
                                color: '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" style={{ width: 24, height: 24 }}>
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary="Your Profile" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/vendor-dashboard/add-ticket"
                        sx={{
                            '&.active': {
                                backgroundColor: '#e0e7ff',
                                fontWeight: 600,
                                color: '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon>
                            <FiPlus size={24} />
                        </ListItemIcon>
                        <ListItemText primary="Add Ticket" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Nav />
            <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
                {/* Desktop sidebar */}
                {!isMobile && (
                    <Box sx={{ width: 300, bgcolor: 'background.paper', overflowY: 'auto' }}>
                        {sidebarContent}
                    </Box>
                )}

                {/* Main content */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {/* Page content */}
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        <Outlet />
                    </Box>
                </Box>

                {/* Mobile drawer */}
                <Drawer
                    anchor={anchor}
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    {sidebarContent}
                </Drawer>

                {/* Mobile menu button */}
                {isMobile && (
                    <Button
                        onClick={toggleDrawer(true)}
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            left: 20,
                            zIndex: 100,
                            borderRadius: '50%',
                            width: 56,
                            height: 56,
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#4338ca',
                            }
                        }}
                    >
                        ☰
                    </Button>
                )}
            </Box>
        </>
    );
};

export default VendorDashboardLayout;
