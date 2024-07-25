import React, { useState,useEffect } from 'react';
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
 
  TextField,
  InputLabel,
  Select, MenuItem, Chip,
  Switch, FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Popover,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Priority from '../Priority/Priority';
import Editor from '../Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
// Initialize the plugin
dayjs.extend(customParseFormat);
const JobTemp = () => {
  const [priority, setPriority] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedJobAssignees, setSelectedJobAssignees] = useState([]);
  const [isAbsoluteDate, setIsAbsoluteDate] = useState(false);
  const [startTimeSpan, setStartTimeSpan] = useState('');
  const [dueTimeSpan, setDueTimeSpan] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [jobName, setJobName] = useState('');
  const [shortcuts, setShortcuts] = useState([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('contacts');
  console.log(setSelectedOption);
  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleAddShortcut = (shortcut) => {
    setJobName((prevText) => prevText + `[${shortcut}]`);
    setShowDropdown(false);
  };
  const handleCreateJobTemplate = () => {
    setShowForm(true); // Show the form when button is clicked
  };
  const handleJobAssigneesChange = (event) => {
    setSelectedJobAssignees(event.target.value);
  };
  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };
  const handleDateSwitchChange = (event) => {
    setIsAbsoluteDate(event.target.checked);
  };
  const handleStartTimeSpanChange = (event) => {
    setStartTimeSpan(event.target.value);
  };
  const handleDueTimeSpanChange = (event) => {
    setDueTimeSpan(event.target.value);
  };
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };
  const handleDueDateChange = (newDate) => {
    setDueDate(newDate);
  };
  const handleCloseJobTemp = () => {
    setShowForm(false);
  }
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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        {!showForm ? (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCreateJobTemplate}>
              Job Template
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
          <Box
            sx={{
              mt: 2,

            }}
          >
            <Typography variant="h6" gutterBottom>
              Create Job Template
            </Typography>
            <Box ><hr /></Box>
            <Grid container spacing={2} >
              <Grid  xs={12} sm={5.8} >
                <Box mt={2}>
                  <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                  <TextField
                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder='Template Name'
                  />
                </Box>
                <Box mt={1}>
                  <InputLabel sx={{ color: 'black' }}>Job Name</InputLabel>
                  <TextField
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder='Job Name' />
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
                <Box mt={2}>
                  <InputLabel sx={{ color: 'black' }}>Job Assignees</InputLabel>
                  <Select
                    size="small"
                    multiple
                    value={selectedJobAssignees}
                    onChange={handleJobAssigneesChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{ width: '100%', marginTop: '8px' }}
                  >
                    <MenuItem value="jobassignee1">JobAssignee 1</MenuItem>
                    <MenuItem value="jobassignee2">JobAssignee 2</MenuItem>
                    <MenuItem value="jobassignee3">JobAssignee 3</MenuItem>
                    <MenuItem value="jobassignee4">JobAssignee 4</MenuItem>
                  </Select>
                </Box>
                <Box mt={2}>
                  <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
                </Box>
                <Box mt={2}>
                  <Editor />
                </Box>
                <Box mt={2}>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h6'>Start and Due Date</Typography>
                    <Box className='absolutes-dates'>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isAbsoluteDate}
                            onChange={handleDateSwitchChange}
                            color="primary"
                          />
                        }
                        label={"Absolute Date"}
                      />
                    </Box>
                  </Box>
                </Box>
                {isAbsoluteDate && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography>Start Date</Typography>
                      <DatePicker
                        format="DD/MM/YYYY"
                        sx={{ width: '100%', }}
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography>Due Date</Typography>
                      <DatePicker
                        format="DD/MM/YYYY"
                        sx={{ width: '100%', }}
                        value={dueDate}
                        onChange={handleDueDateChange}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </Box>
                  </>
                )}
                {!isAbsoluteDate && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>Start In</Typography>
                      <TextField
                        size='small'
                        margin='normal'
                        fullWidth
                        defaultValue={0}
                        sx={{ ml: 1 }}
                      />
                      <Select
                        sx={{ width: '100%', mt: 1 }}
                        size="small"
                        value={startTimeSpan}
                        onChange={handleStartTimeSpanChange}
                      >
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="months">Months</MenuItem>
                        <MenuItem value="years">Years</MenuItem>
                      </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>Due In</Typography>
                      <TextField
                        size='small'
                        margin='normal'
                        fullWidth
                        defaultValue={0}
                        sx={{ ml: 1.5 }}
                      />
                      <Select
                        sx={{ width: '100%', mt: 1 }}
                        size="small"
                        value={dueTimeSpan}
                        onChange={handleDueTimeSpanChange}
                      >
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="months">Months</MenuItem>
                        <MenuItem value="years">Years</MenuItem>
                      </Select>
                    </Box>
                  </>
                )}

              </Grid>
              <Grid item xs={12} sm={0.4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box
                  sx={{
                    borderLeft: '1px solid black',
                    height: '100%',
                    ml: 1.5
                  }}
                ></Box>
              </Grid>
              <Grid  xs={12} sm={5.8} >
                <Box
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
                >
                  <EditCalendarRoundedIcon sx={{ fontSize: '120px', color: '#c6c7c7', }} />
                </Box>
              </Grid>


            </Grid>
            <Box mt={3}><hr /></Box>

            <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Button variant="contained" color="primary">Add</Button>
              <Button variant="outlined" onClick={handleCloseJobTemp}>Cancel</Button>
            </Box>
          </Box>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default JobTemp;