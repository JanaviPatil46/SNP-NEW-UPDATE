import React, { useEffect, useState } from 'react';
import './pipeline.css'
import { useDrag, DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { Box, Button, CircularProgress,TextField, Autocomplete,Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import Select from 'react-select';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedPipelineOption, setSelectedPipelineOption] = useState(null);
  const [stages, setStages] = useState([]);
  const [pipelineId, setPipelineId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchPipelineData();
    fetchJobData();
  }, []);

  const fetchPipelineData = async () => {
    setLoading(true);
    try {
      const url = 'http://127.0.0.1:7500/workflow/pipeline/pipelines';
      const response = await fetch(url);
      const data = await response.json();
      setPipelineData(data.pipeline);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchJobData = async () => {
    try {
      const url = 'http://127.0.0.1:7550/workflow/jobs/job/joblist/list';
      const response = await fetch(url);
      const data = await response.json();
      console.log('Job Data:', data); // Log the response to inspect it
      setJobs(data.jobList);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };


  const fetchStages = async (pipelineId) => {
    try {
      const url = `http://127.0.0.1:7500/workflow/pipeline/pipeline/${pipelineId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch stages');
      }
      const data = await response.json();
      return data.pipeline.stages;
    } catch (error) {
      console.error('Error fetching stages:', error);
      return [];
    }
  };

  // const handleSelectChange = (option) => {
  //   setSelectedPipelineOption(option);
  //   if (option) {
  //     const pipeline = pipelineData.find(p => p.pipelineName === option.label);
  //     if (pipeline) {
  //       handleBoardsList(pipeline);
  //     }
  //   } else {
  //     handleBackToPipelineList();
  //   }
  // };
  const handleSelectChange = (event, option) => {
  setSelectedPipelineOption(option);
  
  if (option) {
    const pipeline = pipelineData.find(p => p.pipelineName === option.label);
    if (pipeline) {
      handleBoardsList(pipeline);
    }
  } 
  // else {
  //   handleBackToPipelineList();
  // }
};


  const handleBoardsList = async (pipeline) => {
    setSelectedPipeline(pipeline);
    setSelectedPipelineOption({ value: pipeline._id, label: pipeline.pipelineName });
    setPipelineId(pipeline._id);

    const fetchedStages = await fetchStages(pipeline._id);
    setStages(fetchedStages);
  };

  const handleBackToPipelineList = () => {
    setSelectedPipeline(null);
    setSelectedPipelineOption(null);
    setStages([]);
  };



  const updateJobStage = async (stage, item) => {
    let data = JSON.stringify({ "stageid": stage._id });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:7550/workflow/jobs/job/jobpipeline/updatestageid/${item.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: data
    };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const JobCard = ({ job }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'JOB_CARD',
      item: { id: job.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
    const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date(job.createdAt));

    useEffect(() => {
      if (job.updatedAt) {
        setLastUpdatedTime(new Date(job.updatedAt));
      }
    }, [job.updatedAt]);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setLastUpdatedTime(prevTime => new Date(prevTime));
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const updateLastUpdatedTime = () => {
      setLastUpdatedTime(new Date());
      console.log(new Date());
    };

    const timeAgo = () => {
      const currentTime = new Date();
      const jobTime = lastUpdatedTime;

      const minutesDiff = differenceInMinutes(currentTime, jobTime);
      const hoursDiff = differenceInHours(currentTime, jobTime);
      const daysDiff = differenceInDays(currentTime, jobTime);

      if (minutesDiff < 1) {
        return 'just now';
      } else if (minutesDiff < 60) {
        return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`;
      } else if (hoursDiff < 24) {
        return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
      } else {
        return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
      }
    };

    const stripHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    const truncateDescription = (description, maxLength = 50) => {
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
      }
      return description;
    };

    const getPriorityStyle = (priority) => {
      switch (priority.toLowerCase()) {
        case 'urgent':
          return { color: 'white', backgroundColor: '#0E0402', fontSize: '12px', borderRadius: '50px', padding: '3px 7px' };
        case 'high':
          return { color: 'white', backgroundColor: '#fe676e', fontSize: '12px', borderRadius: '50px', padding: '3px 7px' }; // light red background
        case 'medium':
          return { color: 'white', backgroundColor: '#FFC300', fontSize: '12px', borderRadius: '50px', padding: '3px 7px' }; // light orange background
        case 'low':
          return { color: 'white', backgroundColor: '#56c288', fontSize: '12px', borderRadius: '50px', padding: '3px 7px' }; // light green background
        default:
          return {};
      }
    };

    const truncateName = (name) => {
      const maxLength = 15;
      if (name.length > maxLength) {
        return name.substring(0, maxLength) + '...';
      }
      return name;
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    const startDateFormatted = formatDate(job.StartDate);
    const dueDateFormatted = formatDate(job.DueDate);

    return (
      <Box className={`job-card ${isDragging ? 'dragging' : ''}`}
        ref={drag}
      
        onDrop={updateLastUpdatedTime}
      >
        <Typography>{job.Account.join(', ')}</Typography>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
          {truncateName(job.Name)}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>{job.JobAssignee.join(', ')}</Typography>
        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
          {truncateDescription(stripHtmlTags(job.Description))}
        </Typography>

        <span style={getPriorityStyle(job.Priority)}>{job.Priority}</span>

        <br />

        <Typography variant="body2" sx={{ marginBottom: '4px', mt: 2 }}>
          Starts : {startDateFormatted}
        </Typography>
        <Typography variant="body2">
          Due : {dueDateFormatted}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '5px', mt: 2 }}>
          {timeAgo()}
        </Typography>
      </Box>
    );
  };


  
  const Stage = ({ stage, selectedPipeline, handleDrop }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'JOB_CARD',
      drop: (item, monitor) => {
        handleDrop(item.id, stage.name);
        console.log(item.id);
        console.log(stage.name);
        console.log(stage._id);
        updateJobStage(stage, item);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    const stageJobs = jobs.filter(job => job.Pipeline === selectedPipeline.pipelineName && job.Stage.includes(stage.name));
    const [displayCount, setDisplayCount] = useState(3);
    const displayedJobs = stageJobs.slice(0, displayCount);

    return (
      <Box
        ref={drop} className={`stage ${isOver ? 'drag-over' : ''}`}
        
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>
          {stage.name}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '12px' }}>
          {stageJobs.length > 0 && <span>({stageJobs.length})</span>}
        </Typography>
        {displayedJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
        {stageJobs.length > displayCount && (
          <Button
            variant="outlined"
            onClick={() => setDisplayCount(displayCount + 5)}
            sx={{ marginTop: '16px', alignSelf: 'center' }}
          >
            Load More
          </Button>
        )}
      </Box>
    );
  };


  const optionpipeline = pipelineData.map(pipeline => ({
    value: pipeline._id,
    label: pipeline.pipelineName
  }));
  const handleDrop = (jobId, stageName) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, Stage: [stageName] };
      }
      return job;
    });
    setJobs(updatedJobs);
    setTimeout(() => {
      fetchJobData();
    }, 1000);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={3}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : selectedPipeline ? (
          <>
            <Box mb={2}>
              {/* <Select
                value={selectedPipelineOption}
                onChange={handleSelectChange}
                options={optionpipeline}
                isClearable
                placeholder="Search pipelines..."
                className="pipeline-select"
                isSearchable
              /> */}
               <Autocomplete
      value={selectedPipelineOption}
      onChange={handleSelectChange}
      options={optionpipeline}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      renderInput={(params) => (
        <TextField
          {...params}
          // label="Search pipelines..."
          placeholder="Search pipelines..."
        />
      )}
      // isClearable
      className="pipeline-select"
    />
              <Button variant="outlined" color="primary" onClick={handleBackToPipelineList} sx={{ mt: 2 }}>
                Back to Pipeline List
              </Button>
            </Box>
            <Box>

              <Box display="flex" gap={2}>
                {stages.map((stage, index) => (
                  <Stage key={index} stage={stage} selectedPipeline={selectedPipeline} handleDrop={handleDrop} />
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Pipeline List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PIPELINE NAME</TableCell>
                    <TableCell>JOBS</TableCell>
                    <TableCell>SCHEDULE</TableCell>
                    <TableCell>START DATE</TableCell>
                    <TableCell>END DATE</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pipelineData.map((pipeline, index) => (
                    <TableRow key={index} hover>
                      <TableCell
                        onClick={() => handleBoardsList(pipeline)}
                        sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        {pipeline.pipelineName}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </DndProvider>
  );
};

export default Pipeline;
