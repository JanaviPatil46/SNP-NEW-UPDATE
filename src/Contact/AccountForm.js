// import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Select, Chip, MenuItem, TextField, useMediaQuery, Autocomplete, } from '@mui/material';
// import { RxCross2 } from "react-icons/rx";
// import { useTheme } from '@mui/material/styles';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import React, { useState, useEffect } from 'react';
// import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
// import { BiSolidContact } from "react-icons/bi";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import axios from 'axios';
// import CloseIcon from '@mui/icons-material/Close';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
// import { InputLabel, } from '@mui/material';
// import './contact.css'
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// const AccountForm = ({ handleNewDrawerClose }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const [selectedOption, setSelectedOption] = useState("Account Info");
//   const [accountType, setAccountType] = useState("Individual");
//   const [accountName, setaccountName] = useState('');
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [temmemberValues, setTeamMemberValues] = useState([]);
//   const [foldertemplate, setfoldertemplate] = useState('');
//   const [companyname, setcompanyname] = useState('')
//   const [country, setcountry] = useState('')
//   const [countries, setCountries] = useState([]);
//   const [streetAddress, setstreetAddress] = useState('')
//   const [selectedValue, setSelectedValue] = useState('');
//   const [city, setcity] = useState('')
//   const [state, setstate] = useState('')
//   const [postalCode, setpostalCode] = useState('');
//   const [activeStep, setActiveStep] = useState("Account Info");

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//     setcountry(event.target.value);
//   };
//   const handlefolderTempChange = (event) => {
//     setSelectedValue(event.target.value);
//   };
//   const handleOptionChange = (event, value) => {
//     setSelectedOption(value || event.target.value);
//     setActiveStep(value || event.target.value);
//   };

//   const handleAccountTypeChange = (event) => {
//     setAccountType(event.target.value);
//   };
//   const handleChange = (event) => {
//     setSelectedValues(event.target.value);
//   };
//   const handleTeamMemberChange = (event) => {
//     setTeamMemberValues(event.target.value);
//   };
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [combinedValues, setCombinedValues] = useState([]);
//   const [userData, setUserData] = useState([]);

//   console.log(combinedValues)
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const url = 'http://127.0.0.1:8080/api/auth/users';
//       const response = await fetch(url);
//       const data = await response.json();
//       setUserData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleUserChange = (event, selectedOptions) => {
//     setSelectedUser(selectedOptions);
//     const selectedValues = selectedOptions.map((option) => option.value);
//     setCombinedValues(selectedValues);
//   };
//   const options = userData.map((user) => ({
//     value: user._id,
//     label: user.username,
//   }));
//   useEffect(() => {
//     axios
//       .get('https://restcountries.com/v3.1/all')
//       .then((response) => {
//         const countryData = response.data.map((country) => ({
//           name: country.name.common,
//           code: country.cca2,
//         }));
//         setCountries(countryData);
//       })
//       .catch((error) =>
//         console.error('Error fetching country data:', error)
//       );
//   }, []);
//   const [showContactform, setShowContactForm] = useState(false)
//   const handleCreateContact = () => {
//     setShowContactForm(true)


//   };
//   const [showAlert, setShowAlert] = useState(false);
//   const toggleAlert = () => {
//     setShowAlert(!showAlert);
//   };
//   const handleCloseAlert = () => {
//     setShowAlert(false);
//   };


//   const [phoneNumbers, setPhoneNumbers] = useState([]);


//   const handlePhoneNumberChange = (id, phone) => {
//     setPhoneNumbers((prevPhoneNumbers) =>
//       prevPhoneNumbers.map((item) =>
//         item.id === id ? { ...item, phone } : item
//       )
//     );
//   };

//   const handleAddPhoneNumber = () => {
//     setPhoneNumbers((prevPhoneNumbers) => [
//       ...prevPhoneNumbers,
//       { id: Date.now(), phone: '', isPrimary: false },
//     ]);
//   };

//   const handleDeletePhoneNumber = (id) => {
//     setPhoneNumbers((prevPhoneNumbers) =>
//       prevPhoneNumbers.filter((item) => item.id !== id)
//     );
//   };

//   //for creating multiple forms when click on Add New Contact
//   const [contactCount, setContactCount] = useState(1);
//   const addNewContact = () => {
//     setContactCount(contactCount + 1);
//   };

//   const [selectedTags, setSelectedTags] = useState([]);


//   const handleTagChange = (event) => {
//     const selectedValues = event.target.value;
//     setSelectedTags(selectedValues);

//     // Send selectedValues array to your backend
//     console.log("Selected Values:", selectedValues);
//     // Assuming setCombinedValues is a function to send the values to your backend
//     setCombinedValues(selectedValues);
//   };


//   //Tag FetchData ================
//   const [tags, setTags] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {

//       const url = 'http://127.0.0.1:7500/tags/';

//       const response = await fetch(url);
//       const data = await response.json();
//       setTags(data.tags);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   //  for tags
//   const calculateWidth = (tagName) => {

//     const baseWidth = 10; // base width for each tag
//     const charWidth = 8; // approximate width of each character
//     const padding = 10; // padding on either side
//     return baseWidth + (charWidth * tagName.length) + padding;
//   };


//   const tagsoptions = tags.map((tag) => ({
//     value: tag._id,
//     label: tag.tagName,
//     colour: tag.tagColour,

//     customStyle: {
//       backgroundColor: tag.tagColour,
//       color: "#fff",
//       borderRadius: "8px",
//       alignItems: "center",
//       textAlign: "center",
//       marginBottom: "5px",
//       padding: "2px,8px",
//       fontSize: '10px',
//       width: `${calculateWidth(tag.tagName)}px`,
//       margin: '10px', cursor: 'pointer',
//     },

//     customTagStyle: {
//       backgroundColor: tag.tagColour,
//       color: "#fff",
//       alignItems: "center",
//       textAlign: "center",
//       padding: "2px,8px",
//       fontSize: '10px',
//        cursor: 'pointer',
//     },
//   }));


//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid grey' }}>
//         <Typography variant='h6'>New Account</Typography>
//         <RxCross2 style={{ cursor: 'pointer' }} onClick={handleNewDrawerClose} />
//       </Box>
//       <Box className='account-form' sx={{ height: '90vh', overflowY: 'auto' }}>
//         <Box >
//           <FormControl>
//             <RadioGroup
//               row
//               aria-labelledby="main-radio-buttons-group-label"
//               name="main-radio-buttons-group"
//               value={selectedOption}
//               onChange={handleOptionChange}
//             >
//               <Box className='account-contact-info' >
//                 {activeStep === 'Contact Info' ? (
//                   <>
//                     <CheckCircleRoundedIcon style={{ color: "green" }} />
//                     <ArrowForwardIosRoundedIcon />
//                     <FormControlLabel value="Contact Info" control={<Radio checked />} label="Contact Info" />
//                   </>
//                 ) : (
//                   <>
//                     <FormControlLabel value="Account Info" control={<Radio checked={selectedOption === 'Account Info'} />} label="Account Info" />
//                     <ArrowForwardIosRoundedIcon />
//                     <FormControlLabel value="Contact Info" control={<Radio checked={selectedOption === 'Contact Info'} />} label="Contact Info" />
//                   </>
//                 )}
//               </Box>
//             </RadioGroup>
//           </FormControl>
//         </Box>
//         <Box sx={{ p: 2 }}>
//           {selectedOption === 'Account Info' && (
//             <Box>
//               <FormControl>
//                 <RadioGroup
//                   row
//                   aria-labelledby="account-type-radio-buttons-group-label"
//                   name="account-type-radio-buttons-group"
//                   value={accountType}
//                   onChange={handleAccountTypeChange}
//                 >
//                   <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
//                   <FormControlLabel value="Company" control={<Radio />} label="Company" />
//                 </RadioGroup>
//               </FormControl>
//               {accountType === 'Individual' && (
//                 <Box>
//                   <Box>
//                     <Box className='account-Type-options'>
//                       <Box>
//                         <h3 style={{ margin: "5px" }}>Account Type</h3>
//                       </Box>
//                       <Box className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></Box>
//                       <Box className='MoreVertRoundedIcon'>
//                         <MoreVertRoundedIcon />
//                       </Box>
//                     </Box>

//                     <Box>
//                       <InputLabel sx={{ color: 'black' }}>Account Name</InputLabel>

//                       <TextField
//                         size='small'
//                         fullWidth
//                         placeholder="Account Name" value={accountName}
//                         onChange={(e) => setaccountName(e.target.value)}
//                         margin='normal'
//                       />
//                     </Box>

//                     <Box mt={1}>
//                       <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>
//                       <Autocomplete
//                         multiple
//                         options={tagsoptions}
//                         getOptionLabel={(option) => option.label}
//                         value={selectedTags}
//                         onChange={(event, newValue) => {
//                           setSelectedTags(newValue);
//                         }}
//                         renderTags={(value, getTagProps) =>
//                           value.map((option, index) => (
//                             <Chip
//                               key={option.value}
//                               label={option.label}
//                               style={option.customTagStyle}
//                               {...getTagProps({ index })}
//                             />
//                           ))
//                         }
//                         renderOption={(props, option) => (
//                           <Box component="li" {...props} style={option.customStyle}>
//                             {option.label}
//                           </Box>
//                         )}
//                         renderInput={(params) => (
//                           <TextField {...params} variant="outlined" size="small" placeholder='tags' />
//                         )}
//                         sx={{ width: '100%', marginTop: '8px' }}
//                       />
//                     </Box>
//                     <Box mt={2}>
//                       <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
//                       <Autocomplete
//                         multiple
//                         sx={{ mt: 2 }}
//                         options={options}
//                         size='small'
//                         getOptionLabel={(option) => option.label}
//                         value={selectedUser}
//                         onChange={handleUserChange}
//                         renderInput={(params) => (
//                           <TextField {...params} variant="outlined" placeholder="Assignees" />
//                         )}
//                         isOptionEqualToValue={(option, value) => option.value === value.value}
//                       />

//                     </Box>

//                     <Box mt={2}
//                     >
//                       <InputLabel sx={{ color: 'black' }}>Folder Template</InputLabel>
//                       <Select

//                         value={selectedValue} // Ensure this is a single value, not an array
//                         onChange={handlefolderTempChange}
//                         size='small'
//                         sx={{

//                           width: '100%',
//                           marginTop: '8px'

//                         }}
//                       >
//                         <MenuItem value="" disabled>

//                         </MenuItem>
//                         <MenuItem value={10}>Option 1</MenuItem>
//                         <MenuItem value={20}>Option 2</MenuItem>
//                         <MenuItem value={30}>Option 3</MenuItem>
//                       </Select>

//                     </Box>
//                   </Box>

//                 </Box>
//               )}
//               {accountType === 'Company' && (
//                 <Box>
//                   <form>
//                     <Box>
//                       <Box>
//                         <InputLabel sx={{ color: 'black' }}>Account Name</InputLabel>

//                         <TextField
//                           value={accountName}
//                           onChange={(e) => setaccountName(e.target.value)}
//                           placeholder="Account Name"
//                           fullWidth
//                           size='small'
//                           margin='normal'
//                         />

//                       </Box>

//                       <Box>
//                         <InputLabel sx={{ color: 'black' }}>Company Name</InputLabel>
//                         <TextField
//                           fullWidth
//                           size='small'
//                           margin='normal'
//                           value={companyname}
//                           onChange={(e) => setcompanyname(e.target.value)}
//                           placeholder="Company Name"
//                         />

//                       </Box>

//                       <Box >

//                         <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>

//                         <Autocomplete
//                           multiple
//                           options={tagsoptions}
//                           getOptionLabel={(option) => option.label}
//                           value={selectedTags}
//                           onChange={(event, newValue) => {
//                             setSelectedTags(newValue);
//                           }}
//                           renderTags={(value, getTagProps) =>
//                             value.map((option, index) => (
//                               <Chip
//                                 key={option.value}
//                                 label={option.label}
//                                 style={option.customStyle}
//                                 {...getTagProps({ index })}
//                               />
//                             ))
//                           }
//                           renderOption={(props, option) => (
//                             <Box component="li" {...props} style={option.customStyle}>
//                               {option.label}
//                             </Box>
//                           )}
//                           renderInput={(params) => (
//                             <TextField {...params} variant="outlined" size="small" />
//                           )}
//                           sx={{ width: '100%', marginTop: '8px' }}
//                         />

//                       </Box>


//                       <Box mt={2}>
//                         <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>

//                         <Autocomplete
//                           multiple
//                           sx={{ mt: 2 }}
//                           options={options}
//                           size='small'
//                           getOptionLabel={(option) => option.label}
//                           value={selectedUser}
//                           onChange={handleUserChange}
//                           renderInput={(params) => (
//                             <TextField {...params} variant="outlined" placeholder="Assignees" />
//                           )}
//                           isOptionEqualToValue={(option, value) => option.value === value.value}
//                         />

//                       </Box>




//                       <Box mt={2}>
//                         <InputLabel sx={{ color: 'black' }}>Folder Template</InputLabel>

//                         <Select

//                           value={selectedValue} // Ensure this is a single value, not an array
//                           onChange={handlefolderTempChange}
//                           size='small'
//                           sx={{

//                             width: '100%',
//                             marginTop: '8px'

//                           }}
//                         >
//                           <MenuItem value="" disabled>

//                           </MenuItem>
//                           <MenuItem value={10}>Option 1</MenuItem>
//                           <MenuItem value={20}>Option 2</MenuItem>
//                           <MenuItem value={30}>Option 3</MenuItem>
//                         </Select>
//                       </Box>

//                     </Box>

//                     <>
//                       <Typography variant="h6" gutterBottom mt={3}>
//                         Address
//                       </Typography>
//                       <Box

//                       >

//                         <InputLabel sx={{ color: 'black' }}>Country</InputLabel>

//                         <Select
//                           size='small'
//                           value={country}
//                           onChange={(e) => setcountry(e.target.value)}
//                           sx={{
//                             marginTop: '8px',
//                             width: '100%',

//                           }}
//                         >
//                           {countries.map((country) => (
//                             <MenuItem key={country.code} value={country.code}>
//                               {country.name}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </Box>
//                       <Box>
//                         <InputLabel sx={{ color: 'black', mt: 2 }}>Street address</InputLabel>
//                         <TextField placeholder="Street address"
//                           value={streetAddress}
//                           onChange={(e) => setstreetAddress(e.target.value)} size='small' fullWidth margin='normal' />

//                       </Box>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           flexDirection: isSmallScreen
//                             ? 'column'
//                             : 'row',
//                           gap: isSmallScreen ? 2 : 5,
//                           mt: 2
//                         }}
//                       >
//                         <Box>

//                           <InputLabel sx={{ color: 'black' }}>City</InputLabel>

//                           <TextField
//                             fullWidth
//                             margin="normal"
//                             name="city"
//                             value={city}
//                             onChange={(e) => setcity(e.target.value)}
//                             placeholder="City"
//                             size="small"
//                           />
//                         </Box>
//                         <Box>

//                           <InputLabel sx={{ color: 'black' }}>State/Province</InputLabel>

//                           <TextField
//                             margin="normal"
//                             name="state"
//                             fullWidth
//                             value={state}
//                             onChange={(e) => setstate(e.target.value)}
//                             placeholder="State/Province"
//                             size="small"
//                           />
//                         </Box>
//                         <Box>

//                           <InputLabel sx={{ color: 'black' }}>ZIP/Postal Code</InputLabel>

//                           <TextField
//                             margin="normal"
//                             fullWidth
//                             name="postalCode"
//                             value={postalCode}
//                             onChange={(e) =>
//                               setpostalCode(e.target.value)
//                             }
//                             placeholder="ZIP/Postal Code"
//                             size="small"
//                           />
//                         </Box>
//                       </Box>
//                     </>
//                   </form>

//                 </Box>
//               )}
//               <Button type="submit"
//                 variant="contained"
//                 color="primary" onClick={() => handleOptionChange(null, 'Contact Info')} sx={{ borderRadius: '10px', mt: 3 }}>Continue</Button>
//             </Box>
//           )}
//         </Box>
//         {selectedOption === 'Contact Info' && (
//           <Box>
//             <>
//               {!showContactform && (
//                 <Box className='contactForm'>
//                   <Box className='create_new_contact-container'>
//                     <Box>
//                       <h3 style={{ marginLeft: "20px" }}>Contacts</h3>
//                     </Box>
//                     <Box className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></Box>
//                   </Box>

//                   <Box className='link-addContact-container'>
//                     <BiSolidContact style={{ fontSize: '85px' }} />
//                     <span style={{ fontSize: '20px', marginTop: '10px' }}><b>No linked contacts </b></span>
//                     <span style={{ fontSize: '16px', marginTop: '10px', color: '#8895a5', }}>Link existing contact or add new contact to finish creating the account</span>

//                     <Box className='link-addContact'>

//                       <span className='Link-existing-contact'>
//                         <p><AddCircleOutlineIcon /></p>
//                         <p onClick={toggleAlert}>Link existing contact </p>
//                       </span>

//                       <span className='add-new-Contact'>
//                         <p><AddCircleOutlineIcon /></p>
//                         <p onClick={handleCreateContact} >Add new contact</p>
//                       </span>
//                     </Box>
//                   </Box>
//                   {showAlert && (
//                     <Box className="linkContact-overlay">
//                       <Box className="linkContact-overlay-container">
//                         <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                           <h3>Link existing contacts</h3>
//                           <Box>
//                             <CloseIcon style={{ cursor: 'pointer', marginTop: '10px' }} onClick={handleCloseAlert} />
//                           </Box>
//                         </Box>
//                         <hr />
//                         <span>Search for existing contact by entering their name, phone number or email. If contact is not in your CRM, click Cancel and create one on the prior page.</span>

//                         <Box >
//                           <InputLabel >Search for Contact</InputLabel>
//                         </Box>
//                         <Select
//                           labelId="demo-multi-select-label"
//                           id="demo-multi-select"
//                           // multiple
//                           value={selectedValues}
//                           onChange={handleChange}
//                           sx={{
//                             border: '2px solid #cbd5e1',
//                             borderRadius: '8px',
//                             //margin: '20px',
//                             width: '100%',
//                             '& ': {
//                               // padding: '10px',
//                             },
//                           }}

//                         >
//                           <MenuItem disabled value="">
//                             <em>Select Options</em>
//                           </MenuItem>
//                           <MenuItem value={10}>Option 1</MenuItem>
//                           <MenuItem value={20}>Option 2</MenuItem>
//                           <MenuItem value={30}>Option 3</MenuItem>
//                         </Select>

//                         <Box style={{ marginTop: '20px' }} className='overlay-btn-container'>
//                           <button>Add</button>
//                           <button onClick={handleCloseAlert}>Cancel</button>
//                         </Box>

//                       </Box>
//                     </Box>
//                   )}
//                 </Box>)}
//               <Box>
//                 {showContactform && (
//                   <>
//                     <Box className='create_new_contactform-container'>
//                       <Box>
//                         <h3 style={{ marginLeft: "20px" }}>Contacts</h3>
//                       </Box>
//                       <Box className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></Box>
//                     </Box>
//                     {[...Array(contactCount)].map((_, index) => (
//                       <Box style={{ border: "1px solid #e2e8f0", margin: '15px', borderRadius: '8px', height: "55vh", overflowY: 'auto', padding: '15px' }} className='create_new_contactform'>
//                         <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>
//                           Contact {index + 1}
//                         </Typography>
//                         <Box >
//                           <form >
//                             <Box
//                               sx={{
//                                 display: 'flex',
//                                 flexDirection: isSmallScreen ? 'column' : 'row',
//                                 gap: isSmallScreen ? 2 : 5,
//                                 padding: '1px 5px 0 5px',

//                               }}
//                             >
//                               <Box>
//                                 <InputLabel sx={{ color: 'black' }}>First name</InputLabel>
//                                 <TextField
//                                   margin="normal"
//                                   fullWidth
//                                   name="firstName"

//                                   placeholder="First Name"
//                                   size="small"
//                                 />
//                               </Box>
//                               <Box>
//                                 <InputLabel sx={{ color: 'black' }}>Middle Name</InputLabel>
//                                 <TextField
//                                   margin="normal"
//                                   fullWidth
//                                   name="middleName"

//                                   placeholder="Middle Name"
//                                   size="small"
//                                 />

//                               </Box>
//                               <Box>
//                                 <InputLabel sx={{ color: 'black' }}>Last Name</InputLabel>
//                                 <TextField
//                                   fullWidth
//                                   name="lastName"
//                                   margin="normal"
//                                   placeholder="Last name"
//                                   size="small"
//                                 />

//                               </Box>
//                             </Box>
//                             <Box >


//                               <InputLabel sx={{ color: 'black' }}>Contact Name</InputLabel>

//                               <TextField
//                                 name="contactName"

//                                 fullWidth
//                                 placeholder="Contact Name"
//                                 margin="normal"

//                                 size="small"
//                               />

//                             </Box>
//                             <Box >

//                               <InputLabel sx={{ color: 'black' }}>Company Name</InputLabel>

//                               <TextField
//                                 fullWidth
//                                 name="companyName"

//                                 margin="normal"
//                                 placeholder="Company Name"
//                                 size="small"
//                               />
//                             </Box>
//                             <Box >

//                               <InputLabel sx={{ color: 'black' }}>Note</InputLabel>

//                               <TextField
//                                 fullWidth
//                                 name="note"

//                                 margin="normal"
//                                 placeholder="Note"
//                                 size="small"
//                               />
//                             </Box>
//                             <Box >

//                               <InputLabel sx={{ color: 'black' }}>SSN</InputLabel>

//                               <TextField
//                                 fullWidth
//                                 name="ssn"

//                                 margin="normal"
//                                 placeholder="SSN"
//                                 size="small"
//                               />
//                             </Box>
//                             <Box >

//                               <InputLabel sx={{ color: 'black' }}>Email</InputLabel>

//                               <TextField
//                                 fullWidth
//                                 name="email"

//                                 margin="normal"
//                                 placeholder="Email"
//                                 size="small"
//                               />
//                             </Box>
//                             <Box >

//                               <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>
//                               <Select

//                                 size="small"
//                                 multiple
//                                 value={selectedTags}
//                                 onChange={handleTagChange}
//                                 sx={{ width: '100%', marginTop: '8px' }}
//                                 renderValue={(selected) => (
//                                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                     {selected.map((value) => {
//                                       const option = tagsoptions.find(opt => opt.value === value);
//                                       return (
//                                         <Chip
//                                           key={value}
//                                           label={option.label}
//                                           style={option.customStyle}
//                                         />
//                                       );
//                                     })}
//                                   </Box>
//                                 )}
//                               >
//                                 {tagsoptions.map((option) => (
//                                   <MenuItem key={option.value} value={option.value} style={option.customStyle}>
//                                     {option.label}
//                                   </MenuItem>
//                                 ))}
//                               </Select>

//                             </Box>
//                             <Typography variant="h6" gutterBottom sx={{ ml: 1, fontWeight: 'bold', mt: 3 }}>
//                               Phone Numbers
//                             </Typography>
//                             {phoneNumbers.map((phone) => (
//                               <Box
//                                 key={phone.id}
//                                 sx={{
//                                   display: 'flex',
//                                   flexDirection: 'row',
//                                   alignItems: 'center',
//                                   gap: 2,
//                                   ml: 1,
//                                   mb: 2,
//                                 }}
//                               >
//                                 {phone.isPrimary && (
//                                   <Chip
//                                     label="Primary phone"
//                                     color="primary"
//                                     size="small"
//                                     sx={{ position: 'absolute', mt: -3 }}
//                                   />
//                                 )}
//                                 <PhoneInput
//                                   country={'us'}
//                                   value={phone.phone}
//                                   onChange={(phoneValue) =>
//                                     handlePhoneNumberChange(phone.id, phoneValue)
//                                   }
//                                   inputStyle={{
//                                     width: '100%',
//                                   }}
//                                   buttonStyle={{
//                                     borderTopLeftRadius: '8px',
//                                     borderBottomLeftRadius: '8px',
//                                   }}
//                                   containerStyle={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '8px',
//                                   }}
//                                 />
//                                 <AiOutlineDelete
//                                   onClick={() => handleDeletePhoneNumber(phone.id)}
//                                   style={{ cursor: 'pointer', color: 'red' }}
//                                 />
//                               </Box>
//                             ))}


//                             <Box
//                               sx={{
//                                 display: 'flex',
//                                 gap: 2,
//                                 alignItems: isSmallScreen ? 'center' : 'flex-start',
//                                 ml: 1,
//                                 cursor: 'pointer',
//                                 color: 'blue',
//                                 fontWeight: 600,
//                               }}
//                               onClick={handleAddPhoneNumber}
//                             >
//                               <AiOutlinePlusCircle style={{ marginTop: '20px' }} />
//                               <p>Add phone number</p>
//                             </Box>
//                             <Typography variant="h6" gutterBottom sx={{ ml: 1, fontWeight: 'bold', mt: 3 }}>
//                               Address
//                             </Typography>
//                             <Box>

//                               <InputLabel sx={{ color: 'black' }}>Country</InputLabel>
//                               <Select
//                                 size='small'
//                                 value={selectedCountry}
//                                 onChange={handleCountryChange}
//                                 sx={{

//                                   width: '100%',
//                                   marginTop: '8px'
//                                 }}
//                               >
//                                 {countries.map((country) => (
//                                   <MenuItem key={country.code} value={country.code}>
//                                     {country.name}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </Box>
//                             <Box>

//                               <InputLabel sx={{ color: 'black', mt: 2 }}>Street address</InputLabel>

//                               <TextField
//                                 fullWidth
//                                 name="streetAddress"

//                                 margin="normal"
//                                 placeholder="Street address"
//                                 size="small"
//                               />
//                             </Box>
//                             <Box
//                               sx={{
//                                 display: 'flex',
//                                 flexDirection: isSmallScreen
//                                   ? 'column'
//                                   : 'row',
//                                 gap: isSmallScreen ? 2 : 5,
//                                 mt: 2
//                               }}
//                             >
//                               <Box>

//                                 <InputLabel sx={{ color: 'black' }}>City</InputLabel>

//                                 <TextField
//                                   fullWidth
//                                   margin="normal"
//                                   name="city"

//                                   placeholder="City"
//                                   size="small"
//                                 />
//                               </Box>
//                               <Box>

//                                 <InputLabel sx={{ color: 'black' }}>State/Province</InputLabel>

//                                 <TextField
//                                   margin="normal"
//                                   name="state"
//                                   fullWidth

//                                   placeholder="State/Province"
//                                   size="small"
//                                 />
//                               </Box>
//                               <Box>

//                                 <InputLabel sx={{ color: 'black' }}>ZIP/Postal Code</InputLabel>

//                                 <TextField
//                                   margin="normal"
//                                   fullWidth
//                                   name="postalCode"

//                                   placeholder="ZIP/Postal Code"
//                                   size="small"
//                                 />
//                               </Box>
//                             </Box>
//                           </form>
//                         </Box>
//                       </Box>
//                     ))}
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         gap: 2,
//                         alignItems: 'center',
//                         ml: 1,
//                         cursor: 'pointer',
//                         color: '#1976d3',
//                         fontWeight: 600,
//                         marginLeft: '20px'
//                       }}

//                     >
//                       <AiOutlinePlusCircle />
//                       <p onClick={addNewContact}>Add New Contact</p>
//                     </Box>
//                     <hr />
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         gap: 4,
//                         padding: '1px 5px 0 5px',
//                       }}
//                     >
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"

//                         sx={{
//                           mt: 2,
//                           ml: 3,
//                           borderRadius: '10px',
//                         }}
//                       >
//                         Create
//                       </Button>
//                       <Button
//                         type="button"
//                         variant="outlined"
//                         color="primary"
//                         onClick={handleNewDrawerClose}
//                         sx={{
//                           mt: 2,

//                           borderRadius: '10px',
//                         }}

//                       >
//                         Cancel
//                       </Button>
//                     </Box>

//                   </>
//                 )}

//               </Box>
//             </>

//           </Box>
//         )}
//       </Box>
//     </Box >
//   );
// }

// export default AccountForm;



import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Select, Chip, MenuItem, TextField, useMediaQuery, Autocomplete, } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React, { useState, useEffect } from 'react';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import { InputLabel, } from '@mui/material';
import './contact.css'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
const AccountForm = ({ handleNewDrawerClose, handleDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedOption, setSelectedOption] = useState("Account Info");
  const [accountType, setAccountType] = useState("Individual");
  const [accountName, setaccountName] = useState('');
  const [companyname, setcompanyname] = useState('')
  const [cCountry, SetCCountry] = useState("");
  const [countries, setCountries] = useState([]);

  // const [state, setstate] = useState('')
  const [cStreetAddress, SetCStreetAddress] = useState("");
  const [cStateProvince, SetCStateProvince] = useState("");
  const [cZipPostalCode, SetCZipPostalCode] = useState("");
  const [activeStep, setActiveStep] = useState("Account Info");


  const handleOptionChange = (event, value) => {
    setSelectedOption(value || event.target.value);
    setActiveStep(value || event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const [selectedUser, setSelectedUser] = useState([]);
  const [combinedTeamMemberValues, setCombinedTeamMemberValues] = useState([]);
  const [userData, setUserData] = useState([]);

  // console.log(combinedValues)
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const url = 'http://127.0.0.1:8080/api/auth/users';
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedTeamMemberValues(selectedValues);
  };
  const options = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));
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





  const [selectedTags, setSelectedTags] = useState([]);

  const [combinedValues, setCombinedValues] = useState([]);
  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue.map((option) => option.value));

    // Send selectedValues array to your backend
    console.log("Selected Values:", newValue.map((option) => option.value));
    // Assuming setCombinedValues is a function to send the values to your backend
    setCombinedValues(newValue.map((option) => option.value));
};

//Tag FetchData ================
const [tags, setTags] = useState([]);
useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {

        const url = 'http://127.0.0.1:7500/tags/';

        const response = await fetch(url);
        const data = await response.json();
        setTags(data.tags);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
//  for tags
const calculateWidth = (tagName) => {

    const baseWidth = 10; // base width for each tag
    const charWidth = 8; // approximate width of each character
    const padding = 10; // padding on either side
    return baseWidth + (charWidth * tagName.length) + padding;
};


const tagsOptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
        backgroundColor: tag.tagColour,
        color: "#fff",
        borderRadius: "8px",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "5px",
        padding: "2px,8px",
        fontSize: '10px',
        width: `${calculateWidth(tag.tagName)}px`,
        margin: '7px'
    },
    customTagStyle: {
        backgroundColor: tag.tagColour,
        color: "#fff",
        alignItems: "center",
        textAlign: "center",
        padding: "2px,8px",
        fontSize: '10px',
        cursor: 'pointer',
    },
}));


  // create account
  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");




    if (accountType === "Individual") {
      const raw = JSON.stringify({
        clientType: accountType,
        accountName: accountName,
        tags: combinedValues,
        teamMember: combinedTeamMemberValues,

      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = 'http://127.0.0.1:7000/accounts/accountdetails';
      fetch(url, requestOptions)
        .then((response) => response.json())

        .then((result) => {
          console.log(result); // Log the result
          toast.success("Form submitted successfully"); // Display success toast
          // window.location.reload();
          handleDrawerClose();
          handleNewDrawerClose();
          navigate('/clients/accounts');
        })
        .catch((error) => {
          console.error(error); // Log the error
          toast.error("An error occurred while submitting the form"); // Display error toast
        });
    } else if (accountType === "Company") {
      const raw = JSON.stringify({
        clientType: accountType,
        accountName: accountName,
        tags: combinedValues,
        teamMember: combinedTeamMemberValues,


        companyName: companyname,
        country: cCountry,
        streetAddress: cStreetAddress,
        state: cStateProvince,
        postalCode: cZipPostalCode,

      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = 'http://127.0.0.1:7000/accounts/accountdetails';
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result); // Log the result
          toast.success("Form submitted successfully"); // Display success toast
          // window.location.reload();
          handleDrawerClose();
          handleNewDrawerClose();
        })
        .catch((error) => {
          console.error(error); // Log the error
          toast.error("An error occurred while submitting the form"); // Display error toast
        });
    }

    //todo contact
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid grey' }}>
        <Typography variant='h6'>New Account</Typography>
        <RxCross2 style={{ cursor: 'pointer' }} onClick={handleNewDrawerClose} />
      </Box>
      <Box className='account-form' sx={{ height: '90vh', overflowY: 'auto' }}>
        <Box >
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="main-radio-buttons-group-label"
              name="main-radio-buttons-group"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <Box className='account-contact-info' >
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
              </Box>
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
                    <Box className='account-Type-options'>
                      <Box>
                        <h3 style={{ margin: "5px" }}>Account Type</h3>
                      </Box>
                      <Box className='HelpOutlineRoundedIcon'><HelpOutlineRoundedIcon /></Box>
                      <Box className='MoreVertRoundedIcon'>
                        <MoreVertRoundedIcon />
                      </Box>
                    </Box>

                    <Box>
                      <InputLabel sx={{ color: 'black' }}>Account Name</InputLabel>

                      <TextField
                        size='small'
                        fullWidth
                        placeholder="Account Name" value={accountName}
                        onChange={(e) => setaccountName(e.target.value)}
                        margin='normal'
                      />
                    </Box>

                    <Box >

                      <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>

                      <Autocomplete
                        multiple
                        size='small'
                        id="tags-outlined"
                        options={tagsOptions}
                        getOptionLabel={(option) => option.label}
                        value={tagsOptions.filter(option => selectedTags.includes(option.value))}
                        onChange={handleTagChange}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    key={option.value}
                                    label={option.label}
                                    style={option.customTagStyle}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"

                                placeholder="Tags"
                                sx={{ width: '100%', marginTop: '8px' }}
                            />
                        )}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} style={option.customStyle}>
                                {option.label}
                            </Box>
                        )}
                    />


                    </Box>

                    <Box mt={2}>
                      <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
                      <Autocomplete
                        multiple
                        sx={{ mt: 2 }}
                        options={options}
                        size='small'
                        getOptionLabel={(option) => option.label}
                        value={selectedUser}
                        onChange={handleUserChange}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Assignees" />
                        )}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                      />

                    </Box>


                  </Box>

                </Box>
              )}
              {accountType === 'Company' && (
                <Box>
                  <form>
                    <Box>
                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Account Name</InputLabel>

                        <TextField
                          value={accountName}
                          onChange={(e) => setaccountName(e.target.value)}
                          placeholder="Account Name"
                          fullWidth
                          size='small'
                          margin='normal'
                        />

                      </Box>

                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Company Name</InputLabel>
                        <TextField
                          fullWidth
                          size='small'
                          margin='normal'
                          value={companyname}
                          onChange={(e) => setcompanyname(e.target.value)}
                          placeholder="Company Name"
                        />

                      </Box>

                      <Box >

                        <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>

                        <Autocomplete
                          multiple
                          options={tagsOptions}
                          getOptionLabel={(option) => option.label}
                          // value={selectedTags}
                          value={tagsOptions.filter(option => selectedTags.includes(option.value))}
                        onChange={handleTagChange}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={option.value}
                                label={option.label}
                                style={option.customStyle}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderOption={(props, option) => (
                            <Box component="li" {...props} style={option.customStyle}>
                              {option.label}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" size="small" />
                          )}
                          sx={{ width: '100%', marginTop: '8px' }}
                        />

                      </Box>


                      <Box mt={2}>
                        <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>

                        <Autocomplete
                          multiple
                          sx={{ mt: 2 }}
                          options={options}
                          size='small'
                          getOptionLabel={(option) => option.label}
                          value={selectedUser}
                          onChange={handleUserChange}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Assignees" />
                          )}
                          isOptionEqualToValue={(option, value) => option.value === value.value}
                        />
                      </Box>
                    </Box>

                    <>
                      <Typography variant="h6" gutterBottom mt={3}>
                        Address
                      </Typography>
                      <Box

                      >

                        <InputLabel sx={{ color: 'black' }}>Country</InputLabel>

                        <Select
                          size='small'
                          value={cCountry}
                          onChange={(e) => SetCCountry(e.target.value)}
                          sx={{
                            marginTop: '8px',
                            width: '100%',

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
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Street address</InputLabel>
                        <TextField placeholder="Street address"
                          onChange={(e) => SetCStreetAddress(e.target.value)} size='small' fullWidth margin='normal' />

                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: isSmallScreen
                            ? 'column'
                            : 'row',
                          gap: isSmallScreen ? 2 : 5,
                          mt: 2
                        }}
                      >
                        {/* <Box>

                          <InputLabel sx={{ color: 'black' }}>City</InputLabel>

                          <TextField
                            fullWidth
                            margin="normal"
                            name="city"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                            placeholder="City"
                            size="small"
                          />
                        </Box> */}
                        <Box>

                          <InputLabel sx={{ color: 'black' }}>State/Province</InputLabel>

                          <TextField
                            margin="normal"
                            name="state"
                            fullWidth

                            onChange={(e) => SetCStateProvince(e.target.value)}
                            placeholder="State/Province"
                            size="small"
                          />
                        </Box>
                        <Box>

                          <InputLabel sx={{ color: 'black' }}>ZIP/Postal Code</InputLabel>

                          <TextField
                            margin="normal"
                            fullWidth
                            name="postalCode"
                            onChange={(e) => SetCZipPostalCode(e.target.value)}
                            placeholder="ZIP/Postal Code"
                            size="small"
                          />
                        </Box>
                      </Box>
                    </>
                  </form>

                </Box>
              )}
              <Button type="submit"
                variant="contained"
                color="primary" sx={{ borderRadius: '10px', mt: 3 }} onClick={handleSubmit}>Continue</Button>
            </Box>
          )}
        </Box>


      </Box>
    </Box >
  );
}

export default AccountForm;
