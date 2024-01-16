import {configureStore, createSlice} from '@reduxjs/toolkit';
import user from './store/userSlice';

let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12],
  reducers : {
    addName(state){
      //initialState 형식이 오브젝트=>'{}'가 아니면 무조건 return 으로 요청에 대한 응답처리
      return 'kim ' + state;
    }
  }
});

export let { addName } = stock.actions;

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, img : '/img/img01.png', name : 'White and Black', count : 2},
    {id : 2, img : '/img/img03.png', name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    setPlusCart(state, action){
      let i = state.findIndex((x) => {
        return x.id === action.payload;
      })
      state[i].count++;
    },
    setMinusCart(state, action){
      let i = state.findIndex(function(x){
        return x.id === action.payload;
      })
      state[i].count--;
    },
    addItem(state, action){
      state.push(action.payload);
    },
  }
});

export let { setPlusCart, setMinusCart, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
  }
});