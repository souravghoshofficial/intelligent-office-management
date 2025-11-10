import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  position: "",
  department: "",
  role: "",
  status: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadData: (state, action) => {
      const {
        id,
        name,
        email,
        phone,
        position,
        department,
        role,
        status,
      } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.position = position;
      state.department = department;
      state.role = role;
      state.status = status;
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { loadData, clearUser } = userSlice.actions;
export default userSlice.reducer;
