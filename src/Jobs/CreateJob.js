import { Box, Button, Grid, Typography, TextField, InputLabel, Select, MenuItem, Chip, Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import Priority from '../Templates/Priority/Priority';
import Editor from '../Templates/Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Initialize the plugin
dayjs.extend(customParseFormat);
const CreateJob = () => {
  // State to keep track of selected values
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedJobAssignees, setSelectedJobAssignees] = useState([]);
  const [pipeline, setPipeline] = useState('');
  const [jobTemplate, setJobTemplate] = useState('');
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [isAbsoluteDate, setIsAbsoluteDate] = useState(false);
  const [startTimeSpan, setStartTimeSpan] = useState('');
  const [dueTimeSpan, setDueTimeSpan] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  // Handle change in selection
  const handleChange = (event) => {
    setSelectedAccounts(event.target.value);
  };
  const handleJobAssigneesChange = (event) => {
    setSelectedJobAssignees(event.target.value);
  };
  const handlePipelineChange = (event) => {
    setPipeline(event.target.value);
  };
  const handleJobtemplateChange = (event) => {
    setJobTemplate(event.target.value);
  };
  const handleJobNameChange = (event) => {
    setJobName(event.target.value);
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <form>
          <Box>
            <Typography variant='h5' gutterBottom>Add Jobs</Typography>
            <Box mt={2} mb={2}><hr /></Box>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={5} ml={2} className='left-side-container' >
                <Box >
                  <InputLabel sx={{ color: 'black' }}>Accounts</InputLabel>
                  <Select
                    size="small"
                    multiple
                    value={selectedAccounts}
                    onChange={handleChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{ width: '100%', marginTop: '8px' }}
                  >
                    <MenuItem value="account1">Account 1</MenuItem>
                    <MenuItem value="account2">Account 2</MenuItem>
                    <MenuItem value="account3">Account 3</MenuItem>
                    <MenuItem value="account4">Account 4</MenuItem>
                  </Select>
                </Box>
                <Box mt={2}>
                  <InputLabel>Pipeline</InputLabel>
                  <Select
                    sx={{ width: '100%', marginTop: '8px' }}
                    size="small"
                    value={pipeline}
                    onChange={handlePipelineChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Pipeline1">Pipeline 1</MenuItem>
                    <MenuItem value="Pipeline2">Pipeline 2</MenuItem>
                    <MenuItem value="Pipeline3">Pipeline 3</MenuItem>
                  </Select>
                </Box>
                <Box mt={2}>
                  <InputLabel>Template</InputLabel>
                  <Select
                    sx={{ width: '100%', marginTop: '8px' }}
                    size="small"
                    value={jobTemplate}
                    onChange={handleJobtemplateChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="jobtemp1">Jobtemp 1</MenuItem>
                    <MenuItem value="jobtemp2">Jobtemp 2</MenuItem>
                    <MenuItem value="jobtemp3">Jobtemp 3</MenuItem>
                  </Select>
                </Box>
                <Box mt={2}>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    fullWidth
                    value={jobName}
                    onChange={handleJobNameChange}
                    margin="normal"
                    size="small"
                    placeholder='Job Name'
                  />
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
              <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box
                  sx={{
                    borderLeft: '1px solid black',
                    height: '100%',
                    margin: '0 20px'
                  }}
                ></Box>
              </Grid>
              <Grid item xs={12} sm={5} ml={{ xs: 0, sm: 3 }} className='right-side-container'>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant='h5' fontWeight={'bold'}>Comments</Typography>
                    <Typography textAlign={'center'}>No comments attached</Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant='h5' fontWeight={'bold'}>Wiki pages</Typography>
                    <Typography textAlign={'center'}>No wiki pages attached</Typography>
                  </Box>
                </Box>
              </Grid>

            </Grid>
            <Box mt={3}><hr /></Box>

            <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Button variant="contained" color="primary">Add</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateJob;


