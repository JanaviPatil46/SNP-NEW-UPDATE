import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';
import { Box, Tooltip, Badge, Avatar } from '@mui/material';
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


  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('');
  };
  const columns = [
    {
      accessorKey: 'Name',
      header: 'Account Name',
      muiTableBodyCellProps: {
        sx: {
          // backgroundColor: "lightblue",
          color: "darkblue",
          fontWeight: "bold",
        },
      },
      Cell: ({ cell }) => (
        <Link to={`/accountsdash/overview/${cell.row.original.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {cell.getValue()}
        </Link>
      ),
    },
    {
      accessorKey: "Follow",
      header: "Follow",
    },
    {
      accessorKey: 'Type',
      header: 'Type',
    },
    {
      accessorKey: 'Team',
      header: 'Team Members',
      Cell: ({ cell }) => (
        <Box display="flex" gap={2}>
          {cell.getValue().map((member) => (
            <Tooltip key={member._id} title={member.username}>
              <Badge
                overlap="circular"
                badgeContent={getInitials(member.username)}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#1976d2', // Badge background color
                    color: '#fff', // Badge text color
                    borderRadius: '50%',
                    height: '24px',
                    width: '24px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>
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
    {
        accessorKey: "Invoices",
        header: "Invoices",
        // footer: "City",
      },
      {
        accessorKey: "Credits",
        header: "Credits",
        // footer: "City",
      },
      {
        accessorKey: "Tasks",
        header: "Tasks",
        // footer: "City",
      },

      {
        accessorKey: "Proposals",
        header: "Proposals",
        // footer: "City",
      },
      {
        accessorKey: "Unreadchats",
        header: "Unreadchats",
        // footer: "City",
      },
      {
        accessorKey: "Pendingorganizers",
        header: "PendingOrganizers",
        // footer: "City",
      },
      {
        accessorKey: "Pendingsignatures",
        header: "PendingSignatures",
        // footer: "City",
      },
      {
        accessorKey: "Lastlogin",
        header: "LastLogin",
        // footer: "City",
        filterVariant: "range",
      },
  ];
  const table = useMaterialReactTable({
    columns,
    data: accounts,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", //we will render our own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "Name"], },
    },

    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });
  return (
    
    <MaterialReactTable columns={columns} table={table} />
  );
};

export default AccountsTable;