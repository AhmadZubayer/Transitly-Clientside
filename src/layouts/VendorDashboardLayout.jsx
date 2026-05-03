import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdConfirmationNumber, MdAnalytics } from 'react-icons/md';
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
                width: anchor === 'left' ? 240 : 'auto',
                height: anchor === 'bottom' ? 'auto' : '100%',
                p: 1.5,
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
                            py: 0.75,
                            '&.active': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.2)' : '#e0e7ff',
                                fontWeight: 600,
                                color: theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" style={{ width: 20, height: 20, color: theme.palette.mode === 'dark' ? '#818cf8' : 'inherit' }}>
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary="Your Profile" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/vendor-dashboard/add-ticket"
                        sx={{
                            py: 0.75,
                            '&.active': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.2)' : '#e0e7ff',
                                fontWeight: 600,
                                color: theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <FiPlus size={20} style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary="Add Ticket" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/vendor-dashboard/tickets"
                        sx={{
                            py: 0.75,
                            '&.active': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.2)' : '#e0e7ff',
                                fontWeight: 600,
                                color: theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <MdConfirmationNumber size={20} style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary="My Tickets" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/vendor-dashboard/analytics"
                        sx={{
                            py: 0.75,
                            '&.active': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.2)' : '#e0e7ff',
                                fontWeight: 600,
                                color: theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <MdAnalytics size={20} style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary="Analytics" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 200px)', pt: 1, pb: 4 }}>
                {/* Desktop sidebar */}
                {!isMobile && (
                    <Box sx={{ 
                        width: 240, 
                        bgcolor: 'background.paper', 
                        borderRadius: '16px',
                        ml: 0,
                        mr: 2,
                        height: 'fit-content',
                        position: 'sticky',
                        top: '80px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}>
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
                    PaperProps={{
                        sx: {
                            borderRadius: anchor === 'bottom' ? '20px 20px 0 0' : '0 20px 20px 0',
                            margin: anchor === 'left' ? '10px' : '0',
                            height: anchor === 'left' ? 'calc(100% - 20px)' : 'auto'
                        }
                    }}
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
