import {Col, Container, Row, Nav} from "react-bootstrap";
import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {addItem} from "../store";

////////////////////////////////////////////////
//스타일 문법 연습용
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
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

  ////////////////////////////////////////////////
  //기본 셋팅
  let {id} = useParams();
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [alert2, setAlert2] = useState(false);
  let [countText, setCountText] = useState('');
  let [tabIndex, setTabIndex] = useState(0);
  let food = props.foods.find(function(x){
    return x.id == id
  });
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //로컬스토리지 이용 본 상품 저장하기
  useEffect(() => {
    let watchedObj = JSON.parse(localStorage.getItem("watched"));
    watchedObj.push(id);
    const set = new Set(watchedObj);
    const uniqueWatchedObj = [...set];
    localStorage.setItem('watched', JSON.stringify(uniqueWatchedObj));
  });
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //요즘 LifeCycle
  //useEffect을 사용하는 이유 : html 렌더링이 다 된 후 실행
  //뒤에 [...] 디펜던시가 없으면 useEffect가 실행될 때 바로 실행, 있으면 그 변수가 변할 때 실행
  //디펜던시를 [] 작성하면 useEffect는 딱 한 번만 실행됨
  /*
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
   */
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //redux 쓸 때 이래야함
  let cart = useSelector(state => state.cart); // {return ...} 생략가능
  let dispatch = useDispatch();
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
            : <>
                { (alert === true) ? <EventContent /> : null }
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
                  <p className="pt-5">
                    <button className="btn btn-danger" onClick={() => {
                      dispatch(addItem({id: food.id, img: food.img, name:food.title, count:1}))
                    }}>주문하기</button> </p>
                </div>
                <Nav variant="tabs"  defaultActiveKey="link0">
                  <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{setTabIndex(0)}}>버튼0</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{setTabIndex(1)}}>버튼1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{setTabIndex(2)}}>버튼2</Nav.Link>
                  </Nav.Item>
                </Nav>
                <TabContent tabIndex={tabIndex} />
            </>
        }
      </Container>
    </>
  )
}

function TabContent(props){

  let [fade, setFade] = useState('');

  useEffect(()=>{
    setTimeout(()=>{
      setFade('end');
      }, 100);

    return ((a) => {
      clearTimeout(a);
      setFade('');
    });
  }, [props]);

  //아래 첫번째는 ``  기호를 사용하는 방법이다
  //탭 인덱스별로 내용 다르게 보이게  처리
  if(props.tabIndex == 0){
    return (<div className={`start ${fade}`}>내용0</div>);
  } else if(props.tabIndex == 1){
    return (<div className={"start " + fade}>내용1</div>);
  } else if(props.tabIndex == 2){
    return (<div className={"start " + fade}>내용2</div>);
  }
}

function EventContent(props){
  let [fade, setFade] = useState('');

  useEffect(()=>{
    setTimeout(()=>{
      setFade('end');
    }, 100);

    return ((a) => {
      clearTimeout(a);
      setFade('');
    });
  }, []);

  return (<div className={"alert alert-warning start " + fade}>3초 내 구입 시 50% 할인</div>);
}

export default Detail;