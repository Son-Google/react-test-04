import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import {useParams} from "react-router-dom";
let Detail1 = function (props){

  let {id} = useParams();

  return (
    <>
      <Container>
        {

            <div><div>
              <img src={props.img} />
            </div>
              <div className="col-md-6 align-content-center m-auto">
                <p className="pt-5">{props.title}</p>
                <p className="pt-5">{props.content}</p>
                <p className="pt-5">{props.price}</p>
                <p className="pt-5"><button className="btn btn-danger">주문하기{props.id}</button> </p>
              </div></div>
        }

      </Container>
    </>
  )
}

export default Detail1;