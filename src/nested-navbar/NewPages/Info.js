// import { Box } from '@mui/material'
// import React from 'react'
// import Grid from '@mui/material/Grid';

// const Info = () => {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         <Grid size={6}>

//         </Grid>
//         <Grid size={6}>

//         </Grid>

//       </Grid>
//     </Box>
//   )
// }

// export default Info

import { Box, Grid, Card, CardContent, Typography, IconButton, Divider } from '@mui/material';
import React from 'react';
import { BiArchiveOut } from "react-icons/bi";
import { LuUserCircle2 } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import './info.css'
const Info = () => {
  return (
    <Box sx={{ width: '100%', padding: 2, mt: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, mr: 5 }}>
            <CardContent>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Typography>Account Details</Typography>
                <Box>
                  <IconButton><BiArchiveOut /></IconButton>
                  <IconButton><MdEdit /></IconButton>
                </Box>
              </Box>
              <Divider/>
              <Box>
              <LuUserCircle2 />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Card Title 2
              </Typography>
              <Typography>
                Details for card 2 go here. You can include more content or components inside this card.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Info;

