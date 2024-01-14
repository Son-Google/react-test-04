import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from "./data";
import {useState} from "react"; //-->exprot {a, b} 인 경우 import {a, b} from "./data"; 로 import 한다
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import axios from "axios";

//import Main from "./routes/Main"
//import Category from "./routes/Category"
import Detail from "./routes/Detail"
import Detail1 from "./routes/Detail1"
import ListContent from "./routes/ListContent";

////////////////////////////////////////////////
/*
//한 파일 내 개별로 스타일 지정 시 유용함
// => styled
 */
let Box = styled.div`
  padding : 20px;
  color : grey
`;
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : black;
  padding : 10px;
  border-radius: 8px;
  border-color: orange;
`;
////////////////////////////////////////////////

function App() {

  /* css */
  const foodsStyle = {
    color: '#fff',
    paddingTop: '100px',
    fontSize: '3.0em',
    textShadow: '5px 5px #000'
  };

  const categoryTitleStyle = {
    padding: '20px 0px',
  }

  let [foods, setFoods] = useState(data);
  let [moreIndex, setMoreIndex] = useState(2);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><h1>Kim's Food</h1></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/category')}}>Food</Nav.Link>
            <Nav.Link onClick={() => {navigate('#cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate('event/event1')}}>Event</Nav.Link>
            <Nav.Link onClick={() => {navigate('about')}}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className="main-bg">
              <h2 style={foodsStyle}>Kim's Food</h2>
            </div>
            <Container>
              <div>
                <h3 style={categoryTitleStyle}>RECOMMAND FOODS</h3>
              </div>
              <div style={{textAlign:"right", padding:10}}>
                <YellowBtn bg="#fff" onClick={() => {
                  let foodsCopy = [...foods];
                  foodsCopy.sort((a, b) => a.title.localeCompare(b.title));
                  setFoods(foodsCopy);
                }}>이름순 정렬</YellowBtn>
              </div>
              <Row>
                {
                  foods.map(function(food, i){
                    return (
                      <ListContent food={food} key={i}  />
                    )
                  })
                }
              </Row>
              <div style={{padding:5, textAlign:"center", fontSize:11, cursor:"pointer"}}
                   onClick={()=>{
                    axios.get('https://raw.githubusercontent.com/Son-Google/react-test-04/master/src/data'+moreIndex+'.json')
                      .then((data)=>{
                        console.log(data.data)
                        let foodsCopy = [...foods];
                        foodsCopy = foodsCopy.concat(data.data);
                        setFoods(foodsCopy);
                        setMoreIndex(++moreIndex);
                      })
                      .catch(()=>{
                        window.alert("오류입니다.")
                      })
                      .finally(()=>{
                        //window.alert("종료입니다.")
                      })
                   }}>
                더보기</div>
            </Container>
          </>
        } />
        {/*<Route path="/category" element={<Category foods={foods} setFoods={setFoods} />} />*/}
        <Route path="/detail/:id" element={<Detail foods={foods} />} />
        <Route path="/detail1" element={<Detail1 />} />
        <Route path="/event" element={<Event />}>>
          <Route path="event1" element={<Event1 />} />
          <Route path="event2" element={<Event2 />} />
        </Route>
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<About />} />
        </Route>
        <Route path="*" element={<div>404 - 없는 페이지</div>} />
    </Routes>
    </div>
  );
}



function About() {
  return(
    <div>
      <h3>Kim's About</h3>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  let navigate = useNavigate();

  return(
    <div>
      <h3>Today's Event Food</h3>
      <Container>
        <Row>
          <Col>
            <a href="#" onClick={() => {
              navigate("event1");
            }}>이벤트1</a>
          </Col>
          <Col>
            <a href="#" onClick={() => {
              navigate("event2");
            }}>이벤트2</a>
          </Col>
        </Row>
      </Container>
      <Outlet></Outlet>
    </div>
  )
}

function Event1() {
  return(
    <div>
      EVENT1 입니다
    </div>
  )
}

function Event2() {
  return(
    <div>
      EVENT2 입니다
    </div>
  )
}

export default App;
