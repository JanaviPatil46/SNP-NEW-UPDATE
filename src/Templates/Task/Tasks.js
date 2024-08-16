import React, { useState, useEffect } from 'react';


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
  Autocomplete,
  TextField,
 

  Switch,
  FormControlLabel,
  Chip

} from '@mui/material';

import Editor from '../Texteditor/Editor';
import Grid from '@mui/material/Unstable_Grid2';
import Priority from '../Priority/Priority';
import Status from '../Status/Status';
import { toast } from "react-toastify";

const Tasks = () => {
  const [templatename, settemplatename] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [startsin, setstartsin] = useState("");
  const [duein, setduein] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [absoluteDate, setAbsoluteDates] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [startsInDuration, setStartsInDuration] = useState(null);
  const [dueinduration, setdueinduration] = useState("");
  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  const dayOptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];


  // Handler function to update state when dropdown value changes
  const handleStartInDateChange = (event, newValue) => {
    setStartsInDuration(newValue ? newValue.value : null);
  };
  // Handler function to update state when dropdown value changes
  const handledueindateChange = (event, newValue) => {
    setdueinduration(newValue ? newValue.value : null);
  };
  const handleCreateTask = () => {
    setShowForm(true);
  };
  const handleCloseTaskTemp = () => {
    setShowForm(false);
  };
  const handlePriorityChange = (priority) => {
    setPriority(priority);
  };
  const handleStatusChange = (status) => {
    setStatus(status);
  };
  const [description, setDescription] = useState('');
  const handleEditorChange = (content) => {
    setDescription(content);
  };
  const [selectedUser, setSelectedUser] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);
  const [userData, setUserData] = useState([]);

  console.log(combinedValues)
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
  const options = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));
  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  };

  //Tag FetchData ================
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [combinedTagsValues, setCombinedTagsValues] = useState([]);
  useEffect(() => {
    fetchTagData();
  }, []);

  const fetchTagData = async () => {
    try {

      const url = 'http://127.0.0.1:7500/tags/';

      const response = await fetch(url);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //  for tags
  const calculateWidth = (tagName) => {

    const baseWidth = 10; // base width for each tag
    const charWidth = 8; // approximate width of each character
    const padding = 10; // padding on either side
    return baseWidth + (charWidth * tagName.length) + padding;
  };


  const tagsoptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "8px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      padding: "2px,8px",
      fontSize: '10px',
      width: `${calculateWidth(tag.tagName)}px`,
      margin: '7px', cursor: 'pointer',
    },
    customTagStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      alignItems: "center",
      textAlign: "center",
      padding: "2px,8px",
      fontSize: '10px',
      cursor: 'pointer',
    },
  }));
  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue.map((option) => option.value));

    // Send selectedValues array to your backend
    console.log("Selected Values:", newValue.map((option) => option.value));
    // Assuming setCombinedValues is a function to send the values to your backend
    setCombinedTagsValues(newValue.map((option) => option.value));
  };

  // task temp
  const [TaskTemplates, setTaskTemplates] = useState([]);
 
  useEffect(() =>{
    fetchTaskData();
  })
  const fetchTaskData = async () => {
    try {

      const url = 'http://127.0.0.1:7500/workflow/tasks/tasktemplate/';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch task templates");
      }
      const data = await response.json();
      console.log(data)
      setTaskTemplates(data.TaskTemplates
      );
    } catch (error) {
      console.error("Error fetching task templates:", error);
    }
};
  const createTaskTemp = () => {
    if (absoluteDate === true) {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        status: status.value,
        taskassignees: combinedValues,
        tags: combinedTagsValues,
        priority: priority.value,
        description: description,
        absolutedates: absoluteDate,
        comments: "",
        startdate: startDate,
        enddate: dueDate,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = 'http://127.0.0.1:7500/workflow/tasks/tasktemplate/';
      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          // Handle success
          toast.success("Task Template created successfully");
          resetFields();
          fetchTaskData();
          handleCloseTaskTemp();
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          toast.error("Failed to create Task Template");
        });
    } else if (absoluteDate === false) {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        status: status.value,
        taskassignees: combinedValues,
        tags: combinedTagsValues,
        priority: priority.value,
        description: description,
        absolutedates: absoluteDate,
        startsin: startsin,
        startsinduration: startsInDuration,
        duein: duein,
        dueinduration: dueinduration,
       
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = 'http://127.0.0.1:7500/workflow/tasks/tasktemplate/';
      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          // Handle success
          toast.success("Task Template created successfully");
          resetFields();
          fetchTaskData();
          handleCloseTaskTemp();
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          toast.error("Failed to create Task Template");
        });
    }
  };
   const resetFields = () => {
    setDescription('');
    setSelectedTags([]);
    setAbsoluteDates(false);
    setStartDate(null);
    setDueDate(null);
    setPriority("");
    setSelectedUser([]);
    settemplatename("");
    setStatus("");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  {TaskTemplates.map((template) => (
                    <TableRow key={template._id}>
                      <TableCell>{template.templatename}</TableCell>
                      <TableCell>
                       
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Box>
              <form>
                <Box className='box-b'>
                  <Typography variant='h5' gutterBottom>Create Task Template</Typography>
                  <Box mt={2} mb={2}><hr /></Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5.8}>

                      <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <label  className='task-input-label' >Template Name</label>
                              <TextField
                                fullWidth
                                name="TemplateName"
                                placeholder="Template Name"
                                size="small"
                                sx={{background:'#fff',mt: 1}}
                                
                                onChange={(e) => settemplatename(e.target.value)}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Status onStatusChange={handleStatusChange} selectedStatus={status} />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>



                      <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <label  className='task-input-label'>Task Assignee</label>
                              <Autocomplete
                                multiple
                                sx={{background:'#fff',mt: 1}}
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
                                  <TextField {...params} variant="outlined" placeholder="Assignees" />
                                )}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ mt: 3, }}>
                        <Editor onChange={handleEditorChange} content={description} />
                      </Box>
                      <Box mt={2}>

                        <label  className='task-input-label'>Tags</label>

                        <Autocomplete
                          multiple
                          size='small'
                          id="tags-outlined"
                          options={tagsoptions}
                          getOptionLabel={(option) => option.label}
                          value={tagsoptions.filter(option => selectedTags.includes(option.value))}
                          onChange={handleTagChange}
                          renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                              <Chip
                                key={option.value}
                                label={option.label}
                                style={option.customTagStyle}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"

                              placeholder="Tags"
                              sx={{ width: '100%', marginTop: '8px', backgroundColor:'#fff' }}
                            />
                          )}
                          renderOption={(props, option) => (
                            <Box component="li" {...props} style={option.customStyle}>
                              {option.label}
                            </Box>
                          )}
                        />

                      </Box>
                      <Box mt={2}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                          <Typography variant='h6' className='task-input-label'>Start and Due Date</Typography>
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
                            <Typography className='task-input-label'>Start Date</Typography>
                            <DatePicker
                              format="DD/MM/YYYY"
                              sx={{ width: '100%',backgroundColor:'#fff' }}
                              // value={startDate}
                              // onChange={handleStartDateChange}
                              selected={startDate} onChange={handleStartDateChange}
                              renderInput={(params) => <TextField {...params} size="small" />}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography className='task-input-label'>Due Date</Typography>
                            <DatePicker
                              format="DD/MM/YYYY"
                              sx={{ width: '100%', backgroundColor:'#fff'}}
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
                            <Typography className='task-input-label'>Start In</Typography>
                            <TextField
                              size='small'
                              margin='normal'
                              fullWidth
                              defaultValue={0}
                              value={startsin}
                              sx={{background:'#fff',ml: 1.5}}
                              onChange={(e) => setstartsin(e.target.value)}
                            />
                            <Autocomplete
                              options={dayOptions}
                              size='small'
                              getOptionLabel={(option) => option.label}
                              onChange={handleStartInDateChange}
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" sx={{backgroundColor:'#fff'}} />
                              )}
                              value={dayOptions.find((option) => option.value === startsInDuration) || null}
                              className="job-template-select-dropdown"
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography className='task-input-label'>Due In</Typography>
                            <TextField
                              size='small'
                              margin='normal'
                              value={duein}
                              fullWidth
                              defaultValue={0}
                              
                              sx={{background:'#fff',ml: 1.8,}}
                              onChange={(e) => setduein(e.target.value)}
                            />

                            <Autocomplete
                              options={dayOptions}
                              getOptionLabel={(option) => option.label}
                              onChange={handledueindateChange}

                              size='small'
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" sx={{backgroundColor:'#fff'}}/>
                              )}
                              value={dayOptions.find((option) => option.value === dueinduration) || null}
                              className="job-template-select-dropdown"
                            />
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
                    <Grid item xs={12} sm={5.8} >

                    </Grid>
                  </Grid>
                  <Box mt={2} mb={2}><hr /></Box>
                  <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Button variant="contained" color="primary" onClick={createTaskTemp}>Save</Button>
                    <Button variant="outlined" onClick={handleCloseTaskTemp}>Cancel</Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default Tasks;