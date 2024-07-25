import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  
  
} from '@mui/material';

import Editor from '../Texteditor/Editor';
import Grid from '@mui/material/Unstable_Grid2';
import Priority from '../Priority/Priority'
const Tasks = () => {
 
  const [showForm, setShowForm] = useState(false);
  const [startTimeSpan, setStartTimeSpan] = useState('');
  const [dueTimeSpan, setDueTimeSpan] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [isAbsoluteDate, setIsAbsoluteDate] = useState(false);

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

  const handleCreateTask = () => {
    setShowForm(true);
  };
  const handleCloseTaskTemp = () => {
    setShowForm(false);
  };

  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreateTask}>
            Create Task Template
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
                <Typography variant='h5' gutterBottom>Create Task Template</Typography>
                <Box mt={2} mb={2}><hr /></Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5.8}>
                    <Box >
                      <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                              <TextField
                                fullWidth
                                name="TemplateName"
                                placeholder="Template Name"
                                size="small"
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <InputLabel sx={{ color: 'black' }}>Status</InputLabel>
                              <Select
                                size='small'
                                fullWidth
                                sx={{ mt: 1 }}
                                defaultValue=""
                              >
                                <MenuItem value="">Select Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>


                      
                      <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <InputLabel sx={{ color: 'black' }}>Task Assignee</InputLabel>
                              <Select size='small' sx={{width:'100%', mt:'8px'}}>
                              <MenuItem value="taskassignee1">Taskassignee 1</MenuItem>
                                <MenuItem value="taskassignee1">Taskassignee 2</MenuItem>
                                <MenuItem value="taskassignee1">Taskassignee 3</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Priority/>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ mt: 3, }}>
                        <Editor />
                      </Box>
                      <Box>
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Tags</InputLabel>
                        <Select
                          size='small'
                          sx={{ width: '100%', mt: 2 }}
                        >
                          {/* Add MenuItem here */}
                        </Select>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box mt={2}>
                          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant='h6'>Start and Due Date</Typography>
                            <Box>
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
                          {isAbsoluteDate ? (
                            <>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography>Start Date</Typography>
                                <DatePicker
                                  format="DD/MM/YYYY"
                                  value={startDate}
                                  onChange={handleStartDateChange}
                                  renderInput={(params) => <TextField {...params} size="small" />}
                                  sx={{ width: '100%', ml: 2 }}
                                />
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography>Due Date</Typography>
                                <DatePicker
                                  format="DD/MM/YYYY"
                                  value={dueDate}
                                  onChange={handleDueDateChange}
                                  renderInput={(params) => <TextField {...params} size="small" />}
                                  sx={{ width: '100%', ml: 2 }}
                                />
                              </Box>
                            </>
                          ) : (
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
                        </Box>
                      </LocalizationProvider>
                    </Box>
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
                  <Grid item xs={12} sm={5.8} >

                  </Grid>
                </Grid>
                <Box mt={2} mb={2}><hr /></Box>
                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button variant="contained" color="primary">Save</Button>
                  <Button variant="outlined" onClick={handleCloseTaskTemp}>Cancel</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Tasks;