import {Table} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, addAge } from "../store/userSlice";
import {setMinusCart, setPlusCart} from "../store";
import {memo, useState} from "react";

/*
//처음에 배웠던 내용이지만 재렌더링을 방지해야 한다
//재렌더링 예제용
function Child(){
  console.log('재렌더링됨-성능저하')
  return <div>자식임</div>
}
*/
let Child = memo( function(){
  console.log('재렌더링됨')
  return <div>자식임</div>
})

let Cart = function(){

  let [count, setCount] = useState(0);

  //redux 쓸 때 이래야함
  let user = useSelector((state) => {return state.user});
  let cart = useSelector(state => state.cart); // {return ...} 생략가능
  let dispatch = useDispatch();


  return(
    <>
      <div>
        <Child></Child>
        <p><button onClick={()=>{ setCount(count+1) }}> + </button></p>
        {user.name} ({user.age}짤) 의 장바구니
        <button className="btn btn-success" onClick={() => {
          dispatch(changeName())
        }}>이름 펼치기</button>
        <button className="btn btn-danger" onClick={() => {
          dispatch(addAge(2))
        }}>나이 먹기</button>
      </div>
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th colSpan="2">상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
        </thead>
        <tbody>
        {
          cart.map((goods, i)=>
            (
              <tr key={i}>
                <td>{i+1}</td>
                <td><img src={goods.img} width="200" height="150" alt={"상품번호 : " + goods.id} /></td>
                <td style={{"textAlign":"left"}}>{goods.name}</td>
                <td>{goods.count}</td>
                <td>
                  <button className="btn btn-success" onClick={() => {
                    dispatch(setPlusCart(goods.id))
                  }}>+</button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => {
                    dispatch(setMinusCart(goods.id))
                  }}>-</button>
                </td>
              </tr>
            )
          )
        }
        </tbody>
      </Table>
    </>
  );
};

export default Cart;