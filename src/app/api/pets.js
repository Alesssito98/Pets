import axios from "axios";

const API_URL = "https://petstore.swagger.io/v2/pet";

export const getPets = () => axios.get(`${API_URL}/findByStatus?status=available`);
export const getPetById = (id) => axios.get(`${API_URL}/${id}`);
export const addPet = (petData) => axios.post(API_URL, petData);
export const updatePet = (petData) => axios.put(API_URL, petData);
export const deletePet = (id) => axios.delete(`${API_URL}/${id}`);
