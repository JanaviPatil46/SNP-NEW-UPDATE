import React, { useState, useEffect, useMemo } from 'react';
import Section from './organizertempSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { CiMenuKebab } from "react-icons/ci";
const OrganizersTemp = () => {
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const addSection = () => {
    const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] };
    setSections([...sections, newSection]);
    setSelectedSection(newSection);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleDeleteSection = (id) => {
    const newSections = sections.filter(section => section.id !== id);
    setSections(newSections);
    if (selectedSection && selectedSection.id === id) {
      setSelectedSection(null);
    }
  };

  const handleUpdateSection = (id, newText, newFormElements) => {
    setSections(prevSections => prevSections.map(section =>
      section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
    ));
  };




  const [showOrganizerTemplateForm, setShowOrganizerTemplateForm] = useState(false);

  const handleCreateInvoiceClick = () => {
    setShowOrganizerTemplateForm(true);
  };



  const handleCancel = () => {
    setShowOrganizerTemplateForm(false);

  };

  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ..';
    }
    return text;
  }

  const saveOrganizerTemp = () => {

    console.log(sections)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text
        }))
      })),
      active: true
    });

    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = 'http://127.0.0.1:7600/workflow/organizers/organizertemplate';
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "Organizer Template created successfully") {
          toast.success("Organizer Template created successfully");
          handleCancel();
          fetchOrganizerTemplates();

        } else {
          toast.error(result.error || "Failed to create Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  }

  const [organizerTemplatesData, setOrganizerTemplatesData] = useState([]);
  const fetchOrganizerTemplates = async () => {
    try {
      const url = 'http://127.0.0.1:7600/workflow/organizers/organizertemplate';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch email templates');
      }
      const data = await response.json();

      setOrganizerTemplatesData(data.OrganizerTemplates);

    } catch (error) {
      console.error('Error fetching email templates:', error);

    }
  };

  const handleEdit = (_id) => {
    navigate('OrganizerTempUpdate/' + _id)

  };


   //delete template
   const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    const url = 'http://127.0.0.1:7600/workflow/organizers/organizertemplate/';
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
        fetchOrganizerTemplates();
        // setshowOrganizerTemplateForm(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
  };
  useEffect(() => {
    fetchOrganizerTemplates();
  }, []);
  const [tempIdget, setTempIdGet] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTempIdGet(_id);
  };
  // console.log(tempIdget)
  const columns = useMemo(() => [
    {
      accessorKey: 'templatename',
      header: 'Name',

    },
    {
      accessorKey: 'Setting', header: 'Setting',
      Cell: ({ row }) => (
        <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
          <CiMenuKebab style={{ fontSize: "25px" }} />
          {openMenuId === row.original._id && (
            <Box sx={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff', boxShadow: 1, borderRadius: 1, p: 1, left: '30px', m: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} onClick={() => {
                handleEdit(row.original._id);
               
              }} >Edit</Typography>
              <Typography sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }} onClick={() => handleDelete(row.original._id)}>Delete</Typography>
            </Box>
          )}
        </IconButton>

      ),

    },

  ], [openMenuId]);

  const table = useMaterialReactTable({
    columns,
    data: organizerTemplatesData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
    <Box p={3}>
      {!showOrganizerTemplateForm && (
        <Box sx={{ mt: 2 }}>
        
          <Button variant="contained" onClick={handleCreateInvoiceClick} sx={{ mb: 3 }}>Create Template</Button>
          <MaterialReactTable columns={columns} table={table} />

        </Box>
      )}
      {showOrganizerTemplateForm && (
        <>
          <Box>
            <Box>
              <label className='organizer-input-label'>Template Name</label>
              <TextField

                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                fullWidth
                size='small'
                margin='normal'
                placeholder='Template name'
                sx={{ backgroundColor: '#fff' }}
                className='organizer-input-label'
              />
            </Box>
            <Box mt={2}>
              <label className='organizer-input-label'>Organizer name</label>
              <TextField

                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                fullWidth
                size='small'
                margin='normal'
                placeholder='Organizer name'
                className='organizer-input-label'
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>

          </Box>
          <Box className="organizer-container" sx={{ display: "flex", marginTop: "40px", height: "auto", width: "100%" }}>
            <Box className="left-org-container" sx={{ padding: '10px', width: "30%", height: "315px" }}>
              <Box className="smooth-dnd-container vertical">
                {sections.map((section) => (
                  <Box key={section.id} sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      placeholder={`Section Name`}
                      className='section-name'
                      size='small'
                      margin='normal'
                      value={truncateText(section.text, 5)}
                      InputProps={{
                        readOnly: true
                      }}
                      sx={{ backgroundColor: '#fff' }}
                      onClick={() => handleSectionClick(section)}
                      fullWidth
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "50%", height: "25px", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={addSection}
                >
                  New section
                </Button>
              </Box>
            </Box>
            <Box className="right-container" sx={{ borderRadius: '20px', width: "70%", height: "auto" }}>
              {selectedSection && (
                <Section
                  section={selectedSection}
                  onDelete={handleDeleteSection}
                  onUpdate={handleUpdateSection}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={saveOrganizerTemp}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}

    </Box>
  );
};

export default OrganizersTemp;
