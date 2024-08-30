import React from 'react';
// import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addField, updateFieldType, removeField } from '../store/actions/machineFieldActions';
import { addType } from '../store/actions/machineFieldActions';
import { Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { removeType } from '../store/actions/machineFieldActions';
import { editTypeName } from '../store/actions/machineFieldActions';

const MachineType = () => {
  const dispatch = useDispatch();
  const machineTypes = useSelector((state) => state.machineFieldReducer?.machineTypes);
  const types = useSelector((state) => state.machineFieldReducer?.types);

  const renderInput = (type) => {
    switch (type) {
      case 'number':
        return <input type='number' />;
      case 'small text':
        return <input type='text' maxLength={1} />;
      case 'long text':
        return <textarea maxLength={200} />;
      case 'date':
        return <input type='date' />;
      default:
        return null;
    }
  };

  const handleAddField = (typeId) => {
    dispatch(addField(typeId));
  };

  const handleFieldTypeChange = (index, newType, typeId, fieldId) => {
    if (newType === 'remove') {
      handleRemoveField(index, newType, typeId, fieldId);
    } else {
      dispatch(updateFieldType(index, newType, typeId, fieldId));
    }
  };

  const handleRemoveField = (index, newType, typeId, fieldId) => {
    dispatch(removeField(index, newType, typeId, fieldId));
  };


  function generateUniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  const handleAddType = () => {
    const uniqueId = uuidv4();
    let newType = {
      typeId: uniqueId,
      machineType: "",
      title: "",
      fields: [{ id: generateUniqueId(), type: 'small text', fieldType: "text", name: "" }]
    }
    dispatch(addType(newType))
  };

  const handleObjectTypeBlur = (e, typeId) => {
    dispatch(editTypeName({value: e.target.value, typeId: typeId}))
  }

  const handleRemoveType = (typeId) => {
    dispatch(removeType(typeId));
  };

  

  return (
    <>
      <div className='container'>
      {console.log("item:", machineTypes)}
        <Row>
          {machineTypes && machineTypes.length > 0 && machineTypes.map((item, index) => (
            <>
            
            <Col xs={12} sm={6} lg={4} xl={3}>
              <div className='type_container'>
                  <div className='form_container'>
                    <div className='type_form'>
                      <span>Tractor</span>
                      {/* <IoClose onClick={() => handleRemoveType(item.typeId)} /> */}
                      <span onClick={() => handleRemoveType(item.typeId)}>Del</span>
                    </div>
                    <div  class="form-group-container">
                    <div class="form-group">
                    <div class="form-group">
                    <label for="object-type">Object Type</label>
                  </div>
                      <input type='text' value={item?.machineType} onChange={(e) => handleObjectTypeBlur(e, item.typeId)} />
                    </div>
                    </div>

                    <div className='form-group-container-dropdown'>
                    <div class="form-group">
                    <label for="object-type">Fields</label>
                  </div>
                      {item && item.fields && item.fields.length > 0 && item.fields.map((field, itemInd) => (
                        <div key={itemInd} className='input-dropdown-container'>
                          {console.log("field:", field)}
                          {/* <select className='dropdown-content'
                            value={field.type}
                            onChange={(e) => handleFieldTypeChange(itemInd, e.target.value, item?.typeId, field.id)}
                          >
                            <option value='number'>Number</option>
                            <option value='small text'>Small Text</option>
                            <option value='long text'>Long Text</option>
                            <option value='date'>Date</option>
                            <option value='remove'>Remove</option>
                          </select> */}
                           {field.type !== 'remove' && renderInput(field.type)}
                           <div class="dropdown-button" onclick="toggleDropdown()">
                        <div class="dropdown-header">
                            <span>Small Text</span>
                            <div class="arrow-down">&#9660;</div>
                        </div>
                        <div class="dropdown-content">
                            <a href="#" onclick="selectDropdownOption('Small Text')">Small Text</a>
                            <a href="#" onclick="selectDropdownOption('Long Text')">Long Text</a>
                            <a href="#" onclick="selectDropdownOption('Number')">Number</a>
                            <a href="#" onclick="selectDropdownOption('Date')">Date</a>
                            <a href="#" onclick="selectDropdownOption('Remove')">Remove</a>
                        </div>
                    </div>
                          {/* <input type='text'/> */}
                         
                        </div>
                      ))}

                      
                    </div>
                    <div class="add-field-container">
                <div class="dropdown-button-one" onclick="toggleAddFieldDropdown()">
                    <div class="dropdown-header">
                        <span onClick={() => handleAddField(item?.typeId)}>Add Field</span>
                        <div class="dropdown-icon">&#9660;</div>
                    </div>
                   
                </div>
            </div>
                    {/* <div>
                      <button onClick={() => handleAddField(item?.typeId)}>
                        Add Field
                      </button>
                    </div> */}
                  </div>

                  
                </div>
              </Col>
            </>
          ))}

          <Col xs={12} sm={6} lg={4} xl={3}>
            <div className='type_btn_cont'>
              <button className='type_btn' onClick={() => handleAddType()}>
                Add Type
              </button>
            </div>
         
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MachineType;
