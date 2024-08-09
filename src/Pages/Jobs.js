// import React from 'react'

// const Jobs = () => {
//   return (
//     <div>
//       jobs
//     </div>
//   )
// }

// export default Jobs


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { format, formatDistanceToNow } from 'date-fns';

import { Stack} from "@mui/material";
import { useMediaQuery, } from "@mui/material";

const Example = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const jobListResponse = await axios.get('http://127.0.0.1:7550/workflow/jobs/job/joblist/list');
      const formattedData = jobListResponse.data.jobList.map(job => ({
        ...job,
        StartDate: format(new Date(job.StartDate), 'MMMM dd, yyyy'),
        DueDate: format(new Date(job.DueDate), 'MMMM dd, yyyy'),
        updatedAt: formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true }),
        JobAssignee: Array.isArray(job.JobAssignee) ? job.JobAssignee.join(', ') : job.JobAssignee,
      }));
      setJobData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'JobAssignee',
        header: 'Job Assignee',
        size: 150,
        
      },
      {
        accessorKey: 'Pipeline',
        header: 'Pipeline',
        size: 200,
        
      },
      {
        accessorKey: 'Stage',
        header: 'Stage',
        size: 150,
      },
      {
        accessorKey: 'Account',
        header: 'Account',
        size: 150,
        
      },
      {
        accessorKey: 'StartDate',
        header: 'Start Date',
        size: 150,
      },
      {
        accessorKey: 'DueDate',
        header: 'Due Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Time in current stage',
        size: 150,
      },
      
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: jobData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom",
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "Name"] },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
    <div>
      <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
        
        <MaterialReactTable columns={columns} table={table} />
        
      </Stack>
    </div>
  );
};

export default Example
