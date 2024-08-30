export const addNewMachine = (data) => ({
  type: "ADD_NEW_MACHINE",
  payload: data,
});
export const addNewMachineByType = (data) => ({
  type: "ADD_NEW_MACHINE_BY_TYPE",
  payload: data,
});

export const deleteMachine = (data) => ({
  type: "DELETE_MACHINE",
  payload: data,
});

export const getMachineListByType = (data) => ({
  type: "GET_MACHINE_BY_TYPE",
  payload: data,
});

export const getMachineList = (data) => ({
  type: "GET_MACHINE_LIST",
  payload: data,
});

export const getMachine = (data) => ({
  type: "GET_MACHINE",
  payload: data,
});

export const updateMachineInfo = (data) => ({
  type: "UPDATE_MACHINE_INFO",
  payload: data,
});

export const setCurrentMachineType = (data) => ({
  type: "GET_CURRENT_TYPE",
  payload: data,
});
