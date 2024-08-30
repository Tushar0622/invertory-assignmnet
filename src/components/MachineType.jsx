import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  updateFieldType,
  removeField,
} from "../store/actions/machineFieldActions";
import { addType } from "../store/actions/machineFieldActions";
import { Row, Col, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { removeType } from "../store/actions/machineFieldActions";
import {
  editTypeName,
  updateSingleFieldType,
  addObjectTitle,
} from "../store/actions/machineFieldActions";

const RenderInput = ({ type, field, handleInputChange }) => {
  switch (type) {
    case "number":
      return (
        <input
          className="type_input_field"
          type="number"
          name={field.id}
          value={field.name}
          onChange={(e) => handleInputChange(e)}
        />
      );
    case "small text":
      return (
        <input
          className="type_input_field"
          type="text"
          name={field.id}
          value={field.name}
          maxLength={100}
          onChange={(e) => handleInputChange(e)}
        />
      );
    case "long text":
      return (
        <textarea
          className="type_input_field"
          maxLength={200}
          name={field.id}
          value={field.name}
          onChange={(e) => handleInputChange(e)}
        />
      );
    case "date":
      return (
        <input
          className="type_input_field"
          type="date"
          name={field.id}
          value={field.name}
          onChange={(e) => handleInputChange(e)}
        />
      );
    default:
      return null;
  }
};

const MachineType = () => {
  const dispatch = useDispatch();
  const machineTypes = useSelector(
    (state) => state.machineFieldReducer?.machineTypes
  );
  const types = useSelector((state) => state.machineFieldReducer?.types);
  const objectTitles = useSelector(
    (state) => state.machineFieldReducer.objectTitles
  );

  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    setUpdateTrigger((prev) => prev + 1);
  }, [objectTitles]);

  const handleAddField = (typeId) => {
    dispatch(addField(typeId));
  };

  const handleFieldTypeChange = (index, newType, typeId, fieldId) => {
    if (newType === "remove") {
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
      fields: [
        {
          id: generateUniqueId(),
          type: "small text",
          fieldType: "text",
          name: "",
        },
      ],
    };
    dispatch(addType(newType));
  };

  const handleObjectTypeBlur = (e, typeId) => {
    dispatch(editTypeName({ value: e.target.value, typeId: typeId }));
  };

  const handleRemoveType = (typeId) => {
    dispatch(removeType(typeId));
  };

  const handleChangeInput = (index, value, typeId, fieldId) => {
    dispatch(updateSingleFieldType(index, value, typeId, fieldId));
  };

  const handleObjTitleChange = (e, typeId) => {
    dispatch(addObjectTitle({ typeId: typeId, value: e.target.value }));
  };

  const getObjTileValue = (typeId) => {
    let retVal = "";
    let findRetVal =
      objectTitles &&
      objectTitles.length > 0 &&
      objectTitles.find((item) => item.typeId === typeId);
    if (findRetVal) {
      retVal = findRetVal.value;
    }
    return retVal;
  };

  return (
    <>
      <div className="container">
        <Row>
          {console.log("OBJECT_TITLES:", objectTitles)}
          {machineTypes &&
            machineTypes.length > 0 &&
            machineTypes.map((item, index) => (
              <>
                <Col xs={12} sm={6} lg={4} xl={3} key={updateTrigger}>
                  <div className="type_container type_wrapper mb-3">
                    <div className="form_container">
                      <div className="type_form d-flex justify-content-between align-items-center p-3 type_wrapper_header">
                        <span>{item?.machineType}</span>
                        <IoClose
                          onClick={() => handleRemoveType(item.typeId)}
                        />
                      </div>

                      <div className="p-3">
                        <div className="machine__input_wrapper pb-3">
                          <Form.Label htmlFor="objectType">
                            Object type
                          </Form.Label>
                          <Form.Control
                            // type="text"
                            value={item?.machineType}
                            type={"text"}
                            name="objectType"
                            onChange={(e) =>
                              handleObjectTypeBlur(e, item.typeId)
                            }
                          />
                        </div>

                        <Form.Group className="mb-3">
                          <Form.Label>Object Title</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={item?.currObjectTitle}
                            onChange={(e) =>
                              handleObjTitleChange(e, item.typeId)
                            }
                          >
                            <option>select</option>
                            {item?.fields?.map((item) => (
                              <option value={item?.name}>{item?.name}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <div className="fields_container">
                          <p className="lbl_fields mb-2">Fields</p>
                          {item &&
                            item.fields &&
                            item.fields.length > 0 &&
                            item.fields.map((field, itemInd) => (
                              <div
                                key={itemInd}
                                className="field_container type_field_wrapper mb-3"
                              >
                                <RenderInput
                                  type={field.type}
                                  field={field}
                                  handleInputChange={(e) =>
                                    handleChangeInput(
                                      itemInd,
                                      e.target.value,
                                      item?.typeId,
                                      field.id
                                    )
                                  }
                                />
                                <select
                                  className="type_field_select_"
                                  value={field.type}
                                  onChange={(e) =>
                                    handleFieldTypeChange(
                                      itemInd,
                                      e.target.value,
                                      item?.typeId,
                                      field.id
                                    )
                                  }
                                >
                                  <option value="number">Number</option>
                                  <option value="small text">Small Text</option>
                                  <option value="long text">Long Text</option>
                                  <option value="date">Date</option>
                                  <option value="remove">Remove</option>
                                </select>
                              </div>
                            ))}
                        </div>

                        <div>
                          <button
                            className="global_btn"
                            onClick={() => handleAddField(item?.typeId)}
                          >
                            Add Field
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}

          <Col xs={12} sm={6} lg={4} xl={3}>
            <div className="type_btn_cont">
              <button
                className="type_btn global_btn"
                onClick={() => handleAddType()}
              >
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
