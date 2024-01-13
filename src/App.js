import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from "./data";
import {useState} from "react"; //-->exprot {a, b} 인 경우 import {a, b} from "./data"; 로 import 한다
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

//import Main from "./routes/Main"
//import Category from "./routes/Category"
import Detail from "./routes/Detail"
//import ListContent from "./routes/ListContent";
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
              <Row>
                <Col><h3 style={categoryTitleStyle}>RECOMMAND FOODS</h3></Col>
              </Row>
              <Row>
                {
                  foods.map(function(food, i){
                    return (
                      <ListContent food={food} foodIndex={i}  />
                    )
                  })
                }
              </Row>
            </Container>
          </>
        } />
        {/*<Route path="/category" element={<Category foods={foods} setFoods={setFoods} />} />*/}
        <Route path="/detail/:id" element={<Detail foods={foods} />} />
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


function ListContent(props) {
  return (
    <Col>
      <Link to={"/detail/" + props.food.id}>
        <div>
          <div><img src={props.food.img} width="300" height="200" alt={"상품번호 : " + props.foodIndex} /></div>
          <h4>{props.food.title}</h4>
          <p>{props.food.price}</p>
          <p>{props.food.content}</p>
        </div>
      </Link>
    </Col>
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
