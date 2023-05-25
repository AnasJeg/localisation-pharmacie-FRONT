import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { accountService } from '../service/account.service';
import axios from "../service/caller.service.jsx"
import { useNavigate } from 'react-router-dom';
import { pharmacieService } from '../service/pharmacie.service';
import { GardePharmacieService } from '../service/gardepharmacie.service';
import { Select } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState('grid');
  const [pharmacies, setPharmacies] = useState(null);
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
    } else if (vl && zn && !gr) {
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




  const go = (id) => {
    navigate(`/app/Local/${id}`, { replace: true })
  }


  const dataViewHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
      {/*  <Dropdown value={vl} options={villes}  optionLabel="nom" placeholder="Sort By ville" onChange={onChangeVille} />
            <Dropdown value={zn} options={zones}  optionLabel="nom" placeholder="Sort By zone" onChange={onChangeZones} />
            <Dropdown value={gr} options={gardes}  optionLabel="type" placeholder="Sort By garde" onChange={onChangeGarde} />
    */}
      <Select
        showSearch
        placeholder="Select ville"
        value={vl}
        onChange={onChangeVille}
        onSearch={onSearchVille}
        style={{
          minWidth: '20%',
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
          minWidth: '20%',
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
          minWidth: '20%',
        }}
        options={gardes.map((item) => ({
          value: item.type,
          label: item.type,
        }))}
      />
      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    </div>
  );
  // line
  const dataviewListItem = (data) => {
    return (
      <div className="col-12">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
          <img src={`${data.photos}`} alt={data.nom} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
          <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
            <div className="font-bold text-2xl">{data.nom}</div>
            <div className="mb-2">{data.adresse}</div>
            <Rating value={data.rating} readOnly cancel={false} className="mb-2"></Rating>
          </div>
          <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
            <Button icon="pi pi-map-marker" label="view map" className="mb-2 p-button-sm" onClick={() => go(`${data.id}`)}></Button>
          </div>
        </div>
      </div>
    );
  };

  const dataviewGridItem = (data) => {
    return (
      <div className="col-12 lg:col-4">
        <div className="card m-3 border-1 surface-border">
          <div className="flex flex-column align-items-center text-center mb-3">
            <img src={`${data.photos}`} alt={data.nom} className="w-9 shadow-2 my-3 mx-0" />
            <div className="text-2xl font-bold">{data.nom}</div>
            <div className="mb-3">{data.adresse}</div>
            <Rating value={data.rating} readOnly cancel={false} />
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-map-marker" onClick={() => go(`${data.id}`)} />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (data, layout) => {
    if (!data) {
      return;
    }

    if (layout === 'list') {
      return dataviewListItem(data);
    } else if (layout === 'grid') {
      return dataviewGridItem(data);
    }
  };

  return (
    <div className="grid list-demo">
      <div className="col-12">
        <div className="card">
          <DataView value={pharmacies} layout={layout} paginator rows={9} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
        </div>
      </div>

    </div>
  );
};

export default Home;