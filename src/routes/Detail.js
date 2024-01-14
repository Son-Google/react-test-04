import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

////////////////////////////////////////////////
import styled from 'styled-components'
let Input = styled.input`
  width: 50px;
`;
////////////////////////////////////////////////

////////////////////////////////////////////////
// 예전 방식 LifeSycle
// eslint-disable-next-line no-undef
/*
class DatailLife extends React.Component{
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  componentWillUnmount() {
  }
}
 */
////////////////////////////////////////////////

let Detail = function (props){

  let {id} = useParams();
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [alert2, setAlert2] = useState(false);
  let [countText, setCountText] = useState('');
  let food = props.foods.find(function(x){
    return x.id == id
  });

  ////////////////////////////////////////////////
  //요즘 LifeCycle
  //useEffect을 사용하는 이유 : html 렌더링이 다 된 후 실행
  //뒤에 [...] 디펜던시가 없으면 useEffect가 실행될 때 바로 실행, 있으면 그 변수가 변할 때 실행
  //디펜던시를 [] 작성하면 useEffect는 딱 한 번만 실행됨
  useEffect(()=>{
    let atime =  setTimeout(() => {
      setAlert(false);
      console.log(1);
    }, 2000)

    if (isNaN(countText) == true){
      window.alert('그러지 마세요')
    }

    //useEffect 실행되기 전 먼저 실행되는 코드임, clean up function이라고 함
    return ()=>{
      //위에 타임셋을 삭제
      clearTimeout(atime);
      //이 구간은 기존 요청 제거할 때 편리함
    }
  },[countText]);
  ////////////////////////////////////////////////

  return (
    <>
      <Container>
        <div className="align-content-center m-auto" style={{padding: 10}}>
          <button className="btn btn-success" onClick={()=>{setCount(++count)}}>카운트</button> => {count}
        </div>
        {
          (food === null)
            ? <div>등록된 제품이 없습니다.</div>
            : <div>
                { (alert === true) ? <div className="alert alert-warning">3초 내 구입 시 50% 할인</div> : null }
                <div>
                  <img src={food.img} />
                </div>
                <div className="col-md-6 align-content-center m-auto">
                  <p className="pt-5">{food.title}</p>
                  <p className="pt-5">{food.content}</p>
                  <p className="pt-5">{food.price}</p>
                  <p className="pt-5">수량 : <Input onChange={(e)=>{
                    setCountText(e.target.value)
                  }} /></p>
                  <p className="pt-5"><button className="btn btn-danger">주문하기{food.id}</button> </p>
                </div>
            </div>
        }

      </Container>
    </>
  )
}

export default Detail;