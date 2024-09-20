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
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme
import 'quill-emoji/dist/quill-emoji.css'; // Emoji styles
import Quill from 'quill';
import 'quill-emoji';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
Quill.register('modules/emoji', require('quill-emoji'));

const Section = ({ section, onDelete, onUpdate, onDuplicate }) => {
  const [text, setText] = useState(section.text);
  const [formElements, setFormElements] = useState(section.formElements || []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [absoluteDate, setAbsoluteDates] = useState(false);
  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked);
  };
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
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
    const newElement = { type, id: Date.now(), sectionid: section.id, options: [], text: '' };
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
          sx={{ width: 450, }}
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
          <Box>
            <Box display={'flex'} alignItems={'center'} >
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={absoluteDate}
                      onChange={(event) => handleAbsolutesDates(event.target.checked)}

                      color="primary"
                    />
                  }

                />
              </Box>
              <Typography variant='h6'>Allow client to repeat</Typography>

            </Box>
            {absoluteDate && (
              <Box mb={3}>
                <p>bhjgjhv</p>
              </Box>
            )}
          </Box>

        </Box>
      </Drawer>
    </Box>
  );
};

export default Section;
