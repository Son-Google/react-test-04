import {Col, Container, Row} from "react-bootstrap";

import ListContent from "./ListContent"

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

const foods = [];
let Main = function (){
  return (
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
  )
};

export default Main;