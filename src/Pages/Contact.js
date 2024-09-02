

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './account.css';
import { Stack, Select, MenuItem,  Paper, useMediaQuery,Tooltip  } from "@mui/material";
import { toast } from 'react-toastify';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import { MRT_TableHeadCellFilterContainer } from "material-react-table";
const ContactTable = () => {

  const CONTACT_API = process.env.REACT_APP_CONTACTS_URL;

  const [contactData, setContactData] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [filterValue, setFilterValue] = useState(null);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${CONTACT_API}/contacts/contactlist/list/`);
        setContactData(response.data.contactlist);
        console.log(response.data.contactlist);
      } catch (error) {
        console.error('API Error:', error);
        // toast.error('Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (contactData.length > 0) {
      const tagsSet = new Set();
      contactData.forEach((item) => {
        if (Array.isArray(item.Tags)) {
          item.Tags.forEach((tag) => {
            tagsSet.add(JSON.stringify(tag[0]));
          });
        }
      });
      setUniqueTags(Array.from(tagsSet).map(tag => JSON.parse(tag)));
      console.log(uniqueTags);
    }
  }, [contactData]);

  const filteredData = useMemo(() => {
    if (!filterValue) return contactData;

    return contactData.filter(item => {
      if (Array.isArray(item.tags)) {
        return item.tags.some(tagArray =>
          tagArray.some(tag => tag.tagName.toLowerCase().includes(filterValue.tagName.toLowerCase()))
        );
      }
      return false;
    });
  }, [contactData, filterValue]);

  const renderFilterContainers = () => {
    return selectedFilters.map((selectedFilterIndex) => {
      const header = table.getLeafHeaders()[selectedFilterIndex + 1];
      return (
        <div className="MRT_TableHeadCellFilterContainer" key={header.id}>
          <MRT_TableHeadCellFilterContainer header={header} table={table} in />
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setSelectedFilters(prevFilters => prevFilters.filter(item => item !== selectedFilterIndex));
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      );
    });
  };

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedFilterIndex(selectedIndex);
    if (selectedIndex === null) {
      setSelectedFilterIndex(null);
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prevFilters) => {
        const index = prevFilters.indexOf(selectedIndex);
        if (index === -1) {
          return [...prevFilters, selectedIndex];
        } else {
          return prevFilters.filter((item) => item !== selectedIndex);
        }
      });
    }
  };

  const isMobile = useMediaQuery("(max-width: 1000px)");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${CONTACT_API}/contacts/${id}/`);
      setContactData(prevContacts => prevContacts.filter(contact => contact.id !== id));
      toast.success('Contact deleted successfully!');
    } catch (error) {
      console.error('Delete API Error:', error);
      toast.error('Failed to delete contact');
    }
  };

  // Define the columns for MRT
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phoneNumbers',
      header: 'Phone Number',
      // Cell: ({ cell }) => (
      //   <div>
      //     {cell.row.original.phoneNumbers.map((phone, index) => (
      //       <div key={index}>{phone}</div>
      //     ))}
      //   </div>
      // ),
      Cell: ({ cell }) => (
        <div>
          {cell.row.original.phoneNumbers.flat().map((phoneObj, index) => (
            <div key={index}>{phoneObj.phone}</div>
          ))}
        </div>
      ),
    },

    {
      accessorKey: 'tags',
      header: 'Tags',
      Cell: ({ cell }) => {
        const tags = cell.row.original.tags.flat();
    
        // Calculate the count for each tag
        const tagCount = tags.reduce((acc, tag) => {
          acc[tag.tagName] = (acc[tag.tagName] || 0) + 1;
          return acc;
        }, {});
    
        if (tags.length > 1) {
          return (
            <Tooltip
              title={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: tag.tagColour,
                        color: '#fff',
                        padding: '2px 4px',
                        margin: '2px 0',
                        borderRadius: '4px',
                      }}
                    >
                      {tag.tagName} 
                    </div>
                  ))}
                </div>
              }
              arrow
              placement="top"  // Position the tooltip on top
              PopperProps={{
                style: {
                  pointerEvents: 'none',  // Disable pointer events for the tooltip to avoid blocking interactions
                },
              }}
            >
              <div>
                {tags.length > 0 && (
                  <span
                    style={{
                      backgroundColor: tags[0].tagColour,
                      color: '#fff',
                      padding: '2px 4px',
                      margin: '0 2px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {tags[0].tagName} 
                  </span>
                )}
              </div>
            </Tooltip>
          );
        }
    
        return (
          <div>
            {tags.map((tag) => (
              <span
                key={tag._id}
                style={{
                  backgroundColor: tag.tagColour,
                  color: '#fff',
                  padding: '2px 4px',
                  margin: '0 2px',
                  borderRadius: '4px',
                }}
              >
                {tag.tagName} 
              </span>
            ))}
          </div>
        );
      },
    },
    
    {
      accessorKey: 'companyName',
      header: 'Company Name',
    },
   
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DeleteIcon
            style={{ fontSize: "20px", cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(row.original.id)}
          />
        </div>
      ),
    },
  ], [uniqueTags, filterValue]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: 'custom', // Custom filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    initialState: {
      columnPinning: { left: ['mrt-row-select', 'name'] },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
    // <MaterialReactTable columns={columns} table={table} />
    <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
      <Paper style={{ border: '2px solid blue', display: 'flex', overflowX: 'auto' }}>
        <Stack p="8px" gap="8px" display="flex" direction="row">
          <>
            <Select
              value={selectedFilterIndex}
              onChange={handleFilterChange}
              sx={{
                backgroundColor: 'white',
                minWidth: 200,
                '& .MuiSelect-select': {
                  padding: '10px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'purple',
                },
              }}
            >
              <MenuItem value={null}>None</MenuItem>
              {columns.map((column, index) => (
                <MenuItem key={index} value={index}>
                  {column.header}
                </MenuItem>
              ))}
            </Select>

            <Stack direction="row" gap="8px">
              {renderFilterContainers()}
            </Stack>
          </>
        </Stack>
      </Paper>
      <MaterialReactTable columns={columns} table={table} />
    </Stack>
  );
};

export default ContactTable;

