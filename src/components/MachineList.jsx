import React from 'react'
import { Dropdown, DropdownButton, Form, Row, Col  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMachine, deleteMachine } from '../store/actions/machineAction';
import { v4 as uuidv4 } from 'uuid';

const MACHINE_TYPES = [
    {
        machineType: "ChainSaws",
        typeId: "ChainSaws_ID",
        id: "chain9875"
    },
    {
        machineType: "Bulldozers",
        typeId: "Bulldozers_ID",
        id: "bull1234"
    },
    {
        machineType: "Tractors",
        typeId: "Tractors_ID",
        id: "trac7487"
    }
]

const MachineList = () => {
    const dispatch = useDispatch();

    const allMachineList = useSelector((state) => state.machineReducer.machineList);
    const machineTypes = useSelector((state) => state.machineReducer.machineTypes);

    const handleAddMachine = (item) => {

        const uniqueId = uuidv4();
        // console.log("GGHJGH:", uniqueId)

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
            // inputBarLength: ""
            
        }

        dispatch(addNewMachine((newMachine)));

        // console.log("itemId:", itemId)
    }

    const handleMachineDelete = (machineId) => {
        dispatch(deleteMachine(machineId));
    }

    return (
        <div className='container'>
            <div>
                <Row className=''>
                    {allMachineList && allMachineList.length > 0 && allMachineList.map((machineItem, index) => (
                        <React.Fragment key={machineItem?.id}>
                            <Col xs={12} sm={6} lg={4} xl={3}>
                                <div className='machine_wrapper'>
                                    <div className='machine_wrapper_header p-3 d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'>{`${machineItem?.machineType} - ${machineItem?.model ? machineItem?.model : "No title"}`}</p>
                                        <button onClick={() => handleMachineDelete(machineItem.id)}>Del</button>
                                    </div>
                                    <div className='p-3'>
                                        <div>
                                            <Form.Label htmlFor="inputModel">Model</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputModel"
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputType">Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputType"
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputGrade">Grade</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputGrade"
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputBarLength">Bar Length (Inch)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="inputBarLength"
                                            />
                                        </div>
                                        <div>
                                            <Form.Label htmlFor="inputBrand">Brand</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="inputBrand"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            
                        </React.Fragment>
                    ))}
                    {/* <Col xs={12} sm={6} lg={4} xl={3}>
                        <DropdownButton id="dropdown-basic-button" title="Add Item">
                            {MACHINE_TYPES && MACHINE_TYPES.length > 0 && MACHINE_TYPES.map((item, index) => (
                                <Dropdown.Item key={item.id}
                                    onClick={() => handleAddMachine(item)} 
                                    >{item.machineType}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Col> */}
                    <Col xs={12} sm={6} lg={4} xl={3}>
                        <DropdownButton id="dropdown-basic-button" 
                         title="Add Item">
                            {machineTypes && machineTypes.length > 0 && machineTypes.map((item, index) => (
                                <Dropdown.Item  key={item.id}
                                    onClick={() => handleAddMachine(item)} 
                                    >{item.machineType}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MachineList