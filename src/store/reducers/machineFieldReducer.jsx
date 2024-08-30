const initialState = {
  fields: [],
  machineTypes: []
};


export const machineFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_FIELD":
      function generateUniqueId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      let previousMachineTypes = [...state.machineTypes];
      let findTypeIndex = previousMachineTypes?.findIndex((item) => item.typeId === action.payload);
      if (findTypeIndex !== -1) {
        let updatedType = { ...previousMachineTypes[findTypeIndex] };
        let newField = { id: generateUniqueId(), type: 'small text', fieldType: "text", name: "" };
        updatedType.fields = [...(updatedType.fields || []), newField];
        previousMachineTypes[findTypeIndex] = updatedType;
      }
      return {
        ...state,
        machineTypes: previousMachineTypes,
      };

    case "ADD_NEW_TYPE":
      return {
        ...state,
        machineTypes: Array.isArray(state.machineTypes) ? [...state.machineTypes, action.payload] : [action.payload]
      };

    case "EDIT_TYPE_NAME":
      let previousMachineEditTypes = [...state.machineTypes];
      let findTypeEditIndex = previousMachineEditTypes?.findIndex((item) => item.typeId === action.payload.typeId);
      if (findTypeEditIndex !== -1) {
        let updatedType = { ...previousMachineEditTypes[findTypeEditIndex] };

        updatedType.machineType = action.payload.value

        // let newField = { id: generateUniqueId(), type: 'small text', fieldType: "text", name: "" };
        // updatedType.fields = [...(updatedType.fields || []), newField];
        previousMachineEditTypes[findTypeEditIndex] = updatedType;
      }
      return {
        ...state,
        machineTypes: previousMachineEditTypes
      };

    case "UPDATE_FIELD_TYPE":
  let previousMachineTypesField = [...state.machineTypes];
  let findTypeIndexField = previousMachineTypesField?.findIndex((item) => item.typeId === action.payload.typeId);
  
  if (findTypeIndexField !== -1) {
    let updatedType = { ...previousMachineTypesField[findTypeIndexField] };
    let findFieldInd = updatedType.fields?.findIndex((fieldItem) => fieldItem.id === action.payload.fieldId);
    if (findFieldInd !== -1 && findFieldInd !== undefined) {
      let updatedField = { ...updatedType.fields[findFieldInd] };
      updatedField.type = action.payload.newType;
      updatedType.fields[findFieldInd] = updatedField;
      previousMachineTypesField[findTypeIndexField] = updatedType;
    }
  }

  return {
    ...state,
    machineTypes: previousMachineTypesField,
  };


    case "UPDATE_SINGLE_FIELD":
  let previousSingleMachineTypesField = [...state.machineTypes];
  let findSingleTypeIndexField = previousSingleMachineTypesField?.findIndex((item) => item.typeId === action.payload.typeId);
  
  if (findSingleTypeIndexField !== -1) {
    let updatedType = { ...previousSingleMachineTypesField[findSingleTypeIndexField] };
    let findFieldInd = updatedType.fields?.findIndex((fieldItem) => fieldItem.id === action.payload.fieldId);
    if (findFieldInd !== -1 && findFieldInd !== undefined) {
      let updatedField = { ...updatedType.fields[findFieldInd] };
      updatedField.name = action.payload.newType;
      updatedType.fields[findFieldInd] = updatedField;
      previousSingleMachineTypesField[findSingleTypeIndexField] = updatedType;
    }
  }

  return {
    ...state,
    machineTypes: previousSingleMachineTypesField,
  };

  case "REMOVE_FIELD":

  let previousMachineTypesRemoveField = [...state.machineTypes];
  let findTypeIndexRemoveField = previousMachineTypesRemoveField?.findIndex((item) => item.typeId === action.payload.typeId);
  if (findTypeIndexRemoveField !== -1) {
    let updatedType = { ...previousMachineTypesRemoveField[findTypeIndexRemoveField] };
    let findFieldInd = updatedType.fields?.findIndex((fieldItem) => fieldItem.id === action.payload.fieldId);
    let filteredField = updatedType.fields?.filter((fieldItem) => fieldItem.id != action.payload.fieldId);
    if (findFieldInd !== -1 && findFieldInd !== undefined) {
      let updatedField = filteredField;
      updatedField.type = action.payload.newType;
      updatedType.fields = filteredField;
      previousMachineTypesRemoveField[findTypeIndexRemoveField] = updatedType;
    }
  }

      return {
        ...state,
         machineTypes: previousMachineTypesRemoveField,
      };
      case "REMOVE_TYPE":
        let filteredItem = state.machineTypes.filter(item => item.typeId !== action.payload)
      return {
        ...state,
        machineTypes: filteredItem
      };
    default:
      return state;
  }
};
