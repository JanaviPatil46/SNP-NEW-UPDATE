import { Box, Button, Grid, Typography, TextField, InputLabel, Select, MenuItem,  Switch, FormControlLabel, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Priority from '../Templates/Priority/Priority';
import Editor from '../Templates/Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
// Initialize the plugin
dayjs.extend(customParseFormat);
const CreateJob = () => {
  // State to keep track of selected values

 
  
  const [description, setDescription]= useState('');
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [absoluteDate, setAbsoluteDates] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [startsInDuration, setStartsInDuration] = useState(null);
  const [dueinduration, setdueinduration] = useState("");
  const [startsin, setstartsin] = useState("");
  const [duein, setduein] = useState("");
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
  const handledueindateChange = (event, newValue) => {
    setdueinduration(newValue ? newValue.value : null);
  };
 

 
  
  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };
  const handleAbsolutesDates= (checked) => {
    setAbsoluteDates(checked);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const [selectedUser, setSelectedUser] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);
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

  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  };
  const options = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));

   const [selectedAssigneesUser, setSelecteAssigneesdUser] = useState([]);
   const [combinedAssigneesValues, setCombinedAssigneesValues] = useState([]);
  const handleJobAssigneesChange = (event, selectedOptions) => {
    setSelecteAssigneesdUser(selectedOptions);
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
  const handletemp = (selectedOptions) => {
    setselectedTemp(selectedOptions);
    console.log(selectedOptions)
  }
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

//   const createjob = () => {
  
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//         accounts: combinedValues,
//         pipeline: selectedPipeline.value,
//         templatename: selectedtemp.value,
//         jobname: jobName,
//         jobassignees: combinedAssigneesValues,
//         priority: priority.value,
//         description: description,
//         absolutedates: absoluteDate,
//         startsin: startsin,
//         startsinduration: startsInDuration,
//         duein: duein,
//         dueinduration: dueinduration,
//         comments: "",
//         startdate: startDate,
//         enddate: dueDate,
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//     };

//     fetch( 'http://127.0.0.1:7550/workflow/jobs/job', requestOptions)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })

//         .then((result) => {
//             // Handle success
//             console.log("Job Template created successfully")
//             // toast.success("Job Template created successfully");
//             // window.location.reload()

//         })
//         .catch((error) => {
//             // Handle errors
//             console.error(error);
//             // toast.error("Failed to create Job Template");
//         })

// }
const createjob = () => {
  
    const myHeaders = {
        "Content-Type": "application/json"
    };

    const data = {
        accounts: combinedValues,
        pipeline: selectedPipeline.value,
        templatename: selectedtemp.value,
        jobname: jobName,
        jobassignees: combinedAssigneesValues,
        priority: priority.value,
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
            console.log("Job Template created successfully");
            console.log(JSON.stringify(response.data));
            // Handle success, e.g., toast or redirect
        })
        .catch((error) => {
            console.error("Failed to create Job Template:", error);
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
                    sx={{ marginTop: '8px' }}
                    options={options}
                    size='small'
                    getOptionLabel={(option) => option.label}
                    value={selectedUser}
                    onChange={handleUserChange}
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
                      <TextField {...params} variant="outlined" placeholder="Available To" />
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
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
                    onChange={(event, newValue) => handletemp(newValue)}
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
                    // value={jobName}
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
                    value={selectedAssigneesUser}
                    onChange={handleJobAssigneesChange}
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
                  <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
                </Box>
                <Box mt={2}>
                <Editor onChange={handleEditorChange} />
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
                        selected={startDate} onChange={handleStartDateChange}
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
                        selected={dueDate} onChange={handleDueDateChange}
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
                        onChange={(e) => setstartsin(e.target.value)}
                      />
                      <Autocomplete
                        options={dayOptions}
                        size='small'
                        getOptionLabel={(option) => option.label}
                        onChange={handleStartInDateChange}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        value={dayOptions.find((option) => option.value === startsInDuration) || null}
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
                        onChange={(e) => setduein(e.target.value)}
                      />
                      
                      <Autocomplete
                        options={dayOptions}
                        getOptionLabel={(option) => option.label}
                         onChange={handledueindateChange}

                        size='small'
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        value={dayOptions.find((option) => option.value === dueinduration) || null}
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


