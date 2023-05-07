import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Localisation(){
    const [longitude,setLongitude]=useState()
    const [latitude,setLatitude]=useState()
    const { id } = useParams();
    const [pharmacy, setPharmacy] = useState();
    useEffect(() => {
        axios.get(`/api/pharmacies/${id}`).then((res) => {
          setLatitude(res.data.latitude);
          setLongitude(res.data.longitude);
          setPharmacy(res.data);
        });
      }, [id]);
      useEffect(()=>{
        console.log(latitude)
        console.log(longitude)
        const ifameData=document.getElementById("iframeId")
        ifameData.src=`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`
    })

    return(
        <div>
            <iframe id="iframeId" height="500px" width="100%"></iframe>
        </div>
    );
}
export default Localisation;
