import React,{useEffect,useState} from 'react'
import {
  Box,
  Button,
  TextField,

} from '@mui/material';
import {  toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Section from './organizertempSection';
const OrganizersTempUpdate = () => {

  const ORGANIZER_TEMP_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;


  const { id  } = useParams();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
      fetchidwiseData();
  }, []);

  const fetchidwiseData = async () => {
      try {
        const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/${id}`;
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setTemplateData(data.organizerTemplate);
          setTemplateName(data.organizerTemplate.templatename);
          console.log(data.organizerTemplate.templatename)
          setOrganizerName(data.organizerTemplate.organizerName);
          console.log(data.organizerTemplate.sections)
          setSections(data.organizerTemplate.sections || []);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ..';
    }
    return text;
  }
  const addSection = () => {
    const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] };
    setSections([...sections, newSection]);
    setSelectedSection(newSection); // Select the newly added section
  };

  const handleSectionClick = (section) => {
    // const newSection = {
    //     id: section.sectionId, name: section.sectionname, text: section.sectionname, formElements: section.questions
    // };
    setSelectedSection(section);
  };
  const handleDeleteSection = (sectionId) => {
    const newSections = sections.filter(section => section.id !== sectionId);
    setSections(newSections);
    if (selectedSection && selectedSection.id === sectionId) {
      setSelectedSection(null); // Clear selected section if it's deleted
    }
  };

  const handleUpdateSection = (id, newText, newFormElements) => {
    setSections(prevSections => prevSections.map(section =>
      section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
    ));
  };


  const saveOrganizerTemp = () => {
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

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    console.log(raw)
    const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/${id}`;
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            if (result && result.message === "OrganizerTemplate Updated successfully") {
                toast.success("Organizer Template Updated successfully");
                navigate('/firmtemp/templates/organizers');
             
            } else {
                toast.error(result.error || "Failed to Update Organizer Template");
            }
        })
        .catch((error) => console.error(error));
};

const handleBackButton = ()=>{
  navigate('/firmtemp/templates/organizers');
}
  return (
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
onClick={handleBackButton}
        >
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default OrganizersTempUpdate