import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewMachine,
  deleteMachine,
  getMachineListByType,
  addNewMachineByType,
  updateMachineInfo,
} from "../store/actions/machineAction";
import { v4 as uuidv4 } from "uuid";

const Machine = () => {
  const dispatch = useDispatch();
  const [currValue, setCurrValue] = useState("");

  const allMachineList = useSelector(
    (state) => state.machineReducer.machineList
  );
  const currMachineList = useSelector(
    (state) => state.machineReducer.currMachineList
  );
  const currMachineType = useSelector(
    (state) => state.machineReducer.currentMachineType
  );
  const machineTypes = useSelector(
    (state) => state.machineFieldReducer.machineTypes
  );
  const objectTitles = useSelector(
    (state) => state.machineFieldReducer.objectTitles
  );

  const handleAddMachine = (item) => {
    const uniqueId = uuidv4();

    let newMachine = {
      id: uniqueId,
      typeId: `${item?.typeId}`,
      machineType: `${item?.machineType}`,
      model: "",

      brand: "",
    };

    dispatch(addNewMachineByType(newMachine));
  };

  const handleMachineDelete = (machineId) => {
    dispatch(deleteMachine(machineId));
  };

  const getInputType = (fieldType) => {
    switch (fieldType) {
      case "number":
        return "number";
      case "small text":
        return "text";
      case "long text":
        return "text";
      case "date":
        return "date";
      default:
        return null;
    }
  };

  const getMachineTypeFields = (machineItem) => {
    let returnValue = [];
    let findedValue =
      machineTypes &&
      machineTypes.length > 0 &&
      machineTypes.find((item) => item.typeId === machineItem.typeId);
    if (findedValue) {
      returnValue = findedValue;
    }
    return returnValue;
  };

  const handleInputBlur = (e, item, fieldId) => {
    let data = {
      machineId: item.id,
      updateValue: e.target.value,
      updateKey: e.target.name?.trim(),
    };

    dispatch(updateMachineInfo(data));
  };

  const getTitles = (machineItem, valuesItem) => {
    let retVal = "No title";
    let findItem =
      valuesItem &&
      valuesItem.length > 0 &&
      valuesItem.find((item) => item.typeId === machineItem.typeId);
    if (findItem) {
      retVal = machineItem[findItem.value];
    }
    return retVal;
  };

  const getItemValues = (machineItem, machineItemField) => {
    let retValue = "";

    retValue = machineItem[machineItemField.name];

    return retValue;
  };

  return (
    <div className="container">
      <div>
        <Row className="">
          {currMachineList &&
            currMachineList.length > 0 &&
            currMachineList.map((machineItem, index) => (
              <React.Fragment key={machineItem?.id}>
                <Col xs={12} sm={6} lg={4} xl={3}>
                  <div className="machine_wrapper mb-3">
                    <div className="machine_wrapper_header p-3 d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        {getTitles(machineItem, objectTitles)}
                      </p>
                      <IoClose
                        onClick={() => handleMachineDelete(machineItem.id)}
                      />
                    </div>
                    <div className="p-3">
                      {getMachineTypeFields(machineItem)?.fields?.map(
                        (machineItemField, machineInd) => (
                          <div className="machine__input_wrapper mb-3">
                            <Form.Label htmlFor={machineItemField?.id}>
                              {machineItemField.name}
                            </Form.Label>
                            <Form.Control
                              type={getInputType(machineItemField?.type)}
                              id={`${machineItemField?.id}${machineItem.id}`}
                              name={`${machineItemField.name}`}
                              value={getItemValues(
                                machineItem,
                                machineItemField
                              )}
                              onChange={(e) =>
                                handleInputBlur(
                                  e,
                                  machineItem,
                                  machineItemField?.id
                                )
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            ))}
          <Col xs={12} sm={6} lg={4} xl={3}>
            <button
              className="global_btn"
              onClick={() => handleAddMachine(currMachineType)}
              variant="primary"
              size="lg"
            >
              Add Item
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Machine;
