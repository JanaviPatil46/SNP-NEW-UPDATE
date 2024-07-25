

import React, { useState } from 'react';
// import './OrganizerTemp.css';
import Section from './organizertempSection';

import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,

  Typography
} from '@mui/material';


const OrganizersTemp = () => {


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

  return (
    <Box>
      {!showOrganizerTemplateForm && (
        <Box>
          <Box sx={{ mb: 5 }}><Typography variant="h5">Organizer Template</Typography></Box>
          <Button variant="contained" onClick={handleCreateInvoiceClick} className='btn1'>Create Template</Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      )}
      {showOrganizerTemplateForm && (
        <>
          <Box>
            <Box>
              <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
              <TextField
                label="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                fullWidth
                size='small'
                margin='normal'
              />
            </Box>
            <Box mt={2}>
              <InputLabel sx={{ color: 'black' }}>Organizer name</InputLabel>
              <TextField
                label="Organizer name"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                fullWidth
                size='small'
                margin='normal'
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
