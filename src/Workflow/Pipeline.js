// import { Box } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';

// const Pipeline = () => {
//   const [pipelineData, setPipelineData] = useState([]);
//   const [selectedPipeline, setSelectedPipeline] = useState(null);
//   const [selectedPipelineOption, setSelectedPipelineOption] = useState(null);
//   const [stages, setStages] = useState([]);
//   const [pipelineId, setPipelineId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSelectChange = (option) => {
//     setSelectedPipelineOption(option);
//     if (option) {
//       const pipeline = pipelineData.find(p => p.pipelineName === option.label);
//       if (pipeline) {
//         handleBoardsList(pipeline);
//       }
//     } else {
//       handleBackToPipelineList();
//     }
//   };

//   useEffect(() => {
//     fetchPipelineData();
//   }, []);

//   const fetchPipelineData = async () => {
//     setLoading(true);
//     try {
//       const url = 'http://127.0.0.1:7500/workflow/pipeline/pipelines';
//       const response = await fetch(url);
//       const data = await response.json();
//       setPipelineData(data.pipeline);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStages = async (pipelineId) => {
//     try {
//       const url = `http://127.0.0.1:7500/workflow/pipeline/pipeline/${pipelineId}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch stages');
//       }
//       const data = await response.json();
//       return data.pipeline.stages;
//     } catch (error) {
//       console.error('Error fetching stages:', error);
//       return [];
//     }
//   };

//   const handleBackToPipelineList = () => {
//     setSelectedPipeline(null);
//     setSelectedPipelineOption(null);
//     setStages([]);
//   };

//   const handleBoardsList = async (pipeline) => {
//     setSelectedPipeline(pipeline);
//     setSelectedPipelineOption({ value: pipeline._id, label: pipeline.pipelineName });
//     setPipelineId(pipeline._id);

//     const fetchedStages = await fetchStages(pipeline._id);
//     setStages(fetchedStages);
//   };

//   const optionpipeline = pipelineData.map(pipeline => ({
//     value: pipeline._id,
//     label: pipeline.pipelineName
//   }));



//   return (
//     <Box>
//       {loading ? (
//         <p>Loading...</p>
//       ) : selectedPipeline ? (
//         <>
//           <div className="board-header">
//             <Select
//               value={selectedPipelineOption}
//               onChange={handleSelectChange}
//               options={optionpipeline}
//               isClearable
//               placeholder="Search pipelines..."
//               className="pipeline-select"
//               isSearchable
//             />
//             <button className="btn1" onClick={handleBackToPipelineList}>Back to Pipeline List</button>
//           </div>
//           <div>
//             <h3>Stages:</h3>
//             <ul>
//               {stages.length > 0 ? (
//                 stages.map(stage => (
//                   <li key={stage._id}>{stage.name}</li>
//                 ))
//               ) : (
//                 <li>No stages available</li>
//               )}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <>
//           <h2>Pipeline List</h2>
//           <table className="pipeline-table" style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th>PIPELINE NAME</th>
//                 <th>JOBS</th>
//                 <th>SCHEDULE</th>
//                 <th>START DATE</th>
//                 <th>END DATE</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {pipelineData.map((pipeline, index) => (
//                 <tr key={index}>
//                   <td
//                     onClick={() => handleBoardsList(pipeline)}
//                     style={{ color: 'blue', cursor: 'pointer', fontWeight: '750' }}
//                   >
//                     {pipeline.pipelineName}
//                   </td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Pipeline;

import { useDrag, DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Button, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedPipelineOption, setSelectedPipelineOption] = useState(null);
  const [stages, setStages] = useState([]);
  const [pipelineId, setPipelineId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (option) => {
    setSelectedPipelineOption(option);
    if (option) {
      const pipeline = pipelineData.find(p => p.pipelineName === option.label);
      if (pipeline) {
        handleBoardsList(pipeline);
      }
    } else {
      handleBackToPipelineList();
    }
  };

  useEffect(() => {
    fetchPipelineData();
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

  const handleBackToPipelineList = () => {
    setSelectedPipeline(null);
    setSelectedPipelineOption(null);
    setStages([]);
  };

  const handleBoardsList = async (pipeline) => {
    setSelectedPipeline(pipeline);
    setSelectedPipelineOption({ value: pipeline._id, label: pipeline.pipelineName });
    setPipelineId(pipeline._id);

    const fetchedStages = await fetchStages(pipeline._id);
    setStages(fetchedStages);
  };

  const optionpipeline = pipelineData.map(pipeline => ({
    value: pipeline._id,
    label: pipeline.pipelineName
  }));
  // job data
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobData();
  }, [])
  const fetchJobData = async () => {
    try {

      const url = 'http://127.0.0.1:7550/workflow/job/joblist/list/';
      const response = await fetch(url);
      const data = await response.json();
      setJobs(data.jobList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateJobStage = async (stage, item) => {
    let data = JSON.stringify({
      "stageid": stage._id
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:7550/workflow/job/jobpipeline/updatestageid/${item.id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const Stage = ({ stage, selectedPipeline, jobs, handleDrop }) => {
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


    return (
      <Box >
        <Box

          ref={drop}
          className={`stage ${isOver ? 'drag-over' : ''}`}
        >
          <Box sx={{  minWidth: '150px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        padding: '8px',
        marginBottom: '8px', }}>
            <span>{stage.name}</span>

          </Box>

        </Box>
      </Box>

    );
  };


  const handleDrop = (jobId, stageName) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, Stage: [stageName] };
      }
      return job;
    });
    setJobs(updatedJobs);
    // fetchJobData();
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
              <Select
                value={selectedPipelineOption}
                onChange={handleSelectChange}
                options={optionpipeline}
                isClearable
                placeholder="Search pipelines..."
                className="pipeline-select"
                isSearchable
              />
              <Button variant="outlined" color="primary" onClick={handleBackToPipelineList} sx={{ mt: 2 }}>
                Back to Pipeline List
              </Button>
            </Box>
            <Box>
              <Typography variant="h6">Stages:</Typography>
              <Box display={'flex'} gap={2}
              
              >


                {stages.map(stage => (
                  <Stage
                    key={stage._id}
                    stage={stage}
                    selectedPipeline={selectedPipeline}
                    jobs={jobs}
                    handleDrop={handleDrop}

                  />
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
