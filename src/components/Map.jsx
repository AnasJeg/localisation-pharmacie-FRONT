import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";

const Map = () => {
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    const { id } = useParams();
    const [pharmacie, setpharmacie] = useState();
    useEffect(() => {
        axios.get(`/api/pharmacies/${id}`).then((res) => {
            setLatitude(res.data.latitude);
            setLongitude(res.data.longitude);
            setpharmacie(res.data);
        });
    }, [id]);
    useEffect(() => {
        console.log(latitude)
        console.log(longitude)
        const ifameData = document.getElementById("iframeLocal")
        ifameData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`
    },[latitude, longitude])
    const handleClick = () => {

    }
    return (
        <Container id="home" className="container">
            <Slide direction="left">
                {pharmacie &&
                    <Texts>
                        <h1 className="green"> {pharmacie.nom}</h1>
                        <img src={pharmacie.photos}></img>
                        <p><u>Ville</u> : {pharmacie.zone.ville.nom}</p>
                        <p><u>Zone</u> : {pharmacie.zone.nom} </p>
                        <p><u>Address</u> : {pharmacie.adresse}</p>
                        <button onClick={() => handleClick()} >Back</button>
                    </Texts>
                }
            </Slide>
            <Slide direction="right">
                <Maps>
                    <iframe id="iframeLocal" height="500px"  ></iframe>
                </Maps>
            </Slide>
        </Container>
    );
};

export default Map;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 3rem;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
const Texts = styled.div`
  flex: 1;
 
  u{  
    font-weight: bold;
  }

  button {
    display: inline-block;
    outline: none;
    cursor: copy;
    font-weight: 600;
    border-radius: 3px;
    padding: 12px 24px;
    border: 0;
    color: #3a4149;
    background: #e7ebee;
    line-height: 1.15;
    font-size: 16px;
    :hover {
        transition: all .1s ease;
        box-shadow: 0 0 0 0 #fff, 0 0 0 3px rgb(94, 137, 255);
    }
    @media (max-width: 640px) {
        h1 {
          font-size: 1.5rem;
          line-height: 1.2;
        }
        p {
          font-size: 0.8rem;
        }
      }
  }
`;
const Maps = styled.div`
  #iframeLocal {
    width: 35rem;
  }
  @media (max-width: 768px) {
    #iframeLocal {
      width: 100%;
    }
  }
`;