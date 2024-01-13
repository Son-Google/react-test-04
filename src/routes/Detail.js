import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";

let Detail = function (props){

  let {id} = useParams();

  let food = props.foods.find(function(x){
    return x.id == id
  });

  return (
    <>
      <Container>
        {
          (food == null)
            ? <div>등록된 제품이 없습니다.</div>
            : <div><div>
              <img src={food.img} />
            </div>
              <div className="col-md-6 align-content-center m-auto">
                <p className="pt-5">{food.title}</p>
                <p className="pt-5">{food.content}</p>
                <p className="pt-5">{food.price}</p>
                <p className="pt-5"><button className="btn btn-danger">주문하기{food.id}</button> </p>
              </div></div>
        }

      </Container>
    </>
  )
}

export default Detail;