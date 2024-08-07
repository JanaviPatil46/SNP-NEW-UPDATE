// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const AccountsTable = () => {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const config = {
//           method: 'get',
//           maxBodyLength: Infinity,
//           url: 'http://127.0.0.1:7000/accounts/account/accountdetailslist/',
//           headers: {},
//         };
//         const response = await axios.request(config);
//         setAccounts(response.data.accountlist);
//         console.log(response.data.accountlist)
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);
  
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
            
//             <TableCell>Account Name</TableCell>
//             <TableCell>Team</TableCell>
//             <TableCell>Tags</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {accounts.map((account) => (
//             <TableRow key={account.id}>
              
//               <TableCell>{account.Name}</TableCell>
//               <TableCell>{account.Team}</TableCell>
//               <TableCell>{account.Tags}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AccountsTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { Chip } from '@mui/material';
const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:7000/accounts/account/accountdetailslist/',
          headers: {},
        };
        const response = await axios.request(config);
        setAccounts(response.data.accountlist);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const columns = [
    {
      accessorKey: 'Name',
      header: 'Account Name',
    },
    {
      accessorKey: 'Team',
      header: 'Team Members',
      Cell: ({ cell }) => (
        <ul>
          {cell.getValue().map(member => (
            <li key={member._id}>{member.username}</li>
          ))}
        </ul>
      ),
    },
    {
      accessorKey: 'Tags',
      header: 'Tags',
      Cell: ({ cell }) => (
        <ul>
          {cell.getValue()[0].map(tag => (
            <Chip
              key={tag._id}
              label={tag.tagName}
              style={{ backgroundColor: tag.tagColour, color: '#fff', margin: '2px' }}
            />

          ))}
        </ul>
      ),
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={accounts}
      enableColumnResizing
      enableRowSelection
      initialState={{ density: 'compact' }}
    />
  );
};

export default AccountsTable;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MaterialReactTable } from 'material-react-table';

// const AccountsTable = () => {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const config = {
//           method: 'get',
//           maxBodyLength: Infinity,
//           url: 'http://127.0.0.1:7000/accounts/account/accountdetailslist/',
//           headers: {},
//         };
//         const response = await axios.request(config);
//         setAccounts(response.data);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   const columns = [
//     {
//       accessorKey: 'Name',
//       header: 'Account Name',
//     },
//     {
//       accessorKey: 'Team',
//       header: 'Team Member',
//     },
//     {
//       accessorKey: 'Tags',
//       header: 'Tags',
//     },
//   ];

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={accounts}
//       enableColumnResizing
//       enableRowSelection
//       initialState={{ density: 'compact' }}
//     />
//   );
// };

// export default AccountsTable;
