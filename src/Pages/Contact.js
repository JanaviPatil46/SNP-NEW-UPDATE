// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Tooltip, Box, Badge } from '@mui/material';

// const ContactTable = () => {

//     const CONTACT_API = process.env.REACT_APP_CONTACTS_URL;

//     const [contacts, setContacts] = useState([]);

//     useEffect(() => {
//         const fetchContacts = async () => {
//             try {
//                 const response = await axios.get(`${CONTACT_API}/contacts/contactlist/list/`);
//                 setContacts(response.data.contactlist);
//                 console.log(response.data.contactlist);
//             } catch (error) {
//                 console.error('API Error:', error);
//                 // toast.error('Failed to fetch contacts');
//             }
//         };

//         fetchContacts();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${CONTACT_API}/contacts/${id}/`);
//             setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
//             toast.success('Contact deleted successfully!');
//         } catch (error) {
//             console.error('Delete API Error:', error);
//             toast.error('Failed to delete contact');
//         }
//     };

//     // Define the columns for MRT
//     const columns = useMemo(() => [
//         {
//             accessorKey: 'name',
//             header: 'Name',
//         },
//         {
//             accessorKey: 'email',
//             header: 'Email',
//         },
//         {
//             accessorKey: 'phoneNumbers',
//             header: 'Phone Number',
//             Cell: ({ cell }) => (
//                 <div>
//                     {cell.row.original.phoneNumbers.map((phone, index) => (
//                         <div key={index}>{phone}</div>
//                     ))}
//                 </div>
//             ),
//         },
//         {
//             accessorKey: 'companyName',
//             header: 'Company Name',
//         },
//         {
//             accessorKey: 'tags',
//             header: 'Tags',
//             Cell: ({ cell }) => {
//                 const tags = cell.row.original.tags[0];
//                 if (tags.length > 1) {
//                     const firstTag = tags[0];
//                     const remainingTagsCount = tags.length - 1;
//                     return (
//                         <Tooltip
//                             placement="top"
//                             arrow
//                             title={tags.map(tag => (
//                                 <div key={tag._id}>
//                                     <span style={{
//                                         backgroundColor: tag.tagColour,
//                                         color: "#fff",
//                                         borderRadius: "60px",
//                                         padding: "0.1rem 0.8rem",
//                                         fontSize: "10px",
//                                         display: 'inline-block',
//                                         margin: '2px'
//                                     }}>
//                                         {tag.tagName}
//                                     </span>
//                                 </div>
//                             ))}
//                         >
//                             <Box>
//                                 <span style={{
//                                     backgroundColor: firstTag.tagColour,
//                                     color: "#fff",
//                                     borderRadius: "60px",
//                                     padding: "0.1rem 0.8rem",
//                                     fontSize: "10px",
//                                     display: 'inline-block',
//                                     margin: '2px',
//                                     cursor: 'pointer'
//                                 }}>
//                                     {firstTag.tagName}
//                                 </span>
//                                 {remainingTagsCount > 0 && (
//                                     <Badge
//                                         badgeContent={`+${remainingTagsCount}`}
//                                         color="#7D7C7C"
//                                         overlap="rectangular"
//                                         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                                         sx={{ ml: 1 }}
//                                     />
//                                 )}
//                             </Box>
//                         </Tooltip>
//                     );
//                 }
//                 return (
//                     <span style={{
//                         backgroundColor: tags[0].tagColour,
//                         color: "#fff",
//                         borderRadius: "60px",
//                         padding: "0.1rem 0.8rem",
//                         fontSize: "10px",
//                         display: 'inline-block',
//                         margin: '2px'
//                     }}>
//                         {tags[0].tagName}
//                     </span>
//                 );
//             },
//         },
//         {
//             id: 'actions',
//             header: 'Actions',
//             Cell: ({ row }) => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <DeleteIcon
//                         style={{ fontSize: "20px", cursor: 'pointer', color: 'red' }}
//                         onClick={() => handleDelete(row.original.id)}
//                     />
//                 </div>
//             ),
//         },
//     ], []);

//     const table = useMaterialReactTable({
//         columns,
//         data: contacts,
//         enableBottomToolbar: true,
//         enableStickyHeader: true,
//         columnFilterDisplayMode: 'custom', // Custom filtering UI
//         enableRowSelection: true, // Enable row selection
//         enablePagination: true,
//         muiTableContainerProps: { sx: { maxHeight: '400px' } },
//         initialState: {
//             columnPinning: { left: ['mrt-row-select', 'name'] },
//         },
//         muiTableBodyCellProps: {
//             sx: (theme) => ({
//                 backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
//             }),
//         },
//     });

//     return (
//         <MaterialReactTable columns={columns} table={table} />
//     );
// };

// export default ContactTable;


import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './account.css';
import { Stack, Select, MenuItem, TextField, Paper, useMediaQuery, Autocomplete } from "@mui/material";
import { toast } from 'react-toastify';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Box, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {  MRT_TableHeadCellFilterContainer } from "material-react-table";
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
          if (Array.isArray(item.Tags)) {
            return item.Tags.some(tag => tag.some(subTag => subTag.tagName.toLowerCase().includes(filterValue.tagName.toLowerCase())));
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
            Cell: ({ cell }) => (
                <div>
                    {cell.row.original.phoneNumbers.map((phone, index) => (
                        <div key={index}>{phone}</div>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'companyName',
            header: 'Company Name',
        },
        {
            accessorKey: 'tags',
            header: 'Tags',
            Cell: ({ cell }) => {
                const tags = cell.row.original.tags[0];
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
           
              Filter: () => (
                <Autocomplete
                  options={uniqueTags}
                  getOptionLabel={(option) => option.tagName}
                  onChange={(event, newValue) => {
                    setFilterValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Filter by Tag Name"  
              />}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box
                        sx={{ backgroundColor: option.tagColour, color: '#fff', fontSize:'10px', padding: '4px 8px', borderRadius:'20px'}}
                      >
                        {option.tagName}
                      </Box>
                    </li>
                  )}
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      width: "250px",
                      height: "56px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#888",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3f51b5",
                    },
                  }}
                />
              ),
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

