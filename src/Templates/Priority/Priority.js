import React from "react";
import { Select,InputLabel, MenuItem, Box,  OutlinedInput } from "@mui/material";

const Priority = ({ onPriorityChange, selectedPriority }) => {
  const options = [
    { value: "Urgent", label: "Urgent", color: "#0E0402" },
    { value: "High", label: "High", color: "#fe676e" },
    { value: "Medium", label: "Medium", color: "#FFC300" },
    { value: "Low", label: "Low", color: "#56c288" },
  ];

  const handleChange = (event) => {
    onPriorityChange(event.target.value);
    console.log("handleChange", event.target.value);
  };

  const calculateWidth = (label) => {
    const textWidth = label.length * 8; // Adjust multiplier as needed
    return Math.min(textWidth + 20, 250); // Max width with padding
  };
  return (
    <Box >
     <InputLabel sx={{ color: 'black' }}>Priority</InputLabel>
     <Select
     sx={{ width: '100%', marginTop: '8px' }}
     size="small"
        value={selectedPriority}
        onChange={handleChange}
        input={<OutlinedInput  />}
        renderValue={(selected) => {
          const selectedOption = options.find(option => option.value === selected);
          return (
            <div
              style={{
                
                backgroundColor: selectedOption ? selectedOption.color : 'transparent',
                color: '#fff',
                borderRadius: '15px',
                padding: '2px 8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                width: selectedOption ? `${calculateWidth(selectedOption.label)}px` : 'auto',
              }}
            >
              {selectedOption ? selectedOption.label : ''}
            </div>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
              width: calculateWidth("Low") + 20, // Adjust based on the widest option
            },
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{
              backgroundColor: option.color,
              color: '#fff',
              borderRadius: '15px',
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              margin: '7px',
              width: `${calculateWidth(option.label)}px`, // Dynamic width
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Priority;
