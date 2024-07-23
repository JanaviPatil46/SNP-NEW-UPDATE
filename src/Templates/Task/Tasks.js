// import React from 'react'

// const Tasks = () => {
//   return (
//     <div>Tasks</div>
//   )
// }

// export default Tasks

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    
    <>
  
      <InputLabel id="demo-select-small-label">Age</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        // label="Age"
        onChange={handleChange}
        sx={{width:'100%'}}
        size="small"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <TextField
         fullWidth
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
       
      </>
    
  );
}
