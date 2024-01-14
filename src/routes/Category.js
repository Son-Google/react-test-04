import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";

import ListContent from "./ListContent"

const categoryLeftTitleStyle = {
  padding: '20px 0px',
  textAlign: "left",
  textShadow: '2px 2px #ccc'
}

const foods = [];
let Category = function (){
  return (
    <>
      <Container>
        <Row>
          <Col><h2 style={categoryLeftTitleStyle}>🍜 JAPAN FOODS</h2></Col>
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
}

export default Category;