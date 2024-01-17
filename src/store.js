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
      });
      state[i].count++;
      let c= state[i].count;
      state[i].count = (c > 5) ? 5 : c;
      if(state[i].count==6){
        alert('하지마!');
      }
    },
    setMinusCart(state, action){
      let i = state.findIndex(function(x){
        return x.id === action.payload;
      });
      state[i].count--;
      let c= state[i].count;
      state[i].count = (c < 1) ? 1 : c;
      if(c==0){
        state.splice(i, 1);
      }
    },
    addItem(state, action){
      const obj = action.payload;
      let i = state.findIndex(function(x){
        return x.id === obj.id;
      });
      if(i == '' || i == null || i == undefined || i == NaN || i == -1) {
        state.push(obj);
      } else {
        state[i].count++;
        let c= state[i].count;
        state[i].count = (c > 5) ? 5 : c;
        if(state[i].count==6){
          alert('하지마 배새끼야!');
        }
      }
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