import React, { useState, useEffect } from 'react';
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  TextField,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Input,
  Typography,
  Drawer, Divider,
  Switch,
  FormControlLabel,
  Autocomplete, Paper
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme
import 'quill-emoji/dist/quill-emoji.css'; // Emoji styles
import Quill from 'quill';
import 'quill-emoji';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
Quill.register('modules/emoji', require('quill-emoji'));

const Section = ({ section, onDelete, onUpdate, onDuplicate,onSaveFormData,onSaveSectionData }) => {

  const [text, setText] = useState(section.text);
  const [formElements, setFormElements] = useState(section.formElements || []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [queDrawerOpen, setQueDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [repeateButton, setRepeateButton] = useState(false);
  const [conditionButton, setConditionButton] = useState(false);
  const [prefilledButton, setPrefilledButton] = useState(false);
  const [descriptionButton, setDescriptionButton] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [mode, setMode] = useState('Any');
  const [sectionMode, setSectionMode] =useState('Any');
  const [queConditionButton, setQueConditionButton] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([{ question: '', answer: '' }]);
  const [requiredButton, setRequiredButton] = useState(false);
  const handleSectionSave = () => {
    // Construct the sectionSettings object
    const sectionSettings = {
      sectionRepeatingMode: repeateButton,
      buttonName: repeateButton ? 'Repeat Section' : '', // You can store the text input value instead of hardcoding it
      conditional: conditionButton,
      sectionMode: sectionMode,
      conditions: conditionButton ? questionAnswers : [], // assuming questionAnswers is an array of {question, answer} objects
    };
  
    console.log('Section Settings:', sectionSettings);
    if (onSaveSectionData) {
      onSaveSectionData(sectionSettings);
    }
    setDrawerOpen(false)
  };
  const clearForm = () => {
    setRequiredButton(false);
    setPrefilledButton(false);
    setQueConditionButton(false);
    setMode("Any");
    setQuestionAnswers([]); // Assuming this is an array
    setDescriptionButton(false);
    setDescriptionText("");
  };
  const [questionsAnswersMap, setQuestionsAnswersMap] = useState({});
  const handleElementSelect = (element) => {
    setSelectedElement(element);
    
    // Check if we have existing questions and answers for this element
    const existingData = questionsAnswersMap[element.id] || { questionAnswers: [], description: "" };
    
    setQuestionAnswers(existingData.questionAnswers);
    setDescriptionText(existingData.description);
  };
  
  // const handleSave = () => {
  //   // Gather the form data
  //   const formData = {
  //     required: requiredButton,
  //     prefilled: prefilledButton,
  //     conditional: queConditionButton,
  //     mode: mode,
  //     conditions: queConditionButton ? questionAnswers.map((_, index) => ({
  //       question: selectedQuestions[index],
  //       answer: selectedAnswers[index],
  //     })) : [], 
  //     // conditions: queConditionButton ? questionAnswers : [], // Include conditions if conditional is enabled
  //     descriptionEnabled: descriptionButton,
  //     description: descriptionText
  //   };
  //   if (selectedElement) {
  //     console.log(formData);
  //     // Call any backend API or set the form data in the parent component
  //     onSaveFormData(selectedElement.id, formData);
      
  //     // Clear the form
  //     clearForm();
  //     setQueDrawerOpen(false);
  //   } else {
  //     console.error("No element selected");
  //   }
   
  //   // console.log(formData);
  //   // // setQueDrawerOpen(false);
  //   // clearForm();
   
  //   // onSaveFormData(selectedElement.id, formData); 
  //   // console.log(selectedElement.id, formData) 
  // };
  const handleSave = () => {
    if (selectedElement) {
      const formData = {
        required: requiredButton,
        prefilled: prefilledButton,
        conditional: queConditionButton,
        mode: mode,
        conditions: queConditionButton ? questionAnswers.map((id, index) => ({
          question: selectedQuestions[index],
          answer: selectedAnswers[index],
        })) : [],
        descriptionEnabled: descriptionButton,
        description: descriptionText
      };
  
      // Store the form data in the questionsAnswersMap
      setQuestionsAnswersMap(prev => ({
        ...prev,
        [selectedElement.id]: {
          questionAnswers: questionAnswers,
          description: descriptionText,
        }
      }));
  
      // Optionally, log or send data to backend
      onSaveFormData(selectedElement.id, formData);
      
      // Clear the form
      clearForm();
      setQueDrawerOpen(false);
    } else {
      console.error("No element selected");
    }
  };
  
  // const onSaveFormData = (elementId, formData) => {
  //   const updatedFormElements = formElements.map(el =>
  //     el.id === elementId ? { ...el, questionsectionsettings: formData } : el
  //   );

  //   setFormElements(updatedFormElements);  // Assuming setFormElements is how you store form data in the parent component
  // };

  const handleRequiredButton = (checked) => {
    setRequiredButton(checked);
  };
  const handleDescriptionButton = (checked) => {
    setDescriptionButton(checked);
  };
  const handlePrefilledButton = (checked) => {
    setPrefilledButton(checked);
  };
  const handleAddQuestionAnswer = () => {
    setQuestionAnswers([...questionAnswers, { question: '', answer: '' }]);
  };

  const handleRemoveQuestionAnswer = (index) => {
    const updatedList = questionAnswers.filter((_, i) => i !== index);
    setQuestionAnswers(updatedList);
  };
  const handleRepeateButton = (checked) => {
    setRepeateButton(checked);
  };
  const handleConditionButton = (checked) => {
    setConditionButton(checked);
  };
  const handleQueConditionButton = (checked) => {
    setQueConditionButton(checked);
  };
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const [selectedElement, setSelectedElement] = useState(null);

  // Function to open the drawer and set the selected element
  // const handleSettingsClick = (element) => {
  //   setSelectedElement(element);
  //   setQueDrawerOpen(true);
  // };

  const handleSettingsClick = (elementId) => {
  const updatedElement = formElements.find(element => element.id === elementId);
  if (updatedElement) {
    setSelectedElement(updatedElement);
    setQueDrawerOpen(true);
  }
};


  useEffect(() => {
    setText(section.text);
    setFormElements(section.formElements);

  }, [section]);

  const handleDelete = () => {
    onDelete(section.id);
  };
  const handleDuplicate = () => {
    onDuplicate(section.id);
  };
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    onUpdate(section.id, newText, formElements);
  };

  const handleAddFormElement = (type) => {
    const newElement = {
      type, id: Date.now(), sectionid: section.id, options: [], text: '', questionsectionsettings: {
        required: false,
        prefilled: false,
        conditional: false,  // Set conditional to true
        mode: '',
        conditions: [
          {
            question: '', // Default question
            answer: '' // Default answer
          }
        ],
        descriptionEnabled: false,
        description: ''
      }
    };
    const updatedFormElements = [...formElements, newElement];
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
    // setDropdownVisible(false);
    setAnchorEl(null);
  };

  const handleDeleteFormElement = (id) => {
    const updatedFormElements = formElements.filter(element => element.id !== id);
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleAddOption = (elementId) => {
    const newOption = { id: Date.now(), text: '' };
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, options: [...(element.options || []), newOption] };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleOptionChange = (elementId, optionId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        const updatedOptions = element.options.map(option => {
          if (option.id === optionId) {
            return { ...option, text: newText };
          }
          return option;
        });
        return { ...element, options: updatedOptions };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleDeleteOption = (elementId, optionId) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        const updatedOptions = element.options.filter(option => option.id !== optionId);
        return { ...element, options: updatedOptions };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleCheckboxTextChange = (elementId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, text: newText };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleElementTextChange = (elementId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, text: newText };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleQuillChange = (elementId, newText) => {
    const updatedFormElements = formElements.map((element) => {
      if (element.id === elementId) {
        return { ...element, text: newText };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }], // Font family and size
      [{ 'header': '1' }, { 'header': '2' }, { 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'], // Formatting options
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'color': [] }, { 'background': [] }], // Text color and highlight
      ['blockquote', 'code-block'], // Blockquote and code
      ['link', 'image'], // Links and images
      [{ 'emoji': true }],
      [{ 'indent': '-1' }, { 'indent': '+1' }], // Indent/unindent
      ['clean'], // Remove formatting
      ['undo', 'redo'], // Undo/Redo
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: true,
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'script', 'list', 'bullet', 'indent',
    'color', 'background', 'align',
    'blockquote', 'code-block', 'link', 'image',
    'undo', 'redo', 'emoji'
  ];


  const renderOptions = (element) => {
    return (
      <Box>
        {element.options && element.options.map(option => (
          <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              variant="outlined"
              placeholder="Option"
              value={option.text}
              size='small'
              margin='normal'
              fullWidth
              className='organizer-input-label'
              onChange={(e) => handleOptionChange(element.id, option.id, e.target.value)}

            />
            <IconButton onClick={() => handleDeleteOption(element.id, option.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
        ))}
        <Button variant="contained" onClick={() => handleAddOption(element.id)}>
          Add Option
        </Button>
      </Box>
    );
  };


  const renderFormElement = (element) => {
    switch (element.type) {
      case 'Free Entry':
        return (
          <>
            <Typography>Free Entry</Typography>
            <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>

              <TextField
                variant="outlined"
                placeholder="Free Entry"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                sx={{ backgroundColor: '#fff' }}
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}

              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
          </>
        );
      case 'Email':
        return (
          <>
            <Typography>Email</Typography>
            <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>

              <TextField
                variant="outlined"
                placeholder="Email"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
          </>
        );
      case 'Number':
        return (
          <>
            <Typography>Number</Typography>
            <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>

              <TextField
                variant="outlined"
                placeholder="Number"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
          </>
        );
      case 'Date':
        return (
          <>
            <Typography>Date</Typography>
            <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <TextField
                variant="outlined"
                placeholder="Date"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>


              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
          </>
        );
      case 'Radio Buttons':
        return (
          <Box key={element.id} sx={{ marginBottom: '8px' }}>
            <Typography>Radio Button:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Input type="radio" name={`radio-${element.id}`} sx={{ marginRight: '4px' }} />
              <TextField
                variant="outlined"
                placeholder="Radio Buttons"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
            {renderOptions(element)}
          </Box>
        );
      case 'Checkboxes':
        return (
          <Box key={element.id} sx={{ marginBottom: '8px' }}>
            <Typography>Checkbox:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Input type="checkbox" name={`checkbox-${element.id}`} sx={{ marginRight: '4px' }} />
              <TextField
                variant="outlined"
                placeholder="Checkboxes"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
            {renderOptions(element)}
          </Box>
        );
      case 'Dropdown':
        return (
          <Box key={element.id} sx={{ marginBottom: '8px' }}>
            <Typography>Dropdown:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Dropdown"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
            {renderOptions(element)}
          </Box>
        );

      case 'Yes/No':
        return (
          <Box key={element.id} sx={{ marginBottom: '8px' }}>
            <Typography>Yes/No:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Yes/No"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
            {renderOptions(element)}
          </Box>
        );

      case 'File Upload':
        return (
          <Box key={element.id}>
            <Typography>File Upload:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="File Upload"
                value={element.text}
                size='small'
                margin='normal'
                fullWidth
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ backgroundColor: '#fff' }}
              />
              <IconButton onClick={() => handleSettingsClick(element.id)}>
                <IoSettingsOutline />
              </IconButton>

              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
            <Button
              component="label"
              role={undefined}
              variant="outlined" disabled
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files

            </Button>
          </Box>
        )
      case 'Text Editor':
        return (
          <Box key={element.id} sx={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>

            <ReactQuill
              theme="snow"
              value={element.text}
              modules={modules} // Set the custom modules
              formats={formats} // Set the allowed formats
              onChange={(newText) => handleQuillChange(element.id, newText)}
            />

            <IconButton onClick={() => handleDeleteFormElement(element.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
        );
      default:
        return null;
    }
  };

const getRadioButtonOptions = () => {
  return formElements
    .filter(element => element.type === 'Radio Buttons')
    .map(element => element.text); // Extract the text of each radio button element
};

const [selectedQuestions, setSelectedQuestions] = useState([]);
const [selectedAnswers, setSelectedAnswers] = useState(Array(questionAnswers.length).fill(null));

const handleQuestionSelect = (value, index) => {
  
  const updatedQuestions = [...selectedQuestions];
  updatedQuestions[index] = value;
  setSelectedQuestions(updatedQuestions);
  
  const updatedAnswers = [...selectedAnswers];
  updatedAnswers[index] = null; // Reset the answer for the selected question
  setSelectedAnswers(updatedAnswers);
};
 const getAnswerOptions = (question) => {
    // Logic to fetch or derive answer options based on the selected question
    // For example, if question corresponds to an element in formElements:
    const element = formElements.find(el => el.text === question);
    return element ? element.options.map(option => option.text) : [];
  };
  return (
    <Box
      sx={{
        border: '1px solid black',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px',
        position: 'relative',
        backgroundColor: '#fff'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          fullWidth
          value={text}
          size='small'
          margin='normal'

          onChange={handleTextChange}
          placeholder="Section text"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={handleDuplicate}>
            <HiOutlineDuplicate />
          </IconButton>
          <IconButton onClick={() => toggleDrawer(true)}>
            <IoSettingsOutline />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <RiDeleteBinLine />
          </IconButton>

        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {['Free Entry', 'Email', 'Number', 'Date', 'Radio Buttons', 'Checkboxes', 'Dropdown', 'Yes/No', 'File Upload'].map(type => (
            <MenuItem key={type} onClick={() => handleAddFormElement(type)}>
              {type}
            </MenuItem>
          ))}
        </Menu>


      </Box>


      {formElements.map(element => (
        <Box key={element.id} sx={{ marginTop: '16px' }}>
          {renderFormElement(element)}
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
        <Button variant="contained" onClick={(event) => setAnchorEl(event.currentTarget)}>Questions</Button>
        <Button variant="outlined" onClick={() => handleAddFormElement('Text Editor')}>
          Text Block
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 500, }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Section  Settings
              </Typography>
              <Typography gutterBottom>
                {text}
              </Typography>


            </Box>

            <IconButton onClick={() => toggleDrawer(false)}>
              <IoMdClose />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Box display={'flex'} alignItems={'center'} >
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={repeateButton}
                      onChange={(event) => handleRepeateButton(event.target.checked)}

                      color="primary"
                    />
                  }

                />
              </Box>
              <Typography variant='h6'>Allow client to repeat</Typography>

            </Box>
            {repeateButton && (
              <Box mb={3} mt={2}>
                <Typography variant='body'>
                  Button name (maximum 25 characters)
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size='small'
                  margin='normal'
                  defaultValue="Repeat Section"
                />

              </Box>
            )}


            <Box display={'flex'} alignItems={'center'} >
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={conditionButton}
                      onChange={(event) => handleConditionButton(event.target.checked)}

                      color="primary"
                    />
                  }

                />
              </Box>
              <Typography variant='h6'>Conditional</Typography>

            </Box>
            {conditionButton && (
              <Box mb={3} mt={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Conditions</Typography>
                  <Button variant="text" onClick={handleAddQuestionAnswer}>
                    Add
                  </Button>
                </Box>
                <Divider />
                <Box mt={2}>
                  <Typography>Mode</Typography>
                  <Autocomplete
                    options={['Any', 'All']}
                    defaultValue="Any"
                     value={sectionMode} // Bind value to state
                      onChange={(event, newValue) => setSectionMode(newValue)}
                    renderInput={(params) => <TextField {...params} variant="outlined" size='small' margin='normal' />}
                    renderOption={(props, option) => (
                      <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                        {option}
                      </li>
                    )}
                  />
                </Box>

                {questionAnswers.map((qa, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                    <Box>
                      <Typography>Question</Typography>
                      <Autocomplete
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size='small'
                            margin='normal'
                            placeholder='Question'
                          />
                        )}
                        renderOption={(props, option) => (
                          <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                            {option}
                          </li>
                        )}
                      />
                    </Box>
                    <Box>
                      <Typography>Answer</Typography>
                      <Autocomplete
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size='small'
                            margin='normal'
                            placeholder='Answer'
                          />
                        )}
                        renderOption={(props, option) => (
                          <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                            {option}
                          </li>
                        )}
                      />
                    </Box>
                    <Box mt={5}>
                      <IconButton onClick={() => handleRemoveQuestionAnswer(index)}>
                        <RiDeleteBinLine />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}


            <Box sx={{ display: 'flex', alighItems: 'center', gap: 3, mt: 2 }}>
              <Button variant="contained" onClick={handleSectionSave}>Save</Button>
              <Button variant="outlined" onClick={() => toggleDrawer(false)}>Cancel</Button>
            </Box>
          </Box>

        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={queDrawerOpen}
        onClose={() => setQueDrawerOpen(false)}
      >
        <Box
          sx={{ width: 600, height: '100vh', overflowY: 'auto' }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            {/* {selectedElement && (
              <>

                {selectedElement.type === 'Free Entry' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Email' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Number' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Date' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Radio Buttons' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Checkboxes' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Dropdown' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Yes/No' && (
                  <Typography variant='h6'> {selectedElement.text}</Typography>

                )}
                {selectedElement.type === 'Text Editor' && (
                  <Typography variant='h6'> Text Block</Typography>

                )}
              </>
            )} */}
            {selectedElement && (
            <Typography variant='h6'>{selectedElement.text}</Typography>
          )}

            <IconButton onClick={() => setQueDrawerOpen(false)}>
              <IoMdClose />
            </IconButton>
          </Box>

          <Divider />
          <Box sx={{ p: 3, }}>
            <Paper style={{ padding: '15px' }}>
              <Box display={'flex'} alignItems={'center'} m={1} >

                <FormControlLabel
                  control={
                    <Switch
                      checked={requiredButton}
                      onChange={(event) => handleRequiredButton(event.target.checked)}

                      color="primary"
                    />
                  }

                />

                <Typography variant='h6'>Required</Typography>

              </Box>
              <Divider />
              <p>It is mandatory to respond to this question to submit the organizer</p>
            </Paper>

            <Paper style={{ padding: '15px', marginTop: '20px' }}>
              <Box display={'flex'} alignItems={'center'} m={1} >

                <FormControlLabel
                  control={
                    <Switch
                      checked={prefilledButton}
                      onChange={(event) => handlePrefilledButton(event.target.checked)}

                      color="primary"
                    />
                  }

                />

                <Typography variant='h6'>Pre-Filled</Typography>

              </Box>
              <Divider />
              <p>If asked before, answer pre-populates from previous organizer</p>
            </Paper>

            <Paper style={{ padding: '15px', marginTop: '20px' }}>
              <Box display={'flex'} alignItems={'center'} m={1} >
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={queConditionButton}
                        onChange={(event) => handleQueConditionButton(event.target.checked)}

                        color="primary"
                      />
                    }

                  />
                </Box>
                <Typography variant='h6'>Conditional</Typography>

              </Box>
              <Divider />
              <p>Ask question only in certain scenarios</p>
              {queConditionButton && (
                <Box mb={3} mt={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Conditions</Typography>
                    <Button variant="text" onClick={handleAddQuestionAnswer}>
                      Add
                    </Button>
                  </Box>
                  <Divider />
                  <Box mt={2}>
                    <Typography>Mode</Typography>
                    <Autocomplete
                      options={['Any', 'All']}
                      defaultValue="Any"
                      value={mode} // Bind value to state
                      onChange={(event, newValue) => setMode(newValue)}
                      renderInput={(params) => <TextField {...params} variant="outlined" size='small' margin='normal' />}
                      renderOption={(props, option) => (
                        <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                          {option}
                        </li>
                      )}
                    />
                  </Box>

                  {questionAnswers.map((qa, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                      <Box>
                        <Typography>Question</Typography>
                        <Autocomplete
                         options={getRadioButtonOptions()}
                         value={selectedQuestions[index] || null}
                         onChange={(event, newValue) => handleQuestionSelect(newValue, index)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size='small'
                              margin='normal'
                              placeholder='Question'
                            />
                          )}
                          renderOption={(props, option) => (
                            <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                              {option}
                            </li>
                          )}
                        />
                      </Box>
                      <Box>
                        <Typography>Answer</Typography>
                        <Autocomplete
                          options={getAnswerOptions(selectedQuestions[index])} // Get options based on selected question
                          value={selectedAnswers[index] || null}
                          onChange={(event, newValue) => {
                            const updatedAnswers = [...selectedAnswers];
                            updatedAnswers[index] = newValue;
                            setSelectedAnswers(updatedAnswers);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size='small'
                              margin='normal'
                              placeholder='Answer'
                            />
                          )}
                          renderOption={(props, option) => (
                            <li {...props} style={{ margin: '5px', cursor: 'pointer' }}>
                              {option}
                            </li>
                          )}
                        />
                      </Box>
                      <Box mt={5}>
                        <IconButton onClick={() => handleRemoveQuestionAnswer(index)}>
                          <RiDeleteBinLine />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

            </Paper>
            <Paper style={{ padding: '15px', marginTop: '20px' }}>
              <Box display={'flex'} alignItems={'center'} m={1} >
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={descriptionButton}
                        onChange={(event) => handleDescriptionButton(event.target.checked)}

                        color="primary"
                      />
                    }

                  />
                </Box>
                <Typography variant='h6'>Description</Typography>

              </Box>
              <Divider />
              <p>Add instructional text to help clients answer your question</p>
              {descriptionButton && (
                <Box mb={3} mt={2}>
                  <Typography>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder='Description'
                    variant="outlined"
                    margin='normal'
                    value={descriptionText}
                    onChange={(event) => setDescriptionText(event.target.value)}
                  />


                </Box>
              )}

            </Paper>
            <Box sx={{ display: 'flex', alighItems: 'center', gap: 3, mt: 2 }}>
              <Button variant="contained" onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={() => setQueDrawerOpen(false)}>Cancel</Button>
            </Box>
          </Box>

        </Box>
      </Drawer>
    </Box>
  );
};

export default Section;
