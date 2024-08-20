import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { Box, Tooltip, Badge } from '@mui/material';
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
      accessorKey: 'Type',
      header: 'Type',
    },
    {
      accessorKey: 'Team',
      header: 'Team Members',
      Cell: ({ cell }) => (
        <ul>
          {cell.getValue().map(member => (
            <div key={member._id}>{member.username}</div>
          ))}
        </ul>
      ),
    },
   
    {
      accessorKey: 'Tags',
      header: 'Tags',
      Cell: ({ cell }) => {
        const tags = cell.getValue()[0];
        if (tags.length > 1) {
          const firstTag = tags[0];
          const remainingTagsCount = tags.length - 1;
          return (
            <Tooltip
              placement="top"
              arrow
              title={tags.map(tag => (
                <div key={tag._id}>
                  <span style={{
                    backgroundColor: tag.tagColour,
                    color: "#fff",
                    borderRadius: "60px",
                    padding: "0.1rem 0.8rem",
                    fontSize: "10px",
                    display: 'inline-block',
                    margin: '2px'
                  }}>
                    {tag.tagName}
                  </span>
                </div>
              ))}
            >
              <Box>
                <span style={{
                  backgroundColor: firstTag.tagColour,
                  color: "#fff",
                  borderRadius: "60px",
                  padding: "0.1rem 0.8rem",
                  fontSize: "10px",
                  display: 'inline-block',
                  margin: '2px',
                  cursor: 'pointer'
                }}>
                  {firstTag.tagName}
                </span>
                {remainingTagsCount > 0 && (
                  <Badge
                    badgeContent={`+${remainingTagsCount}`}
                   color="#7D7C7C"
                    overlap="rectangular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            </Tooltip>
          );
        }
        return (
          <span style={{
            backgroundColor: tags[0].tagColour,
            color: "#fff",
            borderRadius: "60px",
            padding: "0.1rem 0.8rem",
            fontSize: "10px",
            display: 'inline-block',
            margin: '2px'
          }}>
            {tags[0].tagName}
          </span>
        );
      },
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



