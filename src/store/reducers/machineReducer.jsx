
const initialState = {
  machineList: [],
  machineTypes: [],
  currMachineList: [],
  currentMachineType: {},
};

export const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_MACHINE":
      let combinedMachine = [...state?.machineList, action.payload];
      return {
        ...state,
        machineList: combinedMachine,
      };
    case "ADD_NEW_MACHINE_BY_TYPE":
      let prevCombinedMachine = [...state.machineList, action.payload];
      let machineListByType = [...state.currMachineList, action.payload];
      return {
        ...state,
        machineList: prevCombinedMachine,
        currMachineList: machineListByType,
      };

    case "UPDATE_MACHINE_INFO":
      let updatedMachineList = [...state.machineList];
      const machineIndex = updatedMachineList.findIndex(
        (item) => item.id === action.payload.machineId
      );

      let updatedCurrMachineList = [...state.currMachineList];
      const machineCurrIndex = updatedCurrMachineList.findIndex(
        (item) => item.id === action.payload.machineId
      );

      if (machineIndex !== -1) {
        const machineToUpdate = updatedMachineList[machineIndex];

        if (Object.hasOwnProperty(action.payload.updateKey)) {
          const updatedMachine = {
            ...machineToUpdate,
            [action.payload.updateKey]: action.payload.updateValue,
          };
          updatedMachineList[machineIndex] = updatedMachine;
        } else {
          const updatedMachine = {
            ...machineToUpdate,
            [action.payload.updateKey]: action.payload.updateValue,
          };
          updatedMachineList[machineIndex] = updatedMachine;
        }
      } else {
        console.log("Machine not found in machineList");
      }

      if (machineCurrIndex !== -1) {
        const machineToUpdate = updatedCurrMachineList[machineCurrIndex];

        if (Object.hasOwnProperty(action.payload.updateKey)) {
          const updatedMachine = {
            ...machineToUpdate,
            [action.payload.updateKey]: action.payload.updateValue,
          };
          updatedCurrMachineList[machineCurrIndex] = updatedMachine;
        } else {
          const updatedMachine = {
            ...machineToUpdate,
            [action.payload.updateKey]: action.payload.updateValue,
          };
          updatedCurrMachineList[machineCurrIndex] = updatedMachine;
        }
      } else {
        console.log("Machine not found in machineList");
      }
      return {
        ...state,
        machineList: updatedMachineList,
        currMachineList: updatedCurrMachineList,
      };

    case "DELETE_MACHINE":
      let filteredMachine = state.machineList;
      if (state.machineList.length > 0) {
        filteredMachine = filteredMachine?.filter(
          (item) => item.id !== action.payload
        );
      }
      let oldMachineList = state.currMachineList;
      if (state.currMachineList.length > 0) {
        oldMachineList = oldMachineList?.filter(
          (item) => item.id !== action.payload
        );
      }
      return {
        ...state,
        machineList: filteredMachine,
        currMachineList: oldMachineList,
      };
    case "GET_MACHINE_BY_TYPE":
      let previousMachines = state.machineList;
      let filteredMachineByType = state.machineList;
      if (previousMachines.length > 0) {
        filteredMachineByType = previousMachines?.filter(
          (item) => item.typeId === action.payload
        );
      }
      return {
        ...state,
        currMachineList: filteredMachineByType,
      };
    case "GET_MACHINE_LIST":
      return {
        ...state,
        machineList: action.payload,
      };
    case "GET_MACHINE_TYPES":
      return {
        ...state,
        machineTypes: action.payload,
      };

    case "GET_CURRENT_TYPE":
      return {
        ...state,
        currentMachineType: action.payload,
      };
    default:
      return state;
  }
};
