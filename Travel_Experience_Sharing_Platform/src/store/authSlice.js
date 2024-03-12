import {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    userData:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{

        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;
            // console.log("userdata:",state.userData)
        },
        logout:(state,action)=>{
            console.log(state.userData)
            state.status=false;
            state.userData=null
        }
    }
})


export const {login,logout}=authSlice.actions;
export default authSlice.reducer;