import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/local.css"

function Localisation(){
    const [longitude,setLongitude]=useState()
    const [latitude,setLatitude]=useState()
    const { id } = useParams();
    const [pharmacie, setpharmacie] = useState();
    useEffect(() => {
        axios.get(`/api/pharmacies/${id}`).then((res) => {
          setLatitude(res.data.latitude);
          setLongitude(res.data.longitude);
          setpharmacie(res.data);
        });
      }, [id]);
      useEffect(()=>{
        console.log(latitude)
        console.log(longitude)
        const ifameData=document.getElementById("iframeLocal")
        ifameData.src=`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`
    })

    return(
        <div>
            <h1>local</h1>
            <iframe id="iframeLocal"  height="500px" width="50%" ></iframe>
        </div>
    );
}
export default Localisation;
