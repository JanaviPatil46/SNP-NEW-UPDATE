
import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
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
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Popover,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


const InvoiceTemp = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showForm, setShowForm] = useState(false);


  const handleCreateInvoiceTemp = () => {
    setShowForm(true);
  };
  const handleCloseInvoiceTemp = () => {
    setShowForm(false);
  };
  //  for shortcodes
  const [showDropdown, setShowDropdown] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('contacts');
  const [discription, setDiscription] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);


  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleAddShortcut = (shortcut) => {
    setDiscription((prevText) => prevText + `[${shortcut}]`);
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
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };


  /// for left sides tables

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
    // fetchServiceById(selectedOptions ? selectedOptions.value : null, index);
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
      header: '',
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
  ],
    // [rows, serviceoptions]
  );
  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreateInvoiceTemp}>
            Create Invoice Template
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Settings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Box>
            <form>
              <Box>
                <Typography variant='h5' gutterBottom>Create Invoice Template</Typography>
                <Box mt={2} mb={2}><hr /></Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box>

                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                        <TextField
                          // margin="normal"
                          fullWidth
                          name="TemplateName"
                          placeholder="Template Name"
                          size="small"
                          sx={{ mt: 2 }}
                        />
                      </Box>


                      <Box>
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Description</InputLabel>
                        <TextField

                          fullWidth
                          name="Description"
                          value={discription}
                          onChange={(e) => setDiscription(e.target.value)}
                          placeholder="Description"
                          size="small"
                          inputProps={{ maxLength: 50000 }}
                          sx={{ mt: 2 }}
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

                      <Box>
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Choose payment method</InputLabel>
                        <Select
                          size='small'
                          sx={{ width: '100%', mt: 2 }}
                        />
                      </Box>


                      <Box mt={2}>
                        <FormControlLabel
                          control={
                            <Switch

                              color="primary"
                            />
                          }
                          label={"Send email to client when invioce created"}
                        />
                      </Box>

                      <Box mt={2}>
                        <FormControlLabel
                          control={
                            <Switch

                              color="primary"
                            />
                          }
                          label={"Pay invoice with credits if available"}
                        />
                      </Box>


                      <Box mt={2}>
                        <FormControlLabel
                          control={
                            <Switch

                              color="primary"
                            />
                          }
                          label={"Send Reminders to clients"}
                        />
                      </Box>


                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>


                    <Box
                      sx={{
                        borderLeft: '1px solid black',
                        height: '100%',
                        margin: '0 20px',

                      }}
                    ></Box>
                  </Grid>
                  <Grid item xs={26} sm={8} >
                    <Box className='invoice-section-three'>
                      <Box >
                        <Typography sx={{ mt: 2 }} variant='h5'>Line items</Typography>
                        <p style={{ color: 'grey' }}>Client-facing itemized list of products and services</p>
                      </Box>

                      <MaterialReactTable columns={columns} data={rows} />
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
                          <Typography sx={{ mt: 2 }} variant='h5'>Summary</Typography>
                        </Box>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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



                  </Grid>
                </Grid>
                <Divider mt={2} />
                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button variant="contained" color="primary">Save</Button>
                  <Button variant="outlined" onClick={handleCloseInvoiceTemp}>Cancel</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default InvoiceTemp;









