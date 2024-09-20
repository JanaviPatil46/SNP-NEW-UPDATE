import React, { useState, useEffect, useMemo } from 'react';
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
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
    Alert
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { CiMenuKebab } from "react-icons/ci";
import EditorShortcodes from '../Texteditor/EditorShortcodes';

const EmailTemp = () => {


    const EMAIL_API = process.env.REACT_APP_EMAIL_TEMP_URL;
    const USER_API = process.env.REACT_APP_USER_URL;


    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [shortcuts, setShortcuts] = useState([]);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCreateTemplate = () => {
        setShowForm(true); // Show the form when button is clicked
    };

    // const handleTempCancle = () => {
    //     // Show confirmation dialog
    //     const confirmCancel = window.confirm("You have unsaved changes. are you sure you want to leave without saving?");
    //     if (confirmCancel) {
    //         // If user confirms, clear the form and hide it
    //         setShowForm(false);

    //     }
    // };



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
          setShowDropdown(false);
    };


    const [selecteduser, setSelectedUser] = useState('');

    const [userData, setUserData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${USER_API}/api/auth/users`;
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
    const handleSaveExitTemplate = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Prevent form submission if validation fails
        }
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
        const url = `${EMAIL_API}/workflow/emailtemplate`;
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
    const handleSaveTemplate = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Prevent form submission if validation fails
        }
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
        const url = `${EMAIL_API}/workflow/emailtemplate`;
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((result) => {
                toast.success('Email Template create successfully');
                // handleClearTemplate();
                // setShowForm(false);
                // fetchEmailTemplates();
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
            const url = `${EMAIL_API}/workflow/emailtemplate/`;
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





    const handleEdit = (_id) => {
        navigate("emailTempUpdate/" + _id);

    };

    const handleDelete = (_id) => {
        // Show a confirmation prompt
        const isConfirmed = window.confirm("Are you sure you want to delete this email template?");
        
        // Proceed with deletion if confirmed
        if (isConfirmed) {
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        };
        const url = `${EMAIL_API}/workflow/emailtemplate/`;
        fetch(url + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                return response.json();
            })
            .then((result) => {
                toast.success('Data deleted successfully');
                fetchEmailTemplates();

            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    const [tempIdget, setTempIdGet] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);
    const toggleMenu = (_id) => {
        setOpenMenuId(openMenuId === _id ? null : _id);
        setTempIdGet(_id);
    };
    // console.log(tempIdget)
    const columns = useMemo(() => [
        {
            accessorKey: 'templatename',
            header: 'Name',
            Cell: ({ row }) => (
                <Typography
                    sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: 'bold' }}
                    onClick={() => handleEdit(row.original._id)}
                >
                    {row.original.templatename}
                </Typography>
            ),

        },
        {
            accessorKey: 'emailsubject',
            header: 'Subject',

        },
        {
            accessorKey: 'Used in pipeline',
            header: 'Used in pipeline',

        },
        {
            accessorKey: 'Setting', header: 'Setting',
            Cell: ({ row }) => (
                <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
                    <CiMenuKebab style={{ fontSize: "25px" }} />
                    {openMenuId === row.original._id && (
                        <Box sx={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff', boxShadow: 1, borderRadius: 1, p: 1, left: '30px', m: 2 }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} onClick={() => {
                                handleEdit(row.original._id);

                            }} >Edit</Typography>
                            <Typography sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }} onClick={() => handleDelete(row.original._id)}>Delete</Typography>
                        </Box>
                    )}
                </IconButton>

            ),

        },

    ], [openMenuId]);

    const table = useMaterialReactTable({
        columns,
        data: emailTemplates,
        enableBottomToolbar: true,
        enableStickyHeader: true,
        columnFilterDisplayMode: "custom", // Render own filtering UI
        enableRowSelection: true, // Enable row selection
        enablePagination: true,
        muiTableContainerProps: { sx: { maxHeight: "400px" } },
        initialState: {
            columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
        },
        muiTableBodyCellProps: {
            sx: (theme) => ({
                backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
            }),
        },
    });
    const handleTempCancle = () => {
        if (isFormDirty) {
            const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
            if (!confirmClose) {
                return;
            }
        }
        setShowForm(false);
    };

    // Detect form changes
    useEffect(() => {
        if (templateName || selecteduser || inputText) {
            setIsFormDirty(true);
        } else {
            setIsFormDirty(false);
        }
    }, [templateName, selecteduser, inputText]);


    const [templateNameError, setTemplateNameError] = useState('');
    const [selectedUserError, setSelectedUserError] = useState('');
    const [inputTextError, setInputTextError] = useState('');
    

    const validateForm = () => {
        let isValid = true;

        if (templateName.trim() === '') {
            setTemplateNameError('Template name is required');
            isValid = false;
        } else {
            setTemplateNameError('');
        }

        if (!selecteduser) {
            setSelectedUserError('Please select a user');
            isValid = false;
        } else {
            setSelectedUserError('');
        }

        if (inputText.trim() === '') {
            setInputTextError('Email subject is required');
            isValid = false;
        } else {
            setInputTextError('');
        }

       

        return isValid;
    };

    return (
        <Container>

            {!showForm ? (
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCreateTemplate} sx={{ mb: 3 }}>
                        Create Template
                    </Button>
                    <MaterialReactTable columns={columns} table={table} />

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
                    <form >
                        <Box>

                            <label className='email-input-label'>Template Name</label>

                            <TextField
                                sx={{ background: '#fff', mt: 2 }}

                                fullWidth
                                name="templateName"
                                value={templateName}
                                error={!!templateNameError}
                                // helperText={templateNameError}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Template Name"
                                size="small"
                            />
                            {(!!templateNameError) && <Alert sx={{
                                width: '96%',
                                p: '0', // Adjust padding to control the size
                                pl: '4%', height: '23px',
                                borderRadius: '10px',
                                borderTopLeftRadius: '0',
                                borderTopRightRadius: '0',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center', // Center content vertically
                                '& .MuiAlert-icon': {
                                    fontSize: '16px', // Adjust the size of the icon
                                    mr: '8px', // Add margin to the right of the icon
                                },
                            }} variant="filled" severity="error" >
                                {templateNameError}
                            </Alert>}
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
                                    <>
                                        <TextField
                                            {...params}
                                            error={!!selectedUserError}
                                            // helperText={selectedUserError}
                                            placeholder="Form"
                                        />
                                        {(!!selectedUserError) && <Alert sx={{
                                            width: '96%',
                                            p: '0', // Adjust padding to control the size
                                            pl: '4%', height: '23px',
                                            borderRadius: '10px',
                                            borderTopLeftRadius: '0',
                                            borderTopRightRadius: '0',
                                            fontSize: '15px',
                                            display: 'flex',
                                            alignItems: 'center', // Center content vertically
                                            '& .MuiAlert-icon': {
                                                fontSize: '16px', // Adjust the size of the icon
                                                mr: '8px', // Add margin to the right of the icon
                                            },
                                        }} variant="filled" severity="error" >
                                            {selectedUserError}
                                        </Alert>}
                                    </>
                                )}
                                isClearable={true}

                            />


                        </Box>
                        <Box>

                            <label className='email-input-label'>Subject</label>

                            <TextField
                                
                                fullWidth
                                name="subject"
                                value={inputText + selectedShortcut} onChange={handlechatsubject}
                                placeholder="Subject"
                                size="small"
                                error={!!inputTextError}
                                // helperText={inputTextError}
                                sx={{ background: '#fff',mt:2 }}
                            />
                            {(!!inputTextError) && <Alert sx={{
                                width: '96%',
                                p: '0', // Adjust padding to control the size
                                pl: '4%', height: '23px',
                                borderRadius: '10px',
                                borderTopLeftRadius: '0',
                                borderTopRightRadius: '0',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center', // Center content vertically
                                '& .MuiAlert-icon': {
                                    fontSize: '16px', // Adjust the size of the icon
                                    mr: '8px', // Add margin to the right of the icon
                                },
                            }} variant="filled" severity="error" >
                                {inputTextError}
                            </Alert>}
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
                        <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleSaveExitTemplate}>
                               Save & Exit
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSaveTemplate}>Save</Button>
                            <Button variant="outlined" onClick={handleTempCancle}>Cancel</Button>
                        </Box>
                    </form>
                </Box>
            )}
        </Container>
    );
};

export default EmailTemp;

