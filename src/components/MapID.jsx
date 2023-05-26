import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/caller.service.jsx"
import { Rating } from "primereact/rating";

const MapID = () => {
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  const { id } = useParams();
  const [pharmacie, setpharmacie] = useState();
  useEffect(() => {
    axios.get(`/api/controller/pharmacies/${id}`).then((res) => {
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
  }, [latitude, longitude])

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        {pharmacie &&
          <div className="col-12">
            <div className="card">
              <div className="card m-3 border-1 surface-border">
                <div className="flex flex-column align-items-center text-center mb-3">
                  <img src={`${pharmacie.photos}`} alt={pharmacie.nom} className="w-5 shadow-2 my-3 mx-0" />
                  <div className="text-2xl font-bold">{pharmacie.nom}</div>
                  <div className="mb-3"><span className="font-bold"> ville :</span> {pharmacie.zone.ville.nom}</div>
                  <div className="mb-3"><span className="font-bold"> zone :</span> {pharmacie.zone.nom}</div>
                  <div className="mb-3"><span className="font-bold"> adresse :</span> {pharmacie.adresse}</div>
                  <Rating value={pharmacie.rating} readOnly cancel={false} />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="col-12 md:col-6">
        <div className="col-12">
          <div className="card">
            <div className="card m-3 border-1 surface-border">
              <div className="flex flex-column align-items-center text-center mb-3">
                <iframe id="iframeLocal" className="w-9 shadow-2 my-3 mx-0" style={{ height: '426px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MapID;