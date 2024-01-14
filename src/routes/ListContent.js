import {Col, Container, Row} from "react-bootstrap";
import {Link } from 'react-router-dom'

let ListContent = function (props){
  return (
    <>
      <Col>
        <Link to={"/detail/" + props.food.id}>
          <div>
            <div><img src={props.food.img} width="300" height="200" alt={"상품번호 : " + props.foodIndex} /></div>
            <h4>{props.food.title}</h4>
            <p>{props.food.price}</p>
            <p>{props.food.content}</p>
          </div>
        </Link>
        <Link to={"/detail1?id=" + props.food.id} food={props.food}>detail1 test</Link>
      </Col>
    </>
  )
}

export default ListContent;