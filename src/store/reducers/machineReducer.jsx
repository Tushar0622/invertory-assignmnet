import { ALL_TYPES_MACHINE_LIST } from "../../constant/machineConstants"

const initialState = {
    machineList: [],
    machineTypes: [],
    currMachineList: [],
    currentMachineType: {}
}

export const machineReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_MACHINE":
            let combinedMachine = [...state?.machineList, action.payload];
            return {
                ...state,
                machineList: combinedMachine
            }
        case "ADD_NEW_MACHINE_BY_TYPE":
            let prevCombinedMachine = [...state.machineList, action.payload];
            let machineListByType = [...state.currMachineList, action.payload];
            return {
                ...state,
                machineList: prevCombinedMachine,
                currMachineList: machineListByType,
            }

        case "UPDATE_MACHINE_INFO":
            let updatedMachineList = [...state.machineList];
            const machineIndex = updatedMachineList.findIndex(item => item.id === action.payload.machineId);
            if (machineIndex !== -1) {
                const machineToUpdate = updatedMachineList[machineIndex];
                if (Object.prototype.hasOwnProperty.call(machineToUpdate, action.payload.updateKey)) {
                    const updatedMachine = {
                        ...machineToUpdate,
                        [action.payload.updateKey]: action.payload.updateValue
                    };
                    updatedMachineList[machineIndex] = updatedMachine;
                } else {
                    const updatedMachine = {
                        ...machineToUpdate,
                        [action.payload.updateKey]: action.payload.updateValue
                    };
                    updatedMachineList[machineIndex] = updatedMachine;
                }
            } else {
                console.log('Machine not found in machineList');
            }
            return {
                ...state,
                machineList: updatedMachineList
            };

        case "DELETE_MACHINE":
            let filteredMachine = state.machineList;
            if(state.machineList.length > 0){
                filteredMachine = filteredMachine?.filter((item) => item.id !== action.payload);
            }
            let oldMachineList = state.currMachineList
            if(state.currMachineList.length > 0){
                oldMachineList = oldMachineList?.filter((item) => item.id !== action.payload);
            }
            return {
                ...state,
                machineList: filteredMachine,
                currMachineList: oldMachineList
            }
        case "GET_MACHINE_BY_TYPE":
            let previousMachines = state.machineList;
            let filteredMachineByType = state.machineList
            if(previousMachines.length > 0){
                filteredMachineByType = previousMachines?.filter((item) => item.typeId === action.payload);
            }
            return {
                ...state,
                currMachineList: filteredMachineByType
            }
        case "GET_MACHINE_LIST":
            return {
                ...state,
                machineList: action.payload
            }
        case "GET_MACHINE_TYPES":
            return {
                ...state,
                machineTypes: action.payload
            }

            // THIS IS THE PART OF TYPE
        case "GET_CURRENT_TYPE":
            return {
                ...state,
                currentMachineType: action.payload
            }
        default:
            return state;
    }
}