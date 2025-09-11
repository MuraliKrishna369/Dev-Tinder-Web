import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: null,
    reducers: {
        updateTargetUser: (state, action) => {
            return action.payload
        }
    }
})

export const { updateTargetUser} = chatSlice.actions;
export default chatSlice.reducer;