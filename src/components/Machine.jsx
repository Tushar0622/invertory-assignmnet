import React from 'react';
import { Dropdown, DropdownButton, Form, Row, Col, Button  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMachine, deleteMachine, getMachineListByType, addNewMachineByType, updateMachineInfo } from '../store/actions/machineAction';
import { v4 as uuidv4 } from 'uuid';
import { ALL_TYPES_MACHINE_LIST } from '../constant/machineConstants';

const Machine = () => {

  const dispatch = useDispatch();

  const allMachineList = useSelector((state) => state.machineReducer.machineList);
  const currMachineList = useSelector((state) => state.machineReducer.currMachineList);
  const currMachineType = useSelector((state) => state.machineReducer.currentMachineType);
  const machineTypes = useSelector((state) => state.machineFieldReducer.machineTypes);


  const handleAddMachine = (item) => {

    const uniqueId = uuidv4();

    let newMachine = {
        id: uniqueId,
        typeId: `${item?.typeId}`,
        machineType: `${item?.machineType}`,
        model: "",
        // netPower: "",
        // operatingWeight: "",
        brand: "",
        // buildDate: "",
        // quantity: "",
        // inputBarLength:''
    }

    dispatch(addNewMachineByType((newMachine)));

  }

  const handleMachineDelete = (machineId) => {
      dispatch(deleteMachine(machineId));
  }

  const getInputType = (fieldType) => {
    switch (fieldType) {
    case 'number':
        return "number";
    case 'small text':
        return "text";
    case 'long text':
        return "text";
    case 'date':
        return "date";
    default:
        return null;
    }
};



    const getMachineTypeFields = (machineItem) => {
        let returnValue = []
        let findedValue = machineTypes && machineTypes.length > 0 && machineTypes.find((item) => item.typeId === machineItem.typeId)
        if(findedValue){
            returnValue = findedValue
        }
        return returnValue
    }

    const handleInputBlur = (e, item, fieldId) => {
        //    let id = item.id
    
           let data = {
               machineId: item.id,
               updateValue: e.target.value,
               updateKey: e.target.name
           }
    
           dispatch(updateMachineInfo(data))
            // let existingItems = allMachineList.find(x=>x.id == item.id);
            // if(existingItems !== undefined){
            //   const newData = {...existingItems, [e.target.name]: e.target.value}
            //   dispatch(addNewMachine(newData))
            // }
        }

  return (
    <div className='container'>
            <div>
                <Row className=''>
                    {currMachineList && currMachineList.length > 0 && currMachineList.map((machineItem, index) => (
                        <React.Fragment key={machineItem?.id}>
                            <Col xs={12} sm={6} lg={4} xl={3}>
                                <div className='machine_wrapper'>
                                    <div className='machine_wrapper_header p-3 d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'>{`${machineItem?.machineType} - ${machineItem?.model ? machineItem?.model : "No title"}`}</p>
                                        <button onClick={() => handleMachineDelete(machineItem.id)}>Del</button>
                                    </div>
                                    <div className='p-3'>
                                        {getMachineTypeFields(machineItem)?.fields.map((machineItemField, machineInd) => (
                                            <div>
                                                <Form.Label htmlFor={machineItemField?.id}>{machineItemField.name}</Form.Label>
                                                <Form.Control
                                                    // type="text"
                                                    // type={getInputType(machineItemField?.type)}
                                                    // id={machineItemField?.id}
                                                    type={getInputType(machineItemField?.type)}
                                                    id={`${machineItemField?.id}${machineItem.id}`}
                                                    name={`${machineItemField?.id}${machineItem.id}`}
                                                    onBlur={(e) => handleInputBlur(e, machineItem, machineItemField?.id)}
                                                />
                                            </div>
                                        ))}

                                        {/* <div>
                                            <Form.Label htmlFor="inputModel">Model</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputModel"
                                                name="model"
                                                onBlur={(e) => handleInputBlur(e,machineItem)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputType">Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputType"
                                                name="type"
                                                onBlur={(e) => handleInputBlur(e, machineItem)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputGrade">Grade</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputGrade"
                                                name="grade"
                                                onBlur={(e) => handleInputBlur(e, machineItem)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputBarLength">Bar Length (Inch)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="inputBarLength"
                                                name="barLength"
                                                onBlur={(e) => handleInputBlur(e, machineItem)}
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputBrand">Brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputBrand"
                                                name="brand"
                                                onBlur={(e) => handleInputBlur(e, machineItem)}
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </Col>
                            
                        </React.Fragment>
                    ))}
                    <Col xs={12} sm={6} lg={4} xl={3}>
                        <Button onClick={() => handleAddMachine(currMachineType)} variant="primary" size="lg">
                          Add Item
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
  )
}

export default Machine