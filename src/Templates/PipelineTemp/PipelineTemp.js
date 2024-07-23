import React, { useState, useEffect } from 'react';

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
  Chip,
  Switch, FormControlLabel,
  Divider, IconButton
} from '@mui/material';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle,LuPenLine  } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
const PipelineTemp = () => {

  const [showForm, setShowForm] = useState(false);
  const [pipelineName, setPipelineName] = useState('');
  const [userData, setUserData] = useState([]);
  const handleCreatePipeline = () => {
    setShowForm(true); // Show the form when button is clicked
  };
  const handleClosePipelineTemp = () => {
    setShowForm(false);
  }
  const handlePipelineNameChange = (event) => {
    setPipelineName(event.target.value);
  };
  const handleUserChange = (event) => {
    setUserData(event.target.value);
  };

  // sort jobs
  const [sortbyjobs, setSortbyJobs] = useState([]);
  const [selectedSortByJob, setSelectedSortByJob] = useState('');

  const handleSortingByJobs = (event) => {
    setSelectedSortByJob(event.target.value);
  };

  useEffect(() => {
    fetchSortByJob();
  }, []);

  const fetchSortByJob = async () => {
    try {
      const url = 'http://127.0.0.1:7500/sortjobs/sortjobby';
      const response = await fetch(url);
      const data = await response.json();
      setSortbyJobs(data.sortJobsBy);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const optionsort = sortbyjobs.map((sort) => ({
    value: sort._id,
    label: sort.description
  }));
  const [selectedtemp, setselectedTemp] = useState();
  const handletemp = (event) => {
    setselectedTemp(event.target.value);
  };
  const [Account_id, setAccount_id] = useState(false);
  const handleAccount_idChange = (event) => {
    setAccount_id(event.target.checked);
  };
  const [Days_on_stage, setDays_on_stage] = useState(false);
  const handleDays_on_stageChange = (event) => {
    setDays_on_stage(event.target.checked);
  };
  const [Account_tags, setAccount_tags] = useState(false);
  const handleAccount_tagsChange = (event) => {
    setAccount_tags(event.target.checked);
  };
  const [startDate, setStartDate] = useState(false);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.checked);
  };
  const [Name, setName] = useState(false);
  const handleNameSwitchChange = (event) => {
    setName(event.target.checked);
  };
  const [Due_date, setDue_date] = useState(false);
  const handleDue_dateChange = (event) => {
    setDue_date(event.target.checked);
  };
  const [Priority, setPriority] = useState(false);
  const [Description, setDescription] = useState(false);
  const [Assignees, setAssignees] = useState(false);
  const handlePriorityChange = (event) => {
    setPriority(event.target.checked);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.checked);
  };
  const handleAssigneesChange = (event) => {
    setAssignees(event.target.checked);
  };


  const [stages, setStages] = useState([]);

  const handleAddStage = () => {
    const newStage = { name: '', conditions: [], automations: [], autoMove: false, showDropdown: false, activeAction: null };
    setStages([...stages, newStage]);
  };

  const handleDeleteStage = (index) => {
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    setStages(updatedStages);
  };

  const handleAutoMoveChange = (index) => {
    const updatedStages = stages.map((stage, idx) => (
      idx === index ? { ...stage, autoMove: !stage.autoMove } : stage
    ));
    setStages(updatedStages);
  };

  // const toggleDropdown = (index) => {
  //   const updatedStages = stages.map((stage, idx) => (
  //     idx === index ? { ...stage, showDropdown: !stage.showDropdown } : stage
  //   ));
  //   setStages(updatedStages);
  // };
  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreatePipeline}>
            Create Pipeline
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
          
          <Box>
            <form>
              <Box>
                <Typography variant='h5' gutterBottom>  Create Pipelines</Typography>
                <Box mt={2} mb={2}><hr /></Box>
                <Grid container spacing={2} >
                  <Grid item xs={12} sm={5} className='left-side-container' >
                    <Box >
                      <InputLabel>Pipeline Name</InputLabel>
                      <TextField
                        fullWidth
                        value={pipelineName}
                        onChange={handlePipelineNameChange}
                        margin="normal"
                        size="small"
                        placeholder='Pipeline Name'
                      />
                    </Box>
                    <Box mt={2}>
                      <InputLabel sx={{ color: 'black' }}>Available To</InputLabel>
                      <Select
                        size="small"
                        multiple
                        value={userData}
                        onChange={handleUserChange}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        sx={{ width: '100%', marginTop: '8px' }}
                      >

                        <MenuItem value="user1">User 1</MenuItem>
                        <MenuItem value="user2">User 2</MenuItem>
                        <MenuItem value="user3">User 3</MenuItem>
                        <MenuItem value="user4">User 4</MenuItem>
                      </Select>
                    </Box>
                    <Box mt={2}>
                      <InputLabel sx={{ color: 'black' }}>Sort jobs by</InputLabel>
                      <Select
                        size='small'
                        value={selectedSortByJob}
                        sx={{ width: '100%', marginTop: '8px' }}
                        onChange={handleSortingByJobs}
                        displayEmpty
                      >
                        {/* <MenuItem value="">
                          <em>Sort jobs by</em>
                        </MenuItem> */}
                        {optionsort.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box mt={2}>
                      <InputLabel>Default job template</InputLabel>
                      <Select
                        sx={{ width: '100%', marginTop: '8px' }}
                        size="small"
                        value={selectedtemp}
                        onChange={handletemp}
                      >

                        <MenuItem value="jobtemp1">Jobtemp 1</MenuItem>
                        <MenuItem value="jobtemp2">Jobtemp 2</MenuItem>
                        <MenuItem value="jobtemp3">Jobtemp 3</MenuItem>
                      </Select>
                    </Box>

                    <Box mt={3}>
                      <Typography variant='h6'>Job card fields</Typography>
                      <Grid container spacing={5}>
                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Account_id}
                                  onChange={handleAccount_idChange}
                                  color="primary"

                                />
                              }
                              label={"Account ID"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Days_on_stage}
                                  onChange={handleDays_on_stageChange}
                                  color="primary"
                                />
                              }
                              label={"Days on stage"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Account_tags}
                                  onChange={handleAccount_tagsChange}
                                  color="primary"
                                />
                              }
                              label={"Account tags"}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={startDate}
                                  onChange={handleStartDateChange}
                                  color="primary"
                                />
                              }
                              label={"Start date"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Name}
                                  onChange={handleNameSwitchChange}
                                  color="primary"
                                />
                              }
                              label={"Name"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Due_date}
                                  onChange={handleDue_dateChange}
                                  color="primary"
                                />
                              }
                              label={"Due date"}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Description}
                                  onChange={handleDescriptionChange}
                                  color="primary"
                                />
                              }
                              label={"Description"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Assignees}
                                  onChange={handleAssigneesChange}
                                  color="primary"
                                />
                              }
                              label={"Assignees"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Priority}
                                  onChange={handlePriorityChange}
                                  color="primary"
                                />
                              }
                              label={"Priority"}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
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
                    <Typography>Default recurrence setting</Typography>
                  </Grid>

                </Grid>
                <Box mt={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant='h6'>Stages</Typography>
                  <Button
                      variant="contained"
                      startIcon={<LuPlusCircle />}
                      onClick={handleAddStage}
                      sx={{ border: 'none', backgroundColor: '#e4e9f7', color: 'blue', fontSize: '15px' }}
                    >
                      Add stage
                    </Button>
                </Box>
                {/* <Box ><hr /></Box> */}
                <Divider mt={2} />
                <Box sx={{ margin: '20px 0 10px 10px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    
                    
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '10%' }}>
                    {stages.map((stage, index) => (
                      <Paper key={index} sx={{ height: 'auto', marginTop: '20px', borderRadius: '10px', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", width: '25%' }}>
                        <Box sx={{ margin: '10px' }}>
                          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <RxDragHandleDots2 />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
                              <LuPenLine />
                              <TextField
                                variant="outlined"
                                placeholder="Stage Name"
                                sx={{ flexGrow: 1 }}
                                size='small'
                              />
                            </Box>
                            <IconButton onClick={() => handleDeleteStage(index)}>
                              <RiDeleteBin6Line sx={{ color: 'red', cursor: 'pointer' }} />
                            </IconButton>
                          </Box>
                          <Divider />
                          <Box>
                            <Typography variant="h6" sx={{ fontSize: '15px', margin: '5px 0' }}>Stage conditions</Typography>
                            {index === 0 ? (
                              <Typography variant="body2">First stage can't have conditions</Typography>
                            ) : index === stages.length - 1 ? (
                              <Typography variant="body2">Last stage can't have conditions</Typography>
                            ) : (
                              <Typography variant="body2">Job enters this stage if conditions are met</Typography>
                            )}
                            {index > 0 && index !== stages.length - 1 && (
                              <Box sx={{ marginTop: '10px' }}>
                                <Typography variant="body2" sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}>Add conditions</Typography>
                              </Box>
                            )}
                            <Divider />
                            <Typography variant="h6" sx={{ fontSize: '15px', margin: '5px 0' }}>Automations</Typography>
                            <Typography variant="body2">Triggered when job enters stage</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }} >Added automation</Typography>
                            {/* onClick={() => toggleDropdown(index)} */}
                            {/* {stage.showDropdown && (
                              <Box className="dropdown-content">
                                <ul>
                                  {automoveActions.map((action, actionIndex) => (
                                    <li key={actionIndex} onClick={() => handleActionSelect(index, action)}>{action}</li>
                                  ))}
                                </ul>
                              </Box>
                            )} */}
                            <Divider />
                            <Typography variant="h6" sx={{ fontSize: '15px', margin: '5px 0' }}>Automove</Typography>
                            <Typography variant="body2">Move jobs automatically when linked actions are completed</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                              <Switch
                                onChange={() => handleAutoMoveChange(index)}
                                checked={stage.autoMove}
                                color="primary"
                                sx={{ width: 45, height: 25 }}
                              />
                              <Typography sx={{ cursor: "pointer" }}>Automove jobs</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button variant="contained" color="primary">Save</Button>
                  <Button variant="outlined" onClick={handleClosePipelineTemp}>Cancel</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PipelineTemp;
