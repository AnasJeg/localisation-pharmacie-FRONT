import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/MyCard.jsx";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";


export default function Home() {
  const [pharmacies, setPharmacies] = useState();
  useEffect(() => {
    axios.get("/api/pharmacies/").then((res) => {
      console.log(res.data);
      setPharmacies(res.data);
    });
  }, []);
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          pharmacies
        </h4>
      </Slide>
      <Cards>
        {pharmacies?.map((item) => (
          <Card
            Icon={item.photos}
            title={item.nom}
            subtitle={item.zone.ville.nom}
            btn={<Link style={{ textDecoration: 'none', color: 'blue' }} to={`/Local/${item.id}`}>Detail</Link>}
          />
        ))}
      </Cards>
    </Container>
  );
}
const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;