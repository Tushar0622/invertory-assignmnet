const initialState = {
    machineTypeList: []
}

export const machineTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MACHINE_TYPE_LIST":
            return {
                ...state,
                machineList: action.payload
            }
        default:
            return state;
    }
}