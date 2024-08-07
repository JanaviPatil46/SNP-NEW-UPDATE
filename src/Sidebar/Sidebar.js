
import React, { useState, useEffect } from "react";
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse, Typography, Drawer } from "@mui/material";
import { ChevronLeft, ChevronRight,Brightness4, Brightness7 } from "@mui/icons-material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import iconMapping from './icons/index';
import Logo from '../Images/Logo.svg';
import { FaBars } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import ContactForm from '../Contact/ContactForm';
import AccountForm from '../Contact/AccountForm';
function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [newSidebarItems, setNewSidebarItems] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [rightDrawerContent, setRightDrawerContent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode based on the state
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:9000/api/");
        setSidebarItems(response.data);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      const fetchNewSidebarData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:9000/newsidebar/");
          setNewSidebarItems(response.data);
        } catch (error) {
          console.error("Error fetching new sidebar data:", error);
        }
      };

      fetchNewSidebarData();
    }
  }, [isDrawerOpen]);

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleToggleSubmenu = (path, label) => {
    setOpenMenu(openMenu === path ? null : path);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleNewDrawerClose = () => {
    setIsRightDrawerOpen(false);
  };
  const handleNewItemClick = (label) => {
    if (label === 'Account' || label === 'Contact') {
      setRightDrawerContent(label);
      setIsRightDrawerOpen(true);
    }
  };

  return (
    <div className="grid-container">
      <header className="header">
        <Box component="header" sx={{ p: 2, display: 'flex', gap: 3 }}>
          <Box className='bar-icon'>
            <FaBars onClick={handleToggleSidebar} style={{ fontSize: '1.8rem' }} />
          </Box>
          <Box>
            <AiOutlinePlusCircle className="add-icon" onClick={handleDrawerOpen} />
          </Box>
          <Box>
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Box>
      </header>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarVisible ? 'show' : ''}`}>
        <IconButton
          onClick={handleToggleSidebar}
          className="toggle-button"
        >
          {isCollapsed ? <ChevronRight className="toggle-icon" /> : <ChevronLeft className="toggle-icon" />}
        </IconButton>
        <Box
          component="aside"
          style={{
            width: isCollapsed ? '50px' : '225px',
            padding: 5,
            transition: 'width 0.3s',
          }}
        >
          <Box sx={{ pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
            <img src={Logo} alt="logo" style={{ height: "40px", display: 'block' }} />
            {!isCollapsed && (
              <Typography variant="h5">SNP</Typography>
            )}
          </Box>
          <Box className='sidebar-contents' sx={{ mt: 3 }}>
            <List sx={{ cursor: 'pointer' }}>
              {sidebarItems.map(item => (
                <Box key={item._id}>
                  <ListItem onClick={() => handleToggleSubmenu(item._id, item.label)} component={Link} to={item.path} className="menu-item">
                    <ListItemIcon sx={{ fontSize: '1.5rem',  }} className="menu-icon">
                      {iconMapping[item.icon] ? React.createElement(iconMapping[item.icon]) : null}
                    </ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.label} sx={{ ml: -2 }}/>}
                    {!isCollapsed && item.submenu.length > 0 && (
                      <ListItemIcon sx={{ justifyContent: 'end' }}>
                        {openMenu === item._id ? <ExpandLess /> : <ExpandMore />}
                      </ListItemIcon>
                    )}
                  </ListItem>
                  {item.submenu.length > 0 && (
                    <Collapse in={openMenu === item._id}>
                      <List component="div" disablePadding>
                        {item.submenu.map(subItem => (
                          <ListItem key={subItem.path} component={Link} to={subItem.path} sx={{ pl: 4 }} className="menu-item">
                            <ListItemIcon sx={{ fontSize: '1.2rem', color: 'black' }}>
                              {iconMapping[subItem.icon] ? React.createElement(iconMapping[subItem.icon]) : null}
                            </ListItemIcon>
                            {!isCollapsed && <ListItemText primary={subItem.label} sx={{ ml: -2 }}/>}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </aside>
      <main className="main">
        <Box
          component="main"
          sx={{
            // padding: 1,
            // border: '2px solid red',
           
          }}
        >
          <Outlet />
        </Box>
      </main>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight='bold'>New Sidebar Content</Typography>
            <RxCross2 onClick={handleDrawerClose} style={{ cursor: 'pointer' }} />
          </Box>
          <List>
            {newSidebarItems.map(item => (
              <ListItem key={item._id} component={Link} to={item.path} className="menu-item" onClick={() => handleNewItemClick(item.label)}>
                <ListItemIcon sx={{ fontSize: '1.5rem', color: 'black' }}>
                  {iconMapping[item.icon] ? React.createElement(iconMapping[item.icon]) : null}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer anchor="right" open={isRightDrawerOpen} onClose={handleNewDrawerClose}
        classes={{ paper: 'custom-right-drawer' }}>
        <Box sx={{ width: isSmallScreen ? '100vw' : 650 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          </Box>
          {rightDrawerContent === 'Account' && <AccountForm handleNewDrawerClose={handleNewDrawerClose} handleDrawerClose={handleDrawerClose}/>}
          {rightDrawerContent === 'Contact' && <ContactForm handleNewDrawerClose={handleNewDrawerClose} handleDrawerClose={handleDrawerClose} />}
        </Box>
      </Drawer>
    </div>
  );
}

export default Sidebar;


