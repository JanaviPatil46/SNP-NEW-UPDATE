import React, { useState, useEffect } from 'react';
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Input,
  Typography
} from '@mui/material';

const Section = ({ section, onDelete, onUpdate }) => {
  const [text, setText] = useState(section.text);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formElements, setFormElements] = useState(section.formElements || []);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setText(section.text);
    setFormElements(section.formElements);
  }, [section]);

  const handleDelete = () => {
    onDelete(section.id);
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
    setDropdownVisible(false);
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

  const renderOptions = (element) => {
    return (
      <Box>
        {element.options && element.options.map(option => (
          <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              variant="outlined"
              placeholder="Option"
              value={option.text}
              onChange={(e) => handleOptionChange(element.id, option.id, e.target.value)}
              sx={{ marginRight: '8px' }}
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
          <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              variant="outlined"
              placeholder="Free Entry"
              value={element.text}
              onChange={(e) => handleElementTextChange(element.id, e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <IconButton onClick={() => handleDeleteFormElement(element.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
        );
      case 'Email':
        return (
          <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              variant="outlined"
              placeholder="Email"
              value={element.text}
              onChange={(e) => handleElementTextChange(element.id, e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <IconButton onClick={() => handleDeleteFormElement(element.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
        );
      case 'Number':
        return (
          <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              variant="outlined"
              placeholder="Number"
              value={element.text}
              onChange={(e) => handleElementTextChange(element.id, e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <IconButton onClick={() => handleDeleteFormElement(element.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
        );
      case 'Date':
        return (
          <Box key={element.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Input
              type="date"
              value={element.text}
              onChange={(e) => handleElementTextChange(element.id, e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <IconButton onClick={() => handleDeleteFormElement(element.id)}>
              <RiDeleteBinLine />
            </IconButton>
          </Box>
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
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ marginRight: '8px' }}
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
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                sx={{ marginRight: '8px' }}
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
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                sx={{ marginRight: '8px' }}
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
                onChange={(e) => handleElementTextChange(element.id, e.target.value)}
                sx={{ marginRight: '8px' }}
              />
              <IconButton onClick={() => handleDeleteFormElement(element.id)}>
                <RiDeleteBinLine />
              </IconButton>
            </Box>
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
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          variant="outlined"
          fullWidth
          value={text}
          onChange={handleTextChange}
          placeholder="Section text"
        />
        <Box>
          <IconButton onClick={handleDelete}>
            <RiDeleteBinLine />
          </IconButton>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <HiOutlineDuplicate />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {['Free Entry', 'Email', 'Number', 'Date', 'Radio Buttons', 'Checkboxes', 'Dropdown', 'Yes/No'].map(type => (
              <MenuItem key={type} onClick={() => handleAddFormElement(type)}>
                {type}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {formElements.map(element => (
        <Box key={element.id} sx={{ marginTop: '16px' }}>
          {renderFormElement(element)}
        </Box>
      ))}
    </Box>
  );
};

export default Section;
