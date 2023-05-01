import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";
const { Meta } = Card;

export default function Home() {
  const [pharmacies, setPharmacies] = useState();
  useEffect(() => {
    axios.get("/api/pharmacies/").then((res) => {
      console.log(res.data);
      setPharmacies(res.data);
    });
  }, []);
  return (
    <Row gutter={16}>
      {pharmacies?.map((item) => (
        <Col span={8}>
          <Card
            hoverable
            style={{
              width: 240,
              marginTop: 7,
            }}
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            extra={<a href="#">Detail</a>}
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            cover={<img alt="photo" src={item.photos} />}
          >
            <Meta title={item.nom} description={item.adresse} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}