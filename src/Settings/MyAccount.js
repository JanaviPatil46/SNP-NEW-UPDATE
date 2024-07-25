
import React, { useState } from 'react';
import './myaccount.css';
import Box from '@mui/material/Box';
import {Typography, useMediaQuery, Button, Select,  MenuItem} from '@mui/material'; 
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import user from "../Images/user.jpg";
import {Switch} from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// Configure ClassNameGenerator
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);

const MyAccount = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [showSaveButtons, setShowSaveButtons] = useState(false);

  const handleEditClick = () => {
    setShowSaveButtons(true);
    
  };

  const handleCancelButtonClick = () => {
    setShowSaveButtons(false);
  };


  const [passShow, setPassShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleAuthentication = () => {
    setShowAlert(!showAlert);
  };


  const [SystemLang, setSystemLang] = React.useState('');
  const options = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },

  ];

  return (
    <>
      <Box>
        <Typography variant="h4">Account Settings</Typography>
      </Box>
      <Box className="account-settings">
        <Box className="accounts-details-user">
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box className='hr'>
                <Typography variant="h6">Personal details</Typography>
              </Box>
              <Box className='user-profile-container'>
                <img src={user} alt="" className="user-profile-image" style={{ width: "40px", height: "40px", borderRadius: "50%", marginTop: "25px" }} />
              </Box>
              <Box className='hr'>
                <BorderColorRoundedIcon sx={{ float: "right", marginBottom: "10px", cursor: "pointer", color: '#1168bf' }} onClick={handleEditClick} />
              </Box>
            </Box>
            <Box className="contact-details">
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  gap: 5,
                  padding: '1px 25px 0 5px',

                }}
              >
                <Box>
                  <Box className="base-Input-root">
                    <label htmlFor="first-name">First name</label>
                    <input
                      name="firstName"
                      className="base-Input-input"
                      placeholder="First Name"
                    />
                  </Box>
                </Box>
                <Box>
                  <Box className="base-Input-root">
                    <label htmlFor="middle-name">Middle Name</label>
                    <input
                      name="middleName"
                      className="base-Input-input"
                      placeholder="Middle Name"
                    />
                  </Box>
                </Box>
                <Box>
                  <Box className="base-Input-root">
                    <label htmlFor="last-name">Last name</label>
                    <input
                      name="lastName"
                      className="base-Input-input"
                      placeholder="Last name"
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ width: '94%', margin: '8px' }}>
                <Box className="base-Input-root">
                  <label htmlFor="last-name">Phone Number</label>
                  <input
                    name="Phone Number"

                    className="base-Input-input"
                    placeholder="Last name"
                  />
                </Box>
              </Box>

            </Box>
            {showSaveButtons && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  padding: '1px 5px 0 5px',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"

                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={handleCancelButtonClick}
                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}

                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
          <Box className="login-details-user" >
            <Box className="login-header">
              <Typography variant="h6">Login Details</Typography>
              <BorderColorRoundedIcon onClick={toggleAlert} sx={{ color: '#1168bf', cursor: 'pointer' }} />
              {showAlert && (
                <Box className="overlay">
                  <Box className="overlay-login-container">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6">Authentication</Typography>
                      <CloseRoundedIcon onClick={handleCloseAlert} />
                    </Box>
                    <hr style={{ margin: "15px 0" }} />
                    <Box>
                      <span>In order to change your login details you must provide your current password.</span>
                    </Box>
                    <Box className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "3%" }}>
                      <Box className="inputfield-container">
                        <Box sx={{ width: '94%', margin: '8px' }}>
                          <Box className="base-Input-root">
                            <label htmlFor="last-name">Password</label>
                            <input
                              name="lastName"
                              type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"
                              className="base-Input-input"

                            />
                          </Box>
                        </Box>
                        <Box className="showpass" onClick={() => setPassShow(!passShow)} style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }}>
                          {!passShow ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <NavLink to="/forgotpass" href="#" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
                        Forgot Password?
                      </NavLink>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 4,
                        padding: '1px 5px 0 5px',
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                        sx={{
                          mt: 2,
                          width: isSmallScreen ? '100%' : 'auto',
                          borderRadius: '10px',
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={handleCloseAlert}
                        sx={{
                          mt: 2,
                          width: isSmallScreen ? '100%' : 'auto',
                          borderRadius: '10px',
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box sx={{ width: '94%', margin: '8px' }}>
              <Box className="base-Input-root">
                <label htmlFor="last-name">Email</label>
                <input
                  name="Email"
                  type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"
                  className="base-Input-input"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 5,
                padding: '1px 25px 0 5px',
              }}
            >
              <Box>
                <Box className="base-Input-root">
                  <label htmlFor="first-name">Password</label>
                  <input
                    name="Password"
                    className="base-Input-input"
                    placeholder="Password"
                  />
                </Box>
              </Box>
              <Box>
                <Box className="base-Input-root">
                  <label htmlFor="middle-name">Confirm Password</label>
                  <input
                    name="ConfirmPassword"

                    className="base-Input-input"
                    placeholder="Confirm Password"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '94%', margin: '8px' }}>
              <Box className="base-Input-root">
                <label htmlFor="last-name">Stay signed in for</label>
                <input
                  name="Staysigned"
                  className="base-Input-input"
                  placeholder='Stay signed in for'
                />
              </Box>
            </Box>
          </Box>
          <Box>
          </Box>
          <Box className="authentication">
            <Box className="authentication-header">
              <Typography variant="h6">Two-factor authentication</Typography>

            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ display: "flex", gap: "10px", marginTop: "25px", cursor: "pointer", alignItems: "center" }}>
              <Switch
                onChange={handleAuthentication}
                // checked={showAlert}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={10}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={32}
                className="react-switch"
              />
              <Box style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <p onClick={handleAuthentication}>Turn on two-factor authencation</p>
                <HelpOutlineRoundedIcon style={{ color: "blue" }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className='notifiaction-details' >
          <Box className="preferences">
            <Box className="preferences-header">
              <Typography variant="h6"> Notification preferences</Typography>
              <HelpOutlineRoundedIcon style={{ color: "blue" }} />
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
              <Box>
                <Box style={{ padding: "20px" }}></Box>
                <hr />

                <Box className="lists">
                  <Box style={{ margin: "10px 0" }}>
                    <p>Invoices</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Payments</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Organizers</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Documents</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0 10px 15px" }}>
                    <p>Uploads</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0 10px 15px" }}>
                    <p>E-signatures</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0 10px 15px" }}>
                    <p>Approvals</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0 10px 15px" }}>
                    <p>"Done uploading"</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Tasks</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Messages</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>New mail</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Proposals</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Jobs</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>Mentions</p>
                  </Box>
                  <hr />
                  <Box style={{ margin: "10px 0" }}>
                    <p>SMS</p>
                  </Box>
                  <hr />
                </Box>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box style={{ padding: "9.5px" }}>INBOX+</Box>
                <hr />
                <Box className="lists">
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                </Box>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Box style={{ padding: "9.5px" }}>EMAIL</Box>
                <hr />
                <Box className="lists">
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                  <Box style={{ margin: "16px 0" }}>
                    <input type="checkbox" />
                  </Box>
                  <hr />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="emailsyns">
            <Box>
              <Typography variant="h6"> Email Sync</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
              <p>Sync your existing email with TaxDome — all your client messages in one place.</p>
              <HelpOutlineRoundedIcon style={{ color: "blue" }} />
            </Box>
            <Box style={{ marginTop: "25px" }}>
              <Box sx={{ width: '94%', margin: '8px' }}>
                <Box className="base-Input-root">
                  <label htmlFor="last-name">Email for sync</label>
                  <input
                    name="Email for sync"

                    className="base-Input-input"
                    placeholder="Email for sync"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"

                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Sync your email
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="emailsyns" style={{ marginTop: "20px" }}>
            <Box>
              <Typography variant="h6">Download Windows app</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ marginTop: "20px" }}>
              <p>TaxDome Windows App help</p>
              <Link to="#">https://help.taxdome.com/article/164-taxdome-windows-application</Link>
            </Box>
          </Box>

          <Box className="emailsyns">
            <Box>
              <Typography variant="h6">International settings</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>


            <Box>
              <Box className="base-Input-root">
                <label htmlFor="subject">From</label>
                <Select
                  value={SystemLang}
                  onChange={(e) => setSystemLang(e.target.value)}
                  sx={{ width: '100%', mt: 2, mb: 2 }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>


        </Box>
      </Box>
    </>
  );
}
export default MyAccount;



