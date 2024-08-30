export const addNewMachine = (data) => ({
    type: "ADD_NEW_TYPES",
    payload: data
});

export const getMachineList = (data) => ({
    type: "GET_MACHINE_TYPES_LIST",
    payload: data
});

export const getMachine = (data) => ({
    type: "GET_MACHINE_TYPE",
    payload: data
});