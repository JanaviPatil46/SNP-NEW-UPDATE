import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Select, Chip, MenuItem, TextField } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React, { useState, useEffect } from 'react';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { BiSolidContact } from "react-icons/bi";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { InputLabel, } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
const AccountForm = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState("Account Info");
  const [accountType, setAccountType] = useState("Individual");
  const [accountName, setaccountName] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [temmemberValues, setTeamMemberValues] = useState([]);
  const [foldertemplate, setfoldertemplate] = useState('');
  const [companyname, setcompanyname] = useState('')
  const [country, setcountry] = useState('')
  const [countries, setCountries] = useState([]);
  const [streetAddress, setstreetAddress] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [postalCode, setpostalCode] = useState('');
  const [activeStep, setActiveStep] = useState("Account Info");
  const handlefolderTempChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleOptionChange = (event, value) => {
    setSelectedOption(value || event.target.value);
    setActiveStep(value || event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };
  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };
  const handleTeamMemberChange = (event) => {
    setTeamMemberValues(event.target.value);
  };
  const options = [
    { value: 'tag1', label: 'Tag 1', customStyle: { color: 'red' } },
    { value: 'tag2', label: 'Tag 2', customStyle: { color: 'blue' } },
    { value: 'tag3', label: 'Tag 3', customStyle: { color: 'green' } },
  ];
  const TeamOptions = [
    { value: 'team 1', label: 'team1', },
    { value: 'team2', label: 'team2', },
    { value: 'team3', label: 'team3', },
  ]
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryData);
      })
      .catch((error) =>
        console.error('Error fetching country data:', error)
      );
  }, []);
  const [showContactform, setShowContactForm] = useState(false)
  const handleCreateContact = () => {
    setShowContactForm(true)


  };
  const [showAlert, setShowAlert] = useState(false);
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const [phoneNumbers, setPhoneNumbers] = useState([]);


  const handlePhoneNumberChange = (id, phone) => {
    setPhoneNumbers((prevPhoneNumbers) =>
      prevPhoneNumbers.map((item) =>
        item.id === id ? { ...item, phone } : item
      )
    );
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers((prevPhoneNumbers) => [
      ...prevPhoneNumbers,
      { id: Date.now(), phone: '', isPrimary: false },
    ]);
  };

  const handleDeletePhoneNumber = (id) => {
    setPhoneNumbers((prevPhoneNumbers) =>
      prevPhoneNumbers.filter((item) => item.id !== id)
    );
  };

  //for creating multiple forms when click on Add New Contact
  const [contactCount, setContactCount] = useState(1);
  const addNewContact = () => {
    setContactCount(contactCount + 1);
  };



  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid grey' }}>
        <Typography variant='h6'>New Account</Typography>
        <RxCross2 style={{ cursor: 'pointer' }} onClick={onClose} />
      </Box>
      <Box>
        {/* <FormControl>
          <RadioGroup
            row
            aria-labelledby="main-radio-buttons-group-label"
            name="main-radio-buttons-group"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <div className='account-contact-info'>
              <FormControlLabel value="Account Info" control={<Radio />} label="Account Info" />
              <ArrowForwardIosRoundedIcon />
              <FormControlLabel value="Contact Info" control={<Radio />} label="Contact Info" />
            </div>
          </RadioGroup>
        </FormControl> */}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="main-radio-buttons-group-label"
            name="main-radio-buttons-group"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <div className='account-contact-info'>
              {activeStep === 'Contact Info' ? (
                <>
                  <CheckCircleRoundedIcon style={{ color: "green" }} />
                  <ArrowForwardIosRoundedIcon />
                  <FormControlLabel value="Contact Info" control={<Radio checked />} label="Contact Info" />
                </>
              ) : (
                <>
                  <FormControlLabel value="Account Info" control={<Radio checked={selectedOption === 'Account Info'} />} label="Account Info" />
                  <ArrowForwardIosRoundedIcon />
                  <FormControlLabel value="Contact Info" control={<Radio checked={selectedOption === 'Contact Info'} />} label="Contact Info" />
                </>
              )}
            </div>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ p: 2 }}>
        {selectedOption === 'Account Info' && (
          <Box>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="account-type-radio-buttons-group-label"
                name="account-type-radio-buttons-group"
                value={accountType}
                onChange={handleAccountTypeChange}
              >
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="Company" control={<Radio />} label="Company" />
              </RadioGroup>
            </FormControl>
            {accountType === 'Individual' && (
              <Box>
                <Box>
                  <div className='account-Type-options'>
                    <div>
                      <h3 style={{ margin: "20px" }}>Account Type</h3>
                    </div>
                    <div className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></div>
                    <div className='MoreVertRoundedIcon'>
                      <MoreVertRoundedIcon />
                    </div>
                  </div>

                  <Box

                  >
                    <div className="base-Input-root">
                      <label htmlFor="first-name">Account Name</label>

                      <TextField
                        size='small'
                        fullWidth
                        placeholder="Account Name" value={accountName}
                        onChange={(e) => setaccountName(e.target.value)}
                        margin='normal'
                      />

                    </div>

                  </Box>

                  <Box sx={{ padding: '1px 5px' }}>
                    <div className="base-Input-root">
                      <label htmlFor="email">Tags</label>
                      <Select
                        multiple
                        value={selectedValues}
                        onChange={handleChange}
                        sx={{
                          border: '2px solid #cbd5e1',
                          borderRadius: '8px',
                          margin: '20px',
                          width: '95%',
                          '& .MuiSelect-select': {
                            padding: '8px ',
                          },
                        }}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                              const option = options.find(opt => opt.value === value);
                              return (
                                <Chip
                                  key={value}
                                  label={option.label}
                                  style={option.customStyle}
                                />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value} style={option.customStyle}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Box>



                  <Box sx={{ padding: '1px 5px' }}>
                    <div className="base-Input-root">
                      <label htmlFor="Team Member">Team Member</label>
                      <Select
                        multiple
                        value={temmemberValues}
                        onChange={handleTeamMemberChange}
                        sx={{
                          border: '2px solid #cbd5e1',
                          borderRadius: '8px',
                          margin: '20px',
                          width: '95%',
                          '& .MuiSelect-select': {
                            padding: '8px ',
                          },
                        }}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                              const option = TeamOptions.find(opt => opt.value === value);
                              return (
                                <Chip
                                  key={value}
                                  label={option.label}
                                  style={option.customStyle}
                                />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {TeamOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value} style={option.customStyle}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Box>

                  <Box


                  >
                    <div className="base-Input-root">
                      <label htmlFor="first-name">Folder Template</label>

                      <TextField
                        size='small'
                        fullWidth
                        margin='normal'
                        placeholder="Folder Template" value={foldertemplate} onChange={(e) => setfoldertemplate(e.target.value)}
                      />
                    </div>
                  </Box>
                </Box>

              </Box>
            )}
            {accountType === 'Company' && (
              <Box>
                <form>
                  <Box>
                    <Box>
                      <div className="base-Input-root">
                        <label htmlFor="first-name">Account Name</label>
                        <input
                          name="AccountName"
                          value={accountName}
                          onChange={(e) => setaccountName(e.target.value)}
                          className="base-Input-input"
                          placeholder="Account Name"
                        />
                      </div>
                    </Box>

                    <Box>
                      <div className="base-Input-root">
                        <label htmlFor="first-name">Company Name</label>
                        <input
                          name="CompanyName"
                          value={companyname}
                          onChange={(e) => setcompanyname(e.target.value)}
                          className="base-Input-input"
                          placeholder="Company Name"
                        />
                      </div>
                    </Box>

                    <Box sx={{ padding: '1px 5px' }}>
                      <div className="base-Input-root">
                        <label htmlFor="email">Tags</label>
                        <Select
                          multiple
                          value={selectedValues}
                          onChange={handleChange}
                          sx={{
                            border: '2px solid #cbd5e1',
                            borderRadius: '8px',
                            margin: '20px',
                            width: '95%',
                            '& .MuiSelect-select': {
                              padding: '8px ',
                            },
                          }}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const option = options.find(opt => opt.value === value);
                                return (
                                  <Chip
                                    key={value}
                                    label={option.label}
                                    style={option.customStyle}
                                  />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {options.map((option) => (
                            <MenuItem key={option.value} value={option.value} style={option.customStyle}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Box>


                    <Box sx={{ padding: '1px 5px' }}>
                      <div className="base-Input-root">
                        <label htmlFor="Team Member">Team Member</label>
                        <Select
                          multiple
                          value={temmemberValues}
                          onChange={handleTeamMemberChange}
                          sx={{
                            border: '2px solid #cbd5e1',
                            borderRadius: '8px',
                            margin: '20px',
                            width: '95%',
                            '& .MuiSelect-select': {
                              padding: '8px ',
                            },
                          }}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const option = TeamOptions.find(opt => opt.value === value);
                                return (
                                  <Chip
                                    key={value}
                                    label={option.label}
                                    style={option.customStyle}
                                  />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {TeamOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value} style={option.customStyle}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Box>



                    <div className="base-Input-root">
                      <label htmlFor="first-name">Folder Template</label>
                    </div>
                    <Select
                      labelId="demo-select-label"
                      id="demo-select"
                      value={selectedValue} // Ensure this is a single value, not an array
                      onChange={handlefolderTempChange}
                      placeholder='dghhgddf'
                      sx={{
                        border: '2px solid #cbd5e1',
                        borderRadius: '8px',
                        margin: '20px',
                        width: '96%',
                        '& .MuiSelect-select': {
                          padding: '10px ',
                        },
                      }}
                    >
                      <MenuItem value="" disabled>

                      </MenuItem>
                      <MenuItem value={10}>Option 1</MenuItem>
                      <MenuItem value={20}>Option 2</MenuItem>
                      <MenuItem value={30}>Option 3</MenuItem>
                    </Select>
                  </Box>

                  <>
                    <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
                      Address
                    </Typography>
                    <Box
                      sx={{
                        paddingLeft: '20px',
                      }}
                    >
                      <div>
                        <label htmlFor="country">Country</label>
                      </div>
                      <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                        sx={{
                          backgroundColor: 'white',
                          width: '100%',
                          borderRadius: '8px',
                          margin: '10px 0',
                          '& .MuiSelect-select': {
                            padding: '10px',
                          },
                        }}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <div className="base-Input-root">
                        <label htmlFor="street-address">Street address</label>
                        <input
                          name="streetAddress"
                          id="street-address"
                          className="base-Input-input"
                          placeholder="Street address"
                          value={streetAddress}
                          onChange={(e) => setstreetAddress(e.target.value)}
                        />
                      </div>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',

                        gap: 4,
                        padding: '1px 30px 0 5px',
                      }}
                    >
                      <Box>
                        <div className="base-Input-root">
                          <label htmlFor="city">City</label>
                          <input
                            name="city"
                            id="city"
                            className="base-Input-input"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                          />
                        </div>
                      </Box>
                      <Box>
                        <div className="base-Input-root">
                          <label htmlFor="state">State/Province</label>
                          <input
                            name="state"
                            id="state"
                            className="base-Input-input"
                            placeholder="State/Province"
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                          />
                        </div>
                      </Box>
                      <Box>
                        <div className="base-Input-root">
                          <label htmlFor="postal-code">ZIP/Postal Code</label>
                          <input
                            name="postalCode"
                            id="postal-code"
                            className="base-Input-input"
                            placeholder="ZIP/Postal Code"
                            value={postalCode}
                            onChange={(e) => setpostalCode(e.target.value)}
                          />
                        </div>
                      </Box>
                    </Box>
                  </>
                </form>

              </Box>
            )}
            <Button onClick={() => handleOptionChange(null, 'Contact Info')}>Continue</Button>
          </Box>
        )}
        {selectedOption === 'Contact Info' && (
          <Box>
            <>
              {!showContactform && (
                <div className='contactForm'>
                  <div className='create_new_contact-container'>
                    <div>
                      <h3 style={{ marginLeft: "20px" }}>Contacts</h3>
                    </div>
                    <div className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></div>
                  </div>

                  <div className='link-addContact-container'>
                    <BiSolidContact style={{ fontSize: '85px' }} />
                    <span style={{ fontSize: '20px', marginTop: '10px' }}><b>No linked contacts </b></span>
                    <span style={{ fontSize: '16px', marginTop: '10px', color: '#8895a5', }}>Link existing contact or add new contact to finish creating the account</span>

                    <div className='link-addContact'>

                      <span className='Link-existing-contact'>
                        <p><AddCircleOutlineIcon /></p>
                        <p onClick={toggleAlert}>Link existing contact </p>
                      </span>

                      <span className='add-new-Contact'>
                        <p><AddCircleOutlineIcon /></p>
                        <p onClick={handleCreateContact} >Add new contact</p>
                      </span>
                    </div>
                  </div>
                  {showAlert && (
                    <div className="linkContact-overlay">
                      <div className="linkContact-overlay-container">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <h3>Link existing contacts</h3>
                          <div>
                            <CloseIcon style={{ cursor: 'pointer', marginTop: '10px' }} onClick={handleCloseAlert} />
                          </div>
                        </div>
                        <hr />
                        <span>Search for existing contact by entering their name, phone number or email. If contact is not in your CRM, click Cancel and create one on the prior page.</span>

                        <div className="base-Input-root">
                          <InputLabel htmlFor="demo-multi-select-label">Search for Contact</InputLabel>
                        </div>
                        <Select
                          labelId="demo-multi-select-label"
                          id="demo-multi-select"
                          // multiple
                          value={selectedValues}
                          onChange={handleChange}
                          sx={{
                            border: '2px solid #cbd5e1',
                            borderRadius: '8px',
                            //margin: '20px',
                            width: '100%',
                            '& ': {
                              // padding: '10px',
                            },
                          }}

                        >
                          <MenuItem disabled value="">
                            <em>Select Options</em>
                          </MenuItem>
                          <MenuItem value={10}>Option 1</MenuItem>
                          <MenuItem value={20}>Option 2</MenuItem>
                          <MenuItem value={30}>Option 3</MenuItem>
                        </Select>

                        <div style={{ marginTop: '20px' }} className='overlay-btn-container'>
                          <button>Add</button>
                          <button onClick={handleCloseAlert}>Cancel</button>
                        </div>

                      </div>
                    </div>
                  )}


                </div>)}
              <div>
                {showContactform && (
                  <>
                    <div className='create_new_contactform-container'>
                      <div>
                        <h3 style={{ marginLeft: "20px" }}>Contacts</h3>
                      </div>
                      <div className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></div>
                    </div>
                    {[...Array(contactCount)].map((_, index) => (
                      <div style={{ border: "1px solid #e2e8f0", margin: '10px', borderRadius: '8px', height: "55vh", overflowY: 'auto', paddingRight: '10px' }} className='create_new_contactform'>


                        <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
                          Contact {index + 1}
                        </Typography>

                        <Box >



                          <form >

                            <Box
                              sx={{
                                display: 'flex',

                                gap: 4,
                                padding: '1px 30px 0 5px',
                                marginRight: '5px'
                              }}
                            >
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="first-name">First name</label>
                                  <input
                                    name="firstName"

                                    className="base-Input-input"
                                    placeholder="First Name"
                                  />
                                </div>
                              </Box>
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="middle-name">Middle Name</label>
                                  <input
                                    name="middleName"

                                    className="base-Input-input"
                                    placeholder="Middle Name"
                                  />
                                </div>
                              </Box>
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="last-name">Last name</label>
                                  <input
                                    name="lastName"

                                    className="base-Input-input"
                                    placeholder="Last name"
                                  />
                                </div>
                              </Box>
                            </Box>
                            <Box sx={{ padding: '1px 5px' }}>
                              <div className="base-Input-root">
                                <label htmlFor="contact-name">Contact Name</label>
                                <input
                                  name="contactName"

                                  className="base-Input-input"
                                  placeholder="Contact Name"
                                />
                              </div>
                            </Box>
                            <Box sx={{ padding: '1px 5px' }}>
                              <div className="base-Input-root">
                                <label htmlFor="company-name">Company Name</label>
                                <input
                                  name="companyName"

                                  className="base-Input-input"
                                  placeholder="Company Name"
                                />
                              </div>
                            </Box>
                            <Box sx={{ padding: '1px 5px' }}>
                              <div className="base-Input-root">
                                <label htmlFor="note">Note</label>
                                <input
                                  name="note"

                                  className="base-Input-input"
                                  placeholder="Note"
                                />
                              </div>
                            </Box>
                            <Box sx={{ padding: '1px 5px' }}>
                              <div className="base-Input-root">
                                <label htmlFor="ssn">SSN</label>
                                <input
                                  name="ssn"

                                  className="base-Input-input"
                                  placeholder="SSN"
                                />
                              </div>
                            </Box>
                            <Box sx={{ padding: '1px 5px' }}>
                              <div className="base-Input-root">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  name="email"

                                  className="base-Input-input"
                                  placeholder="Email"
                                />
                              </div>
                            </Box>
                            <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
                              Phone Numbers
                            </Typography>
                            {phoneNumbers.map((phone) => (
                              <Box
                                key={phone.id}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 2,
                                  ml: 1,
                                  mb: 2,
                                }}
                              >
                                {phone.isPrimary && (
                                  <Chip
                                    label="Primary phone"
                                    color="primary"
                                    size="small"
                                    sx={{ position: 'absolute', mt: -3 }}
                                  />
                                )}
                                <PhoneInput
                                  country={'us'}
                                  value={phone.phone}
                                  onChange={(phoneValue) =>
                                    handlePhoneNumberChange(phone.id, phoneValue)
                                  }
                                  inputStyle={{
                                    width: '100%',
                                  }}
                                  buttonStyle={{
                                    borderTopLeftRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                  }}
                                  containerStyle={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                  }}
                                />
                                <AiOutlineDelete
                                  onClick={() => handleDeletePhoneNumber(phone.id)}
                                  style={{ cursor: 'pointer', color: 'red' }}
                                />
                              </Box>
                            ))}


                            <Box
                              sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                ml: 1,
                                cursor: 'pointer',
                                color: '#1976d3',
                                fontWeight: 600,
                                marginLeft: '20px'
                              }}
                              onClick={handleAddPhoneNumber}
                            >
                              <AiOutlinePlusCircle />
                              <p>Add phone number</p>
                            </Box>
                            <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
                              Address
                            </Typography>
                            <Box
                              sx={{
                                paddingLeft: '20px', // Adjust this value to shift further right
                              }}
                            >
                              <div>
                                <label htmlFor="country">Country</label>
                              </div>
                              <Select
                                labelId="country-select-label"
                                id="country-select"
                                sx={{
                                  backgroundColor: 'white',
                                  width: '100%',
                                  borderRadius: '8px',
                                  margin: '10px 0',
                                  '& .MuiSelect-select': {
                                    padding: '10px',

                                  },
                                }}
                              >
                                {countries.map((country) => (
                                  <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                            <Box>
                              <div className="base-Input-root">
                                <label htmlFor="street-address">Street address</label>
                                <input
                                  name="streetAddress"

                                  className="base-Input-input"
                                  placeholder="Street address"
                                />
                              </div>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',

                                gap: 4,
                                padding: '1px 30px 0 5px',

                              }}
                            >
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="city">City</label>
                                  <input
                                    name="city"

                                    className="base-Input-input"
                                    placeholder="City"
                                  />
                                </div>
                              </Box>
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="state">State/Province</label>
                                  <input
                                    name="state"

                                    className="base-Input-input"
                                    placeholder="State/Province"
                                  />
                                </div>
                              </Box>
                              <Box>
                                <div className="base-Input-root">
                                  <label htmlFor="postal-code">
                                    ZIP/Postal Code
                                  </label>
                                  <input
                                    name="postalCode"

                                    className="base-Input-input"
                                    placeholder="ZIP/Postal Code"
                                  />
                                </div>
                              </Box>
                            </Box>
                          </form>
                        </Box>
                      </div>
                    ))}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        ml: 1,
                        cursor: 'pointer',
                        color: '#1976d3',
                        fontWeight: 600,
                        marginLeft: '20px'
                      }}

                    >
                      <AiOutlinePlusCircle />
                      <p onClick={addNewContact}>Add New Contact</p>
                    </Box>
                    <hr />
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

                          borderRadius: '10px',
                        }}
                      >
                        Create
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        // onClick={handleClose}
                        sx={{
                          mt: 2,

                          borderRadius: '10px',
                        }}

                      >
                        Cancel
                      </Button>
                    </Box>

                  </>
                )}

              </div>
            </>

          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AccountForm;

