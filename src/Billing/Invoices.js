import React, { useState, useEffect, useMemo } from 'react';
import { Switch, FormControlLabel, Box, Button, Drawer, Typography, IconButton, Divider, Select, MenuItem, InputLabel, TextField, FormControl, FormLabel, InputAdornment, Popover, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import './invoices.css'
const Invoices = ({ charLimit = 4000 }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [payInvoice, setIsPayInvoice] = useState(false);
    const [emailInvoice, setIsEmailInvoice] = useState(false);
    const [reminders, setReminders] = useState(false);
    const [scheduledInvoice, setScheduledInvoice] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const handlePayInvoiceChange = (event) => {
        setIsPayInvoice(event.target.checked);
    };
    const handleEmailInvoiceChange = (event) => {
        setIsEmailInvoice(event.target.checked);
    };
    const handleRemindersChange = (event) => {
        setReminders(event.target.checked);
    };
    const handleScheduledInvoiceChange = (event) => {
        setScheduledInvoice(event.target.checked);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= charLimit) {
            setDescription(value);
            setCharCount(value.length);
        }
    };
    //for shortcodes
    const [showDropdown, setShowDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [shortcuts, setShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');

    const handleAddShortcut = (shortcut) => {
        const updatedTextValue = description + `[${shortcut}]`;
        if (updatedTextValue.length <= charLimit) {
            setDescription(updatedTextValue);
            setCharCount(updatedTextValue.length);
        }
        setShowDropdown(false);
    };

    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
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
    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };
    //for table
    const [rows, setRows] = useState([]);
    const [servicedata, setServiceData] = useState([]);



    const serviceoptions = servicedata.map((service) => ({
        value: service._id,
        label: service.serviceName,
    }));

    const handleServiceChange = (index, selectedOptions) => {
        const newRows = [...rows];
        newRows[index].productName = selectedOptions ? selectedOptions.label : '';
        setRows(newRows);

    };

    const handleServiceInputChange = (inputValue, actionMeta, index) => {
        if (actionMeta.action === 'input-change') {
            const newRows = [...rows];
            newRows[index].productName = inputValue;
            setRows(newRows);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        const newRows = [...rows];

        if (name === 'rate' || name === 'qty') {
            newRows[index][name] = newValue;

            const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
            const qty = parseInt(newRows[index].qty) || 0;
            const amount = (rate * qty).toFixed(2);
            newRows[index].amount = `$${amount}`;
        } else {
            newRows[index][name] = newValue;
        }

        setRows(newRows);
    };



    const addRow = (isDiscountRow = false) => {
        const newRow = isDiscountRow
            ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
            : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
        setRows([...rows, newRow]);
    };

    const deleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    // Calculate Summary Data
    const calculateSummary = () => {
        const subtotal = rows.reduce((acc, row) => acc + (parseFloat(row.amount.replace('$', '')) || 0), 0).toFixed(2);
        const taxRate = 0;
        const taxTotal = (subtotal * (taxRate / 100)).toFixed(2);
        const total = (parseFloat(subtotal) + parseFloat(taxTotal)).toFixed(2);

        return {
            subtotal: `$${subtotal}`,
            taxRate: `${taxRate}%`,
            taxTotal: `$${taxTotal}`,
            total: `$${total}`,
        };
    };

    const summary = calculateSummary();

    // Define columns
    const columns = useMemo(() => [
        {
            accessorKey: 'productName',
            header: 'PRODUCT OR SERVICE',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={serviceoptions.find(option => option.label === rows[rowIndex].productName) || { label: rows[rowIndex].productName, value: rows[rowIndex].productName }}
                        onChange={(selectedOption) => handleServiceChange(rowIndex, selectedOption)}
                        onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, rowIndex)}
                        isClearable
                        sx={{ width: '100%' }}
                        size="small"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {serviceoptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                );
            },
        },
        {
            accessorKey: 'description',
            header: 'DESCRIPTION',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <TextField
                        value={rows[rowIndex].description}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        style={{ border: 'none' }}
                        placeholder='Description'
                        name='description'
                        id="outlined-size-small"
                        size="small"
                    />
                );
            },
        },
        {
            accessorKey: 'rate',
            header: 'RATE',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <TextField
                        value={rows[rowIndex].rate}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        style={{ border: 'none' }}
                        placeholder='Rate'
                        name='rate'
                        id="outlined-size-small"
                        size="small"
                    />
                );
            },
        },
        {
            accessorKey: 'qty',
            header: 'QTY',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <TextField
                        value={rows[rowIndex].qty}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        style={{ border: 'none' }}
                        placeholder='Qty'
                        name='qty'
                        id="outlined-size-small"
                        size="small"
                    />
                );
            },
        },
        {
            accessorKey: 'amount',
            header: 'AMOUNT',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <span className={rows[rowIndex].isDiscount ? 'discount-amount' : ''}>{rows[rowIndex].amount}</span>
                );
            },
        },
        {
            accessorKey: 'tax',
            header: 'TAX',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <input
                        type='checkbox'
                        name='tax'
                        checked={rows[rowIndex].tax}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        style={{ cursor: 'pointer' }}
                    />
                );
            },
        },
        {
            accessorKey: 'actions',
            header: 'Settings',
            Cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <>
                        <BsThreeDotsVertical style={{ cursor: 'pointer' }} />
                        <RiCloseLine onClick={() => deleteRow(rowIndex)} style={{ cursor: 'pointer' }} />
                    </>
                );
            },
        },
    ], [rows, serviceoptions]);
    const table = useMaterialReactTable({
        columns,
        data: rows,
        enableBottomToolbar: true,
        enableStickyHeader: true,
        columnFilterDisplayMode: 'custom', // Custom filtering UI
        enableRowSelection: true, // Enable row selection
        enablePagination: true,
        muiTableContainerProps: { sx: { maxHeight: '400px' } },
        initialState: {
            columnPinning: { left: ['mrt-row-select', 'productName'], right: ['actions'], },
        },
        muiTableBodyCellProps: {
            sx: (theme) => ({
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
            }),
        },
    });

    return (
        <Box>
            <Button type='button' variant="contained" onClick={handleOpen}>
                Create Invoice
            </Button>

            <Drawer
                anchor='right'
                open={open}
                onClose={handleClose}
                classes={{ paper: 'custom-right-drawer' }}
                PaperProps={{
                    sx: {
                        width: '60%',
                        // padding: 2,

                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6">Create Invoice</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box mt={3} p={2} sx={{ height: '80vh', overflowY: 'auto' }} className='create-invoice'>
                    <Box >

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={6}>
                                <Box><InputLabel sx={{ color: 'black' }}>Account name,ID or email</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="TemplateName"
                                        placeholder="Template Name"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    /></Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"

                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                    </Select>

                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                            <Grid xs={6}>
                                <Box><InputLabel sx={{ color: 'black' }}>Invoice Number</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"

                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                    </Select>

                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"

                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                    </Select>

                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                            <Grid xs={6}>
                                <Box>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ marginBottom: '8px', color: 'black' }}>Date</FormLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker


                                                slotProps={{
                                                    textField: {
                                                        InputProps: {
                                                            sx: {
                                                                // marginLeft: '20px',
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>


                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"

                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                    </Select>

                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{ position: 'relative', mt: 2 }}>
                            <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                            <TextField
                                fullWidth
                                size='small'
                                margin='normal'
                                type="text"
                                value={description}
                                onChange={handleChange}
                                placeholder="Description"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'gray', fontSize: '12px', position: 'absolute', bottom: '15px', right: '15px' }}>
                                                {charCount}/{charLimit}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleDropdown}
                                sx={{ mt: 2, }}
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
                        <Box mt={2}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Additioal</Typography>
                            <Box mt={2}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={payInvoice}
                                            onChange={handlePayInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Pay invoice using client credits"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={emailInvoice}
                                            onChange={handleEmailInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Email invoice to client"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={reminders}
                                            onChange={handleRemindersChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Reminders"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={scheduledInvoice}
                                            onChange={handleScheduledInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Scheduled invoice"}
                                />
                            </Box>
                        </Box>

                        <Box className='invoice-section-three'>
                            <Box >
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant='h5'>Line Items</Typography>
                                <p style={{ color: 'grey', }}>Client-facing itemized list of products and services</p>
                            </Box>
                            <Box >
                                <MaterialReactTable columns={columns} table={table} />
                            </Box>

                            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                                <Box onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <AiOutlinePlusCircle /> Line item
                                </Box>
                                <Box onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <CiDiscount1 /> Discount
                                </Box>
                            </Box>



                            <Box>
                                <Box>
                                    <Typography sx={{ mt: 2, mb:2 }} variant='h5'>Summary</Typography>
                                </Box>
                                <TableContainer component={Paper} >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">SUBTOTAL</TableCell>
                                                <TableCell align="left">TAX RATE</TableCell>
                                                <TableCell align="left">TAX TOTAL</TableCell>
                                                <TableCell align="left">TOTAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{summary.subtotal}</TableCell>
                                                <TableCell>{summary.taxRate}</TableCell>
                                                <TableCell>{summary.taxTotal}</TableCell>
                                                <TableCell>{summary.total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>


                        </Box>
                        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Button variant="contained" color="primary">Save</Button>
                            <Button variant="outlined">Cancel</Button>
                        </Box>

                    </Box>

                </Box>
            </Drawer>
        </Box>
    );
};

export default Invoices;
