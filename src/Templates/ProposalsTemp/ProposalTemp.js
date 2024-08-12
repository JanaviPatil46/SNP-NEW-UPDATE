// import React, { useState } from 'react';
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   TextField,
//   FormControl,
//   FormControlLabel,
//   RadioGroup,
//   Radio,
// } from '@mui/material';

// const steps = ['General', 'Introduction', 'Terms', 'Services & Invoices'];

// const MyStepper = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [showStepper, setShowStepper] = useState(false);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setShowStepper(false); // Hide stepper and show the create template button
//   };

//   const handleStepClick = (step) => {
//     setActiveStep(step);
//   };

//   const handleCreateTemplateClick = () => {
//     setShowStepper(true);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box>
//             <Typography variant="h6">General Information</Typography>
//             <TextField
//               label="Template Name"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Description"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       case 1:
//         return (
//           <Box>
//             <Typography variant="h6">Introduction Details</Typography>
//             <TextField
//               label="Introduction Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Introduction Text"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       case 2:
//         return (
//           <Box>
//             <Typography variant="h6">Terms and Conditions</Typography>
//             <TextField
//               label="Terms Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Terms Details"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       case 3:
//         return (
//           <Box>
//             <Typography variant="h6">Services & Invoices</Typography>
//             <FormControl component="fieldset">
//               <Typography>Choose Service Type</Typography>
//               <RadioGroup row>
//                 <FormControlLabel
//                   value="service1"
//                   control={<Radio />}
//                   label="Service 1"
//                 />
//                 <FormControlLabel
//                   value="service2"
//                   control={<Radio />}
//                   label="Service 2"
//                 />
//                 <FormControlLabel
//                   value="service3"
//                   control={<Radio />}
//                   label="Service 3"
//                 />
//               </RadioGroup>
//             </FormControl>
//             <TextField
//               label="Invoice Amount"
//               variant="outlined"
//               type="number"
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       default:
//         return <Typography>Unknown Step</Typography>;
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', p: 2 }}>
//       {showStepper ? (
//         <Grid container spacing={3}>
//           <Grid item xs={8}>
//             <Stepper activeStep={activeStep}>
//               {steps.map((label, index) => (
//                 <Step key={index} onClick={() => handleStepClick(index)}>
//                   <StepLabel style={{ cursor: 'pointer' }}>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <Box sx={{ mt: 2 }}>
//               {renderStepContent(activeStep)}
//             </Box>
//           </Grid>
//           <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
//               >
//                 {activeStep === steps.length - 1 ? 'Save Template' : 'Next'}
//               </Button>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 variant="outlined"
//               >
//                 Back
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       ) : (
//         <Button variant="contained" onClick={handleCreateTemplateClick}>
//           Create Template
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default MyStepper;


// import React, { useState } from 'react';
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   TextField,
//   FormControl,
//   FormControlLabel,
//   RadioGroup,
//   Radio,
// } from '@mui/material';

// const steps = ['General', 'Introduction', 'Terms', 'Services & Invoices'];

// const MyStepper = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [showStepper, setShowStepper] = useState(false);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setShowStepper(false); // Hide stepper and show the create template button
//   };

//   const handleStepClick = (step) => {
//     setActiveStep(step);
//   };

//   const handleCreateTemplateClick = () => {
//     setShowStepper(true);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box>
//             <Typography variant="h6">General Information</Typography>
           
//           </Box>
//         );
//       case 1:
//         return (
//           <Box>
//             <Typography variant="h6">Introduction Details</Typography>
//             <TextField
//               label="Introduction Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Introduction Text"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       case 2:
//         return (
//           <Box>
//             <Typography variant="h6">Terms and Conditions</Typography>
//             <TextField
//               label="Terms Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Terms Details"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       case 3:
//         return (
//           <Box>
//             <Typography variant="h6">Services & Invoices</Typography>
//             <FormControl component="fieldset">
//               <Typography>Choose Service Type</Typography>
//               <RadioGroup row>
//                 <FormControlLabel
//                   value="service1"
//                   control={<Radio />}
//                   label="Service 1"
//                 />
//                 <FormControlLabel
//                   value="service2"
//                   control={<Radio />}
//                   label="Service 2"
//                 />
//                 <FormControlLabel
//                   value="service3"
//                   control={<Radio />}
//                   label="Service 3"
//                 />
//               </RadioGroup>
//             </FormControl>
//             <TextField
//               label="Invoice Amount"
//               variant="outlined"
//               type="number"
//               fullWidth
//               margin="normal"
//             />
//           </Box>
//         );
//       default:
//         return <Typography>Unknown Step</Typography>;
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', p: 2 }}>
//       {showStepper ? (
//         <Grid container spacing={3}>
//           <Grid item xs={8}>
//             <Stepper activeStep={activeStep}>
//               {steps.map((label, index) => (
//                 <Step key={index} onClick={() => handleStepClick(index)}>
//                   <StepLabel style={{ cursor: 'pointer' }}>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <Box sx={{ mt: 2 }}>
//               {renderStepContent(activeStep)}
//             </Box>
//           </Grid>
//           <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
//               >
//                 {activeStep === steps.length - 1 ? 'Save Template' : 'Next'}
//               </Button>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 variant="outlined"
//               >
//                 Back
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       ) : (
//         <Button variant="contained" onClick={handleCreateTemplateClick}>
//           Create Template
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default MyStepper;

// const handleBack = () => {
  //   setActiveStep((prevActiveStep) => {
  //     const previousStep = steps
  //       .slice(0, prevActiveStep)
  //       .reverse()
  //       .find((_, index) => stepVisibility[prevActiveStep - 1 - index]);

  //     return previousStep !== undefined ? steps.indexOf(previousStep) : prevActiveStep;
  //   });
  // };


  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
  // const handleStepClick = (step) => {
  //   setActiveStep(step);
  // };
    // const handleSwitchChange = (step) => (event) => {
  //   setStepVisibility((prevVisibility) => ({
  //     ...prevVisibility,
  //     [step]: event.target.checked
  //   }));
  // };



import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch
} from '@mui/material';

const steps = ['General', 'Introduction', 'Terms', 'Services & Invoices'];

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showStepper, setShowStepper] = useState(false);
  const [stepVisibility, setStepVisibility] = useState({
    1: true, // Introduction
    2: true, // Terms
    3: true  // Services & Invoices
  });

  // Update active step when step visibility changes
  useEffect(() => {
    if (stepVisibility[activeStep] === false) {
      const nextStep = steps
        .slice(activeStep + 1)
        .find((_, index) => stepVisibility[activeStep + 1 + index]);

      if (nextStep !== undefined) {
        setActiveStep(steps.indexOf(nextStep));
      }
    }
  }, [stepVisibility, activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = steps
        .slice(prevActiveStep + 1)
        .find((_, index) => stepVisibility[prevActiveStep + 1 + index]);

      return nextStep !== undefined ? steps.indexOf(nextStep) : prevActiveStep;
    });
  };

  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setShowStepper(false); // Hide stepper and show the create template button
  };

  
  const handleStepClick = (step) => {
    if (stepVisibility[step]) {
      setActiveStep(step);
    }
  };


  const handleCreateTemplateClick = () => {
    setShowStepper(true);
  };



  const handleSwitchChange = (step) => (event) => {
    setStepVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility, [step]: event.target.checked };

      // Adjust the active step if necessary
      if (!event.target.checked && step === activeStep) {
        const nextStep = steps
          .slice(activeStep + 1)
          .find((_, index) => newVisibility[activeStep + 1 + index]);

        if (nextStep !== undefined) {
          setActiveStep(steps.indexOf(nextStep));
        }
      }

      return newVisibility;
    });
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">General Information</Typography>
            <FormControl component="fieldset">
              <Typography>Show Steps</Typography>
              <FormControlLabel
                control={<Switch checked={stepVisibility[1]} onChange={handleSwitchChange(1)} />}
                label="Introduction"
              />
              <FormControlLabel
                control={<Switch checked={stepVisibility[2]} onChange={handleSwitchChange(2)} />}
                label="Terms"
              />
              <FormControlLabel
                control={<Switch checked={stepVisibility[3]} onChange={handleSwitchChange(3)} />}
                label="Services & Invoices"
              />
            </FormControl>
          </Box>
        );
      case 1:
        return stepVisibility[1] && (
          <Box>
            <Typography variant="h6">Introduction Details</Typography>
            <TextField
              label="Introduction Title"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Introduction Text"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return stepVisibility[2] && (
          <Box>
            <Typography variant="h6">Terms and Conditions</Typography>
            <TextField
              label="Terms Title"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Terms Details"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 3:
        return stepVisibility[3] && (
          <Box>
            <Typography variant="h6">Services & Invoices</Typography>
            <FormControl component="fieldset">
              <Typography>Choose Service Type</Typography>
              <RadioGroup row>
                <FormControlLabel
                  value="service1"
                  control={<Radio />}
                  label="Service 1"
                />
                <FormControlLabel
                  value="service2"
                  control={<Radio />}
                  label="Service 2"
                />
                <FormControlLabel
                  value="service3"
                  control={<Radio />}
                  label="Service 3"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Invoice Amount"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {showStepper ? (
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                stepVisibility[index] !== false && (
                  <Step key={index} onClick={() => handleStepClick(index)}>
                    <StepLabel style={{ cursor: 'pointer' }}>{label}</StepLabel>
                  </Step>
                )
              ))}
            </Stepper>
            <Box sx={{ mt: 2 }}>
              {renderStepContent(activeStep)}
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Save Template' : 'Next'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Button variant="contained" onClick={handleCreateTemplateClick}>
          Create Template
        </Button>
      )}
    </Box>
  );
};

export default MyStepper;


