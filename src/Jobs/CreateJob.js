import { Box, Button, Grid, Typography, TextField, InputLabel,  Switch, FormControlLabel, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Priority from '../Templates/Priority/Priority';
import Editor from '../Templates/Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
// Initialize the plugin
dayjs.extend(customParseFormat);
const CreateJob = () => {
  // State to keep track of selected values

  const [description, setDescription] = useState('');
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [absoluteDate, setAbsoluteDates] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [startsin, setstartsin] = useState('');
  const [startsInDuration, setStartsInDuration] = useState(null);
  const [dueinduration, setdueinduration] = useState("");
  const [duein, setduein] = useState('');
 
 
  const dayOptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];
  const handleEditorChange = (content) => {
    setDescription(content);
  };



  // Handler function to update state when dropdown value changes
  const handleStartInDateChange = (event, newValue) => {
    setStartsInDuration(newValue ? newValue.value : null);
  };
  // Handler function to update state when dropdown value changes
  const handleDueInDateChange = (event, newValue) => {
    setdueinduration(newValue ? newValue.value : null);
  };


  const handlePriorityChange = (priority) => {
    setPriority(priority);
  };

  // const handlePriorityChange = (selectedOption) => {
  //   setPriority(selectedOption);
  // };
  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  
  //****************Accounts */
  const [accountdata, setaccountdata] = useState([]);
  const [selectedaccount, setSelectedaccount] = useState();
  const [combinedaccountValues, setCombinedaccountValues] = useState([]);

  const handleAccountChange = (event, newValue) => {
    setSelectedaccount(newValue.map((option) => option.value));
    // Map selected options to their values and send as an array
      console.log("Selected Values:", newValue.map((option) => option.value));
    setCombinedaccountValues(newValue.map((option) => option.value));
  }



  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:7000/accounts/accountdetails');
      const data = await response.json();
      setaccountdata(data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const accountoptions = accountdata.map((account) => ({
    value: account._id,
    label: account.accountName
  }));
  // user
 
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



  const [selectedUser, setSelectedUser] = useState([]);
  const [combinedAssigneesValues, setCombinedAssigneesValues] = useState([]);
  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedAssigneesValues(selectedValues);
  };
  const assigneesoptions = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  //Default Jobt template get 
  const [jobTemp, setJobTemp] = useState([]);
  const [selectedtemp, setselectedTemp] = useState();
 
  const handletemp = async (event, newValue) => {
    setselectedTemp(newValue);
    if (newValue && newValue.value) {
      const templateId = newValue.value;
      try {
        const response = await fetch(`http://127.0.0.1:7500/workflow/jobtemplate/jobtemplate/jobtemplatelist/${templateId}`);
        const data = await response.json();
        const template = data.jobTemplate;

        // Populate the form fields with template data
        setJobName(template.jobname);

        const jobAssignees = template.jobassignees.map((assignee) => ({
          value: assignee._id,
          label: assignee.username,
      }));
      setSelectedUser(jobAssignees);
      const selectedValues = jobAssignees.map((option) => option.value);
      setCombinedAssigneesValues(selectedValues);
        // setSelecteAssigneesdUser(template.jobassignees.map(assignee => assignee._id));
        setPriority(template.priority);
        console.log(template.priority)
        setDescription(template.description);
        setAbsoluteDates(template.absolutedates);
        setStartDate(template.absolutedates ? dayjs(template.startdate) : null);
        setDueDate(template.absolutedates ? dayjs(template.enddate) : null);
        setstartsin(template.startsin); // You might need to adjust this
        setduein(template.duein); // You might need to adjust this
        setStartsInDuration(template.startsinduration);
        setdueinduration(template.dueinduration)
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    }
  };

  useEffect(() => {
    fetchtemp();
  }, []);

  const fetchtemp = async () => {
    try {
      const url = 'http://127.0.0.1:7500/workflow/jobtemplate/jobtemplate';
      const response = await fetch(url);
      const data = await response.json();
      setJobTemp(data.JobTemplates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const optiontemp = jobTemp.map((temp) => ({
    value: temp._id,
    label: temp.templatename

  }));

  // pipeline data
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedPipeline, setselectedPipeline] = useState();

  const handlePipelineChange = (selectedOptions) => {
    setselectedPipeline(selectedOptions);
    console.log(selectedOptions)
  }
  useEffect(() => {
    fetchPipelineData();
  }, []);
  const fetchPipelineData = async () => {
    try {
      const url = 'http://127.0.0.1:7500/workflow/pipeline/pipelines';
      const response = await fetch(url);
      const data = await response.json();
      setPipelineData(data.pipeline);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const optionpipeline = pipelineData.map((pipelineData) => ({
    value: pipelineData._id,
    label: pipelineData.pipelineName

  }));
  // console.log("Job Assignees Values:", selectedAssigneesUser);
  
  const createjob = () => {

    const myHeaders = {
      "Content-Type": "application/json"
    };

    const data = {
      accounts: combinedaccountValues,
      pipeline: selectedPipeline.value,
      templatename: selectedtemp.value,
      jobname: jobName,
      jobassignees: combinedAssigneesValues,
      priority: priority,
      description: description,
      absolutedates: absoluteDate,
      startsin: startsin,
      startsinduration: startsInDuration,
      duein: duein,
      dueinduration: dueinduration,
      comments: "",
      startdate: startDate,
      enddate: dueDate,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:7550/workflow/jobs/newjob',
      headers: myHeaders,
      data: JSON.stringify(data)
    };

    axios.request(config)
      .then((response) => {
        console.log("Job created successfully");
       toast.success('Job created successfully')

        // Handle success, e.g., toast or redirect
      })
      .catch((error) => {
        console.error("Failed to create Job Template:", error);
        toast.error('Failed to create Job')
        // Handle errors, e.g., toast error
      });
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
                 
                  <Autocomplete
                    multiple
                    options={accountoptions}
                    value={selectedaccount}
                    onChange={handleAccountChange}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                      >
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => <TextField {...params} placeholder="Select Accounts" 
                    variant="outlined"
                    size="small"/>}
                    sx={{ width: '100%', marginTop: '8px' }}
                  />
                </Box>
                <Box mt={2}>
                  <InputLabel>Pipeline</InputLabel>

                  <Autocomplete
                    options={optionpipeline}
                    getOptionLabel={(option) => option.label}
                    value={selectedPipeline}
                    onChange={(event, newValue) => handlePipelineChange(newValue)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                      >
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}

                        placeholder="Pipeline"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    sx={{ width: '100%', marginTop: '8px' }}
                    clearOnEscape // Enable clearable functionality
                  />
                </Box>
                <Box mt={2}>
                  <InputLabel>Template</InputLabel>
                  <Autocomplete
                    options={optiontemp}
                    getOptionLabel={(option) => option.label}
                    value={selectedtemp}
                    
                    onChange={handletemp}

                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                      >
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}

                        placeholder="Job Template"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    sx={{ width: '100%', marginTop: '8px' }}
                    clearOnEscape // Enable clearable functionality
                  />
                </Box>
                <Box mt={2}>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    fullWidth
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    margin="normal"
                    size="small"
                    placeholder='Job Name'
                  />
                </Box>
                <Box mt={2}>
                  <InputLabel sx={{ color: 'black' }}>Job Assignees</InputLabel>
                  <Autocomplete
                    multiple
                    sx={{ marginTop: '8px' }}
                    options={assigneesoptions}
                    size='small'
                    getOptionLabel={(option) => option.label}
                    value={selectedUser}
                    onChange={handleUserChange}
                    // value={selectedAssigneesUser.map((value) =>
                    //   assigneesoptions.find((option) => option.value === value)
                    // )}

                    // onChange={handleJobAssigneesChange}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                      >
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" placeholder="Job Assignees" />
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                  />
                </Box>
                <Box mt={2}>
                <Priority onPriorityChange={handlePriorityChange}  selectedPriority={priority}/>

                </Box>
                <Box mt={2}>
                  {/* <Editor onChange={handleEditorChange} /> */}
                  <Editor initialContent={description} onChange={handleEditorChange}/>
                </Box>
                <Box mt={2}>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h6'>Start and Due Date</Typography>
                    <Box className='absolutes-dates'>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={absoluteDate}
                            // onChange={handleAbsolutesDates}
                            onChange={(event) => handleAbsolutesDates(event.target.checked)}
                            color="primary"
                          />
                        }
                        label={"Absolute Date"}
                      />
                    </Box>
                  </Box>
                </Box>
                {absoluteDate && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography>Start Date</Typography>
                      <DatePicker
                        format="DD/MM/YYYY"
                        sx={{ width: '100%', }}
                        // value={startDate}
                        // onChange={handleStartDateChange}
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
                        // value={dueDate}
                        // onChange={handleDueDateChange}
                        value={dueDate}
                        onChange={handleDueDateChange}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </Box>
                  </>
                )}
                {!absoluteDate && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>Start In</Typography>
                      <TextField
                        size='small'
                        margin='normal'
                        fullWidth
                        defaultValue={0}
                        sx={{ ml: 1 }}
                        value={startsin}
                        onChange={(e) => setstartsin(e.target.value)}
                      />
                      <Autocomplete
                        options={dayOptions}
                        size='small'
                        getOptionLabel={(option) => option.label}
                        value={startsInDuration ? dayOptions.find(option => option.value === startsInDuration) : null}
                        onChange={handleStartInDateChange}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                         isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderOption={(props, option) => (
                              <Box component="li" {...props} sx={{ cursor: 'pointer', margin: '5px 10px' }}>
                                {option.label}
                              </Box>
                            )}

                        // value={dayOptions.find((option) => option.value === startsInDuration) || null}
                        className="job-template-select-dropdown"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>Due In</Typography>
                      <TextField
                        size='small'
                        margin='normal'
                        fullWidth
                        defaultValue={0}
                        sx={{ ml: 1.5 }}
                        value={duein}
                            onChange={(e) => setduein(e.target.value)}
                        // onChange={(e) => setduein(e.target.value)}
                      />

                      <Autocomplete
                        options={dayOptions}
                        getOptionLabel={(option) => option.label}
                        // onChange={handledueindateChange}
                        value={dueinduration ? dayOptions.find(option => option.value === dueinduration) : null}
                        onChange={handleDueInDateChange}
                        size='small'
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderOption={(props, option) => (
                              <Box component="li" {...props} sx={{ cursor: 'pointer', margin: '5px 10px' }}>
                                {option.label}
                              </Box>
                            )}

                        // value={dayOptions.find((option) => option.value === dueinduration) || null}
                        className="job-template-select-dropdown"
                      />
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
              <Button variant="contained" color="primary" onClick={createjob}>Add</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateJob;


