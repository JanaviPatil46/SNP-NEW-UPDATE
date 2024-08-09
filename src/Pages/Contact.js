import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Box, Badge } from '@mui/material';

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:7000/contacts/contactlist/list/');
                setContacts(response.data.contactlist);
                console.log(response.data.contactlist);
            } catch (error) {
                console.error('API Error:', error);
                toast.error('Failed to fetch contacts');
            }
        };

        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:7000/contacts/${id}/`);
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
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
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: contacts,
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
        <MaterialReactTable columns={columns} table={table} />
    );
};

export default ContactTable;

