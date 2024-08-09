
import { Box, FormControlLabel, Button, Select, Autocomplete, InputLabel, TextField, Divider } from '@mui/material'
import React, { useState, } from 'react';
import Drawer from '@mui/material/Drawer';
import { useTheme, useMediaQuery, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import './invoices.css'
import { RxCross2 } from "react-icons/rx";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';//autoclassnameGenerator
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);//autoclassnameGenerator

const Service = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
    const handleNewDrawerClose = () => {
        setIsNewDrawerOpen(false);
    };


    //category right side form
    const [isCategoryFormOpen, setCategoryFormOpen] = useState(false);
    const handleCategoryFormClose = () => {
        setCategoryFormOpen(false);
    };

    const options = [
        // { label: "Select Rate Type", value: "" },
        { label: "Item", value: "item" },
        { label: "Hour", value: "hour" },
    ];
    const [selectedOption, setSelectedOption] = useState('');

    const handleRateTypeChange = (event, newValue) => {
        setSelectedOption(newValue);
        console.log('Selected rate type:', newValue);
    };

    return (
        <Box>
            <Button onClick={setIsNewDrawerOpen} variant="contained" color="primary" >
                Create Service
            </Button>

            <Drawer
                anchor="right"
                open={isNewDrawerOpen}
                onClose={handleNewDrawerClose}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                        width: isSmallScreen ? '100%' : '650px',

                    },
                }}
            >
                <Box role="presentation" sx={{ borderRadius: isSmallScreen ? '0' : '15px' }}>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid grey' }}>
                        <Typography variant='h6'>Create Service</Typography>
                        <RxCross2 onClick={handleNewDrawerClose} style={{ cursor: 'pointer' }} />
                    </Box>

                      

                    </Box>
                    <form style={{ margin: '15px', }} >

                        <Box>
                            <Box >
                                <InputLabel sx={{ color: 'black' }}>Service Name</InputLabel>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    name="ServiceName"
                                    placeholder="Service Name"
                                    size="small"
                                    margin='normal'
                                />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    name="Description"
                                    placeholder="Description"
                                    size="small"
                                    margin='normal'
                                />
                            </Box>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            <InputLabel sx={{ color: 'black' }}>Rate</InputLabel>
                                            <TextField
                                                fullWidth
                                                name="Rate"
                                                placeholder="Rate"
                                                size="small"
                                                margin='normal'
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ mr: '15px' }}>
                                            <InputLabel sx={{ color: 'black' }}>Rate Type</InputLabel>
                                            <Autocomplete
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 2 }}
                                                options={options}
                                                getOptionLabel={(option) => option?.label || ""}
                                                value={selectedOption}
                                                onChange={handleRateTypeChange}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" placeholder="Select Rate Type" />
                                                )}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                renderOption={(props, option) => (
                                                    <Box
                                                      component="li"
                                                      {...props}
                                                      sx={{
                                                        
                                                        margin: '4px',
                                                        cursor: 'pointer',
                                                        
                                                      }}
                                                    >
                                                      <Typography >
                                                        {option.label}
                                                      </Typography>
                                                    </Box>
                                                  )}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={2} >
                                <FormControlLabel
                                    control={
                                        <Switch

                                            color="primary"
                                        />
                                    }
                                    label={"Tax"}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom sx={{  fontWeight: 'bold', mt: 2 }}>
                                        Category
                                    </Typography>
                                </Box>
                                <Box >
                                    <InputLabel sx={{ color: 'black', mt: 2 }}>Category Name</InputLabel>
                                    <Select
                                        size='small'
                                        sx={{ width: '100%', mt: 2 }}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={setCategoryFormOpen}
                                    sx={{ mt: 4, ml: 1 }}
                                >
                                    Create category
                                </Button>

                                {/* category form */}
                                <Drawer
                                    anchor="right"
                                    open={isCategoryFormOpen}
                                    onClose={handleCategoryFormClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                                            width: isSmallScreen ? '100%' : '650px',
                                            maxWidth: '100%',
                                        },
                                    }}
                                >

                                    <Box>

                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', }}>

                                            <ArrowBackRoundedIcon onClick={handleCategoryFormClose} style={{ cursor: 'pointer' }} />
                                        </Box>
                                        <Divider />
                                    </Box>
                                    <Box p={3} >
                                        <InputLabel sx={{ color: 'black', mt: 2 }}>Category Name</InputLabel>
                                        <Select
                                            size='small'
                                            sx={{ width: '100%', mt: 2 }}
                                        />
                                    </Box>
                                    <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5, margin: "8px", ml: 3 }}>
                                        <Button variant="contained" color="primary">Create</Button>
                                        <Button variant="outlined" onClick={handleCategoryFormClose}>Cancel</Button>
                                    </Box>
                                </Drawer >
                            </Box>
                            <Box sx={{ pt: 5, display: 'flex', alignItems: 'center', gap: 5, ml: 1 }}>
                                <Button variant="contained" color="primary">Save</Button>
                                <Button variant="outlined" onClick={handleNewDrawerClose}>Cancel</Button>
                            </Box>
                        </Box>

                    </form>



                </Box>


            </Drawer>
        </Box>
    )
}

export default Service








