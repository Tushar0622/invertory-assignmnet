import React from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addField, updateFieldType, removeField } from '../store/actions/machineFieldActions';
import { addType } from '../store/actions/machineFieldActions';
import { Row, Col, Card, Button,Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { removeType } from '../store/actions/machineFieldActions';
import { editTypeName, updateSingleFieldType } from '../store/actions/machineFieldActions';


const RenderInput = ({type, field, handleInputChange}) => {
  switch (type) {
    case 'number':
      return <input type='number' name={field.id} onChange={(e) => handleInputChange(e)} />;
    case 'small text':
      return <input type='text' name={field.id} maxLength={100} onChange={(e) => handleInputChange(e)} />;
    case 'long text':
      return <textarea maxLength={200} name={field.id} onChange={(e) => handleInputChange(e)} />;
    case 'date':
      return <input type='date' name={field.id} onChange={(e) => handleInputChange(e)} />;
    default:
      return null;
  }
}

const MachineType = () => {
  const dispatch = useDispatch();
  const machineTypes = useSelector((state) => state.machineFieldReducer?.machineTypes);
  const types = useSelector((state) => state.machineFieldReducer?.types);

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

  const handleChangeInput = (index, value, typeId, fieldId) => {
    dispatch(updateSingleFieldType(index, value, typeId, fieldId));
  }

  

  return (
    <>
      <div className='container mt-4'>
      <Row>
        {machineTypes && machineTypes.length > 0 && machineTypes.map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={4} xl={3} className='mb-4'>
            <Card>
              <Card.Header className='d-flex justify-content-between align-items-center'>
                <span>{item.machineType || 'New Type'}</span>
                <IoClose onClick={() => handleRemoveType(item.typeId)} style={{ cursor: 'pointer' }} />
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Object Type</Form.Label>
                    <Form.Control
                      type='text'
                      value={item.machineType}
                      onChange={(e) => handleObjectTypeBlur(e, item.typeId)}
                      placeholder='Enter object type'
                    />
                  </Form.Group>
                  <div className='fields_container'>
                    {item.fields.map((field, itemInd) => (
                      <div key={itemInd} className='field_container mb-3'>
                        <Form.Group>
                          <Form.Label>Field Type</Form.Label>
                          <Form.Select
                            value={field.type}
                            onChange={(e) => handleFieldTypeChange(itemInd, e.target.value, item.typeId, field.id)}
                          >
                            <option value='number'>Number</option>
                            <option value='small text'>Small Text</option>
                            <option value='long text'>Long Text</option>
                            <option value='date'>Date</option>
                            <option value='remove'>Remove</option>
                          </Form.Select>
                        </Form.Group>
                        <RenderInput type={field.type} field={field} handleInputChange={(e) => handleChangeInput(itemInd, e.target.value, item.typeId, field.id)} />
                      </div>
                    ))}
                  </div>
                  <Button variant='primary' onClick={() => handleAddField(item.typeId)}>
                    Add Field
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col xs={12} sm={6} lg={4} xl={3} className='d-flex align-items-center justify-content-center'>
          <Button variant='outline-primary' onClick={handleAddType}>
            Add Type
          </Button>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default MachineType;
