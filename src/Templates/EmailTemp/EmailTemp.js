// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import {
//     Box,
//     Button,
//     Typography,
//     Container,
//     Table,
//     TableContainer,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Paper,
//     Radio,
//     FormControlLabel,
//     RadioGroup,
//     FormControl,
//     List,
//     ListItem,
//     ListItemText,
//     Popover,
//     TextField,
//     Autocomplete,
//     Menu, MenuItem, IconButton
// } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import EditorShortcodes from '../Texteditor/EditorShortcodes';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// const EmailTemp = () => {
//     const navigate = useNavigate();
//     const [showForm, setShowForm] = useState(false);
//     const [inputText, setInputText] = useState('');
//     const [selectedShortcut, setSelectedShortcut] = useState('');
//     const [templateName, setTemplateName] = useState('');
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [shortcuts, setShortcuts] = useState([]);
//     const [filteredShortcuts, setFilteredShortcuts] = useState([]);
//     const [selectedOption, setSelectedOption] = useState('contacts');

//     const [anchorEl, setAnchorEl] = useState(null);
//     const handleCreateTemplate = () => {
//         setShowForm(true); // Show the form when button is clicked
//     };

//     const handleChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     const toggleDropdown = (event) => {
//         setAnchorEl(event.currentTarget);
//         setShowDropdown(!showDropdown);
//     };

//     const handleAddShortcut = (shortcut) => {
//         setInputText((prevText) => prevText + `[${shortcut}]`);
//         setShowDropdown(false);
//     };

//     useEffect(() => {
//         // Simulate filtered shortcuts based on some logic (e.g., search)
//         setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
//     }, [shortcuts]);

//     useEffect(() => {
//         // Set shortcuts based on selected option
//         if (selectedOption === 'contacts') {
//             const contactShortcuts = [
//                 { title: 'Account Shortcodes', isBold: true },
//                 { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
//                 { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
//                 { title: 'Contact Shortcodes', isBold: true, },
//                 { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
//                 { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
//                 { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
//                 { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
//                 { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
//                 { title: 'Country', isBold: false, value: 'COUNTRY' },
//                 { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
//                 { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
//                 { title: 'City', isBold: false, value: 'CITY' },
//                 { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
//                 { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
//                 { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
//                 { title: 'Date Shortcodes', isBold: true },
//                 { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
//                 { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
//                 { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
//                 { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
//                 { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
//                 { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
//                 { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
//                 { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
//                 { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
//                 { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
//                 { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
//                 { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
//                 { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
//                 { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
//                 { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
//                 { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
//                 { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
//                 { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
//                 { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
//                 { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
//                 { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
//                 { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
//                 { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
//                 { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
//             ];
//             setShortcuts(contactShortcuts);
//         } else if (selectedOption === 'account') {
//             const accountShortcuts = [
//                 { title: 'Account Shortcodes', isBold: true },
//                 { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
//                 { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
//                 { title: 'Date Shortcodes', isBold: true },
//                 { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
//                 { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
//                 { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
//                 { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
//                 { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
//                 { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
//                 { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
//                 { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
//                 { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
//                 { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
//                 { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
//                 { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
//                 { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
//                 { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
//                 { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
//                 { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
//                 { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
//                 { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
//                 { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
//                 { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
//                 { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
//                 { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
//                 { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
//                 { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
//             ];
//             setShortcuts(accountShortcuts);
//         }
//     }, [selectedOption]);
//     const handlechatsubject = (e) => {
//         const { value } = e.target;
//         setInputText(value);
//     };
//     const handleCloseDropdown = () => {
//         setAnchorEl(null);
//     };


//     const [selecteduser, setSelectedUser] = useState('');

//     const [userData, setUserData] = useState([]);


//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const url = 'http://127.0.0.1:8080/api/auth/users';
//             const response = await fetch(url);
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const handleuserChange = (event, selectedOptions) => {
//         setSelectedUser(selectedOptions);

//     };
//     const options = userData.map((user) => ({
//         value: user._id,
//         label: user.username,
//     }));
//     const handleSaveTemplate = (e) => {
//         e.preventDefault();

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({
//             templatename: templateName,
//             from: selecteduser.value,
//             emailsubject: inputText,

//             emailbody: emailBody,
//         });

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };
//         const url = 'http://127.0.0.1:7500/workflow/emailtemplate';
//         fetch(url, requestOptions)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((result) => {
//                 toast.success('Email Template create successfully');
//                 handleClearTemplate();
//                 setShowForm(false);
//                 fetchEmailTemplates();
//             })
//             .catch((error) => {
//                 console.error(error);
//                 toast.error('Failed to create Email Template');
//             });
//     }
//     const [emailBody, setEmailBody] = useState('');

//     const handleEditorChange = (content) => {
//         setEmailBody(content);
//     };
//     const handleClearTemplate = () => {
//         setTemplateName('');
//         setSelectedUser('');
//         setInputText('');
//         setEmailBody('');

//     }
//     const [emailTemplates, setEmailTemplates] = useState([]);
//     const fetchEmailTemplates = async () => {
//         try {
//             const url = 'http://127.0.0.1:7500/workflow/emailtemplate';
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch email templates');
//             }
//             const data = await response.json();

//             setEmailTemplates(data.emailTemplate);

//         } catch (error) {
//             console.error('Error fetching email templates:', error);

//         }
//     };

//     useEffect(() => {
//         fetchEmailTemplates();
//     }, []);


//     const open = Boolean(anchorEl);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const handleEdit = (_id) => {

//         navigate("emailTempUpdate/" + _id);
//     };
//     const handleDelete = (_id) => {
//         console.log(_id);

//         const requestOptions = {
//             method: 'DELETE',
//             redirect: 'follow',
//         };
//         // Fetch URL with environment variable
//         const url = 'http://127.0.0.1:7500/workflow/emailtemplate/';
//         fetch(url + _id, requestOptions)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to delete item');
//                 }
//                 return response.text();
//             })
//             .then((result) => {
//                 console.log(result);
//                 toast.success('Data deleted successfully');
//                 fetchEmailTemplates();
//             })
//             .catch((error) => {
//                 console.error(error);
//             })
      
//     };
//     return (
//         <Container>
//             {!showForm ? (
//                 <Box sx={{ mt: 2 }}>
//                     <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
//                         Create Template
//                     </Button>
//                     <TableContainer component={Paper} sx={{ mt: 2 }}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Name</TableCell>
//                                     <TableCell>Subject</TableCell>
//                                     <TableCell>Used in Pipelines</TableCell>
//                                     <TableCell>Settings</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>

//                                 {emailTemplates.map((template) => (
//                                     <TableRow key={template._id}>
//                                         <TableCell>{template.templatename}</TableCell>
//                                         <TableCell>{template.emailsubject}</TableCell>
//                                         <TableCell>{/* Add logic for "Used in Pipelines" */}</TableCell>
//                                         <TableCell>

//                                             <IconButton
//                                                 aria-controls={open ? 'pipeline-menu' : undefined}
//                                                 aria-haspopup="true"
//                                                 onClick={handleClick}
//                                             >
//                                                 <MoreVertIcon fontSize="small" />
//                                             </IconButton>
//                                             <Menu
//                                                 id="pipeline-menu"
//                                                 anchorEl={anchorEl}
//                                                 open={open}
//                                                 onClose={handleClose}
//                                                 sx={{ ml: 3 }}
//                                             >
//                                                 <MenuItem onClick={() => { handleEdit(template._id); handleClose(); }}>
//                                                     Edit
//                                                 </MenuItem>
//                                                 <MenuItem onClick={() => { handleDelete(template._id); handleClose(); }}>
//                                                     Delete
//                                                 </MenuItem>
//                                             </Menu>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             ) : (
//                 <Box
//                     sx={{
//                         mt: 2,

//                     }}
//                 >
//                     <Typography variant="h6" gutterBottom>
//                         Create Email Template
//                     </Typography>
//                     <form onSubmit={handleSaveTemplate}>
//                         <Box>

//                             <label className='email-input-label'>Template Name</label>

//                             <TextField
//                                 sx={{ background: '#fff' }}
//                                 margin="normal"
//                                 fullWidth
//                                 name="templateName"
//                                 value={templateName}
//                                 onChange={(e) => setTemplateName(e.target.value)}
//                                 placeholder="Template Name"
//                                 size="small"
//                             />
//                         </Box>
//                         <Box>
//                             <Typography variant="h6" gutterBottom>
//                                 Mode
//                             </Typography>
//                             <FormControl>
//                                 <RadioGroup
//                                     aria-labelledby="demo-controlled-radio-buttons-group"
//                                     name="controlled-radio-buttons-group"
//                                     value={selectedOption}
//                                     onChange={handleChange}

//                                 >
//                                     <FormControlLabel
//                                         value="contacts"
//                                         control={<Radio sx={{ color: '#ADD8E6' }} />}
//                                         label="Contact Shortcodes"

//                                     />
//                                     <FormControlLabel
//                                         value="account"
//                                         control={<Radio sx={{ color: '#ADD8E6' }} />}
//                                         label="Account Shortcodes"
//                                     />
//                                 </RadioGroup>
//                             </FormControl>
//                         </Box>
//                         <Box>


//                             <label className='email-input-label'>From</label>


//                             <Autocomplete

//                                 options={options}
//                                 sx={{ mt: 2, mb: 2, backgroundColor: '#fff' }}
//                                 size='small'
//                                 value={selecteduser}
//                                 onChange={handleuserChange}
//                                 isOptionEqualToValue={(option, value) => option.value === value.value}
//                                 getOptionLabel={(option) => option.label || ""}
//                                 renderInput={(params) => (
//                                     <TextField
//                                         {...params}

//                                         placeholder="Form"
//                                     />
//                                 )}
//                                 isClearable={true}

//                             />

//                         </Box>
//                         <Box>

//                             <label className='email-input-label'>Subject</label>

//                             <TextField
//                                 margin="normal"
//                                 fullWidth
//                                 name="subject"
//                                 value={inputText + selectedShortcut} onChange={handlechatsubject}
//                                 placeholder="Subject"
//                                 size="small"
//                                 sx={{ background: '#fff' }}
//                             />
//                         </Box>
//                         <Box>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={toggleDropdown}
//                                 sx={{ mt: 2 }}
//                             >
//                                 Add Shortcode
//                             </Button>

//                             <Popover
//                                 open={showDropdown}
//                                 anchorEl={anchorEl}
//                                 onClose={handleCloseDropdown}
//                                 anchorOrigin={{
//                                     vertical: 'bottom',
//                                     horizontal: 'left',
//                                 }}
//                                 transformOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'left',
//                                 }}
//                             >
//                                 <Box >
//                                     <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
//                                         {filteredShortcuts.map((shortcut, index) => (
//                                             <ListItem
//                                                 key={index}
//                                                 onClick={() => handleAddShortcut(shortcut.value)}
//                                             >
//                                                 <ListItemText
//                                                     primary={shortcut.title}
//                                                     primaryTypographyProps={{
//                                                         style: {
//                                                             fontWeight: shortcut.isBold ? 'bold' : 'normal',
//                                                         },
//                                                     }}
//                                                 />
//                                             </ListItem>
//                                         ))}
//                                     </List>
//                                 </Box>
//                             </Popover>
//                         </Box>
//                         <Box sx={{ mt: 5 }}>

//                             <EditorShortcodes onChange={handleEditorChange} />
//                         </Box>
//                         <Box sx={{ mt: 5 }}>
//                             <Button variant="contained" color="primary" type="submit">
//                                 Save Template
//                             </Button>
//                         </Box>
//                     </form>
//                 </Box>
//             )}
//         </Container>
//     );
// };

// export default EmailTemp;




import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Typography,
    Container,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
    List,
    ListItem,
    ListItemText,
    Popover,
    TextField,
    Autocomplete,
    MenuItem,Menu
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import EditorShortcodes from '../Texteditor/EditorShortcodes';
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
const EmailTemp = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [shortcuts, setShortcuts] = useState([]);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const openMenu = Boolean(menuAnchorEl);
    const handleCreateTemplate = () => {
        setShowForm(true); // Show the form when button is clicked
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
    };

    const handleAddShortcut = (shortcut) => {
        setInputText((prevText) => prevText + `[${shortcut}]`);
        setShowDropdown(false);
    };

    useEffect(() => {
        // Simulate filtered shortcuts based on some logic (e.g., search)
        setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
    }, [shortcuts]);

    useEffect(() => {
        // Set shortcuts based on selected option
        if (selectedOption === 'contacts') {
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true, },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
                { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            const accountShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);
    const handlechatsubject = (e) => {
        const { value } = e.target;
        setInputText(value);
    };
    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };


    const [selecteduser, setSelectedUser] = useState('');

    const [userData, setUserData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = 'http://127.0.0.1:8080/api/auth/users';
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleuserChange = (event, selectedOptions) => {
        setSelectedUser(selectedOptions);

    };
    const options = userData.map((user) => ({
        value: user._id,
        label: user.username,
    }));
    const handleSaveTemplate = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: templateName,
            from: selecteduser.value,
            emailsubject: inputText,

            emailbody: emailBody,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = 'http://127.0.0.1:7500/workflow/emailtemplate';
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((result) => {
                toast.success('Email Template create successfully');
                handleClearTemplate();
                setShowForm(false);
                fetchEmailTemplates();
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to create Email Template');
            });
    }
    const [emailBody, setEmailBody] = useState('');

    const handleEditorChange = (content) => {
        setEmailBody(content);
    };
    const handleClearTemplate = () => {
        setTemplateName('');
        setSelectedUser('');
        setInputText('');
        setEmailBody('');

    }
    const [emailTemplates, setEmailTemplates] = useState([]);
    const fetchEmailTemplates = async () => {
        try {
            const url = 'http://127.0.0.1:7500/workflow/emailtemplate';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch email templates');
            }
            const data = await response.json();

            setEmailTemplates(data.emailTemplate);

        } catch (error) {
            console.error('Error fetching email templates:', error);

        }
    };

    useEffect(() => {
        fetchEmailTemplates();
    }, []);

    const handleClickMenu = (event, templateId) => {
        setSelectedTemplateId(templateId);
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
        setSelectedTemplateId(null);
    };

    const handleEdit = () => {
        navigate("emailTempUpdate/" + selectedTemplateId);
        handleCloseMenu();
    };

    const handleDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        };
        const url = 'http://127.0.0.1:7500/workflow/emailtemplate/';
        fetch(url + selectedTemplateId, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                return response.text();
            })
            .then((result) => {
                toast.success('Data deleted successfully');
                fetchEmailTemplates();
                handleCloseMenu();
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <Container>
            {!showForm ? (
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
                        Create Template
                    </Button>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Used in Pipelines</TableCell>
                                    <TableCell>Settings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {emailTemplates.map((template) => (
                                    <TableRow key={template._id}>
                                        <TableCell>{template.templatename}</TableCell>
                                        <TableCell>{template.emailsubject}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <PiDotsThreeOutlineVerticalLight onClick={(e) => handleClickMenu(e, template._id)} />
                                            <Menu
                                                anchorEl={menuAnchorEl}
                                                open={openMenu}
                                                onClose={handleCloseMenu}
                                            >
                                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Box
                    sx={{
                        mt: 2,

                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Create Email Template
                    </Typography>
                    <form onSubmit={handleSaveTemplate}>
                        <Box>

                            <label className='email-input-label'>Template Name</label>

                            <TextField
                                sx={{ background: '#fff' }}
                                margin="normal"
                                fullWidth
                                name="templateName"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Template Name"
                                size="small"
                            />
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Mode
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={selectedOption}
                                    onChange={handleChange}

                                >
                                    <FormControlLabel
                                        value="contacts"
                                        control={<Radio sx={{ color: '#ADD8E6' }} />}
                                        label="Contact Shortcodes"

                                    />
                                    <FormControlLabel
                                        value="account"
                                        control={<Radio sx={{ color: '#ADD8E6' }} />}
                                        label="Account Shortcodes"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box>


                            <label className='email-input-label'>From</label>


                            <Autocomplete

                                options={options}
                                sx={{ mt: 2, mb: 2, backgroundColor: '#fff' }}
                                size='small'
                                value={selecteduser}
                                onChange={handleuserChange}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                getOptionLabel={(option) => option.label || ""}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}

                                        placeholder="Form"
                                    />
                                )}
                                isClearable={true}

                            />

                        </Box>
                        <Box>

                            <label className='email-input-label'>Subject</label>

                            <TextField
                                margin="normal"
                                fullWidth
                                name="subject"
                                value={inputText + selectedShortcut} onChange={handlechatsubject}
                                placeholder="Subject"
                                size="small"
                                sx={{ background: '#fff' }}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleDropdown}
                                sx={{ mt: 2 }}
                            >
                                Add Shortcode
                            </Button>

                            <Popover
                                open={showDropdown}
                                anchorEl={anchorEl}
                                onClose={handleCloseDropdown}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Box >
                                    <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
                                        {filteredShortcuts.map((shortcut, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() => handleAddShortcut(shortcut.value)}
                                            >
                                                <ListItemText
                                                    primary={shortcut.title}
                                                    primaryTypographyProps={{
                                                        style: {
                                                            fontWeight: shortcut.isBold ? 'bold' : 'normal',
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Popover>
                        </Box>
                        <Box sx={{ mt: 5 }}>

                            <EditorShortcodes onChange={handleEditorChange} />
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Save Template
                            </Button>
                        </Box>
                    </form>
                </Box>
            )}
        </Container>
    );
};

export default EmailTemp;

