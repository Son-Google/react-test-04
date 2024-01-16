import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 44},
  reducers : {
    changeName(state){
      state.name = 'park';
    },
    //initialState 형식이 오브젝트=>'{}'이면 return 생략가능
    addAge(state, action){
      state.age += action.payload;
    },
  }
});

export let { changeName, addAge } = user.actions;

export default user;