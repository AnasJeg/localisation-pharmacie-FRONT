import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Card from "../components/MyCard.jsx";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import { Select } from "antd";
import axios from "../service/caller.service.jsx"
import { accountService } from "../service/account.service.jsx";
import { GardePharmacieService } from "../service/gardepharmacie.service.jsx";
import { pharmacieService } from "../service/pharmacie.service.jsx";

export default function Home() {
  const [pharmacies, setPharmacies] = useState();
  const [villes, setVilles] = useState([])
  const [vl, setVl] = useState()
  const [zones, setZones] = useState([])
  const [zn, setZn] = useState()
  const [gr, setGr] = useState()
  useEffect(() => {
    axios.get('/api/controller/pharmacies/', {
      headers: { Authorization: 'Bearer ' + accountService.getToken() }
    }).then((res) => {
      setPharmacies(res.data);
      console.log(pharmacies)
    });
  }, []);
  //villes
  useEffect(() => {
    axios.get("/api/controller/villes/", {
      headers: { Authorization: 'Bearer ' + accountService.getToken() }
    })
      .then((res) => {
        console.log(res.data)
        setVilles(res.data)
      })
  }, [])
  const onChangeVille = (value) => {
    console.log(`selected ${value}`);
    setVl(value)
    setZn('')
    findZonesByVille(value);
  };
  const onSearchVille = (label) => {
    console.log('search:', label);
  };
  //zones
  function findZonesByVille(nom) {
    axios.get(`/api/controller/zones/ville/${nom}`, {
      headers: { Authorization: 'Bearer ' + accountService.getToken() }
    })
      .then((res) => {
        setZones(res.data)
      })
  }
  const onChangeZones = (value) => {
    console.log(`selected ${value}`);
    setZn(value)
  };
  const onSearchZones = (value) => {
    console.log('search:', value);
  };
  //gardes
  const [gardes, setGardes] = useState([])
  useEffect(() => {
    axios.get("/api/controller/gardes/", {
      headers: { Authorization: 'Bearer ' + accountService.getToken() }
    })
      .then((res) => {
        console.log("gardes ", res.data)
        setGardes(res.data)
      })
  }, [])
  const onChangeGarde = (value) => {
    console.log(`selected garde  ${value}`);
    setGr(value)
  };
  const onSearchGarde = (value) => {
    console.log('search:', value);
  };
  //pharmacie 
  useEffect(() => {
    if (vl && !zn) {
      pharmacieService.PharmacieByVille(vl).then((res) => {
        console.log("res.data", res.data)
        setPharmacies(res.data);
      });
    } else if (vl && zn) {
      axios.get(`/api/controller/pharmacies/ville/${vl}/zone/${zn}`).then((res) => {
        console.log("res.data", res.data)
        setPharmacies(res.data);
      });
    } else if (vl && zn && gr) {
      GardePharmacieService.Filterpharmacies(vl, zn, gr).then((res) => {
        console.log("avec garde ", res.data)
        setPharmacies(res.data);
      });
    }
  }, [vl, zn, gr])

  return (
    <Container id="service">
      <Slide direction="down">
        <div>
          <Select
            showSearch
            placeholder="Select ville"
            value={vl}
            onChange={onChangeVille}
            onSearch={onSearchVille}
            style={{
              width: '40%',
            }}
            options={villes.map((item) => ({
              value: item.nom,
              label: item.nom,
            }))}
          />
          <Select
            showSearch
            placeholder="Select zone"
            value={zn}
            onChange={onChangeZones}
            onSearch={onSearchZones}
            style={{
              width: '40%',
            }}
            options={zones.map((item) => ({
              value: item.nom,
              label: item.nom,
            }))}
          />
          <Select
            showSearch
            placeholder="Select garde"
            value={gr}
            onChange={onChangeGarde}
            onSearch={onSearchGarde}
            style={{
              width: '20%',
            }}
            options={gardes.map((item) => ({
              value: item.type,
              label: item.type,
            }))}
          />
        </div>
      </Slide>
      <Cards>
        {pharmacies?.map((item) => (
          <Card
            Icon={item.photos}
            title={item.nom}
            subtitle={item.zone?.ville.nom}
            btn={<Link style={{ textDecoration: 'none', color: 'blue' }} to={`/app/Local/${item.id}`}>Detail</Link>}
          />
        ))}
      </Cards>
    </Container>
  );
}
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 80%) {
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