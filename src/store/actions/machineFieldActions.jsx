
import { v4 as uuidv4 } from 'uuid';

export const addField = (data) => ({
  type: "ADD_NEW_FIELD",
  payload: data
});

export const editTypeName = (data) => ({
  type: "EDIT_TYPE_NAME",
  payload: data
});

export const updateFieldType = (index, newType, typeId, fieldId) => ({
  type: "UPDATE_FIELD_TYPE",
  payload: { index, newType, typeId, fieldId }
});

export const updateSingleFieldType = (index, newType, typeId, fieldId) => ({
  type: "UPDATE_SINGLE_FIELD",
  payload: { index, newType, typeId, fieldId }
});

export const removeField = (index, newType, typeId, fieldId) => ({
  type: "REMOVE_FIELD",
  payload: { index, newType, typeId, fieldId }
});


export const addType = (data) => ({
  type: "ADD_NEW_TYPE",
  payload: data
});

export const removeType = (id) => ({
  type: "REMOVE_TYPE",
  payload: id
});
