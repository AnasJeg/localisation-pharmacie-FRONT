import React, { useEffect, useReducer, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "antd";
import { InputLabel } from "@mui/material";
import axios from "axios";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
const theme = createTheme();

export default function Pharmacie() {
  const [loading, setLoad] = useState(false);
  const [zones, setZones] = useState([]);
  const [z, setZ] = useState("");
  const [user, setUser] = useState("");
  const [fileList, setFileList] = useState([]);
  const [pharmacies , setPharmacies] = useState();
  const [uptable , forceupdate] = useReducer((x)=>x+1,0)

  useEffect(() => {
    axios.get("/api/zones/").then((res) => {
      setZones(res.data);
    });
  }, []);

  // SAVE
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
      adresse: data.get("adresse"),
      latitude: data.get("latitude"),
      longitude: data.get("longitude"),
      photos: data.get("photos"),
      zone: {
        id: z,
      },
    };
    if (!d) {
      alert(" vide !");
    } else {
      try {
        console.log(d);
         await axios.post(`/api/pharmacies/save`, d)
          .then(()=>{
            forceupdate()
          })
     
      } catch (error) {
        console.log(error);
      }
    }
  };
  //ALL pharmacies
  const Allpharmacies = async ()=>{
      setLoad(true)
      try{
         await axios.get('/api/pharmacies/')
          .then((res)=>{
            console.log(res.data)
            setPharmacies(
              res.data.map((item)=>({
                id: item.id,
                nom: item.nom,
                adresse: item.adresse,
                latitude: item.latitude,
                longitude: item.longitude,
                photos: item.photos,
                zone: item.zone.nom
              }))
            )
          })
      }catch(err){
        console.log(err)
      }
      setLoad(false)
  }
  useEffect(()=>{
    Allpharmacies()
  }, [uptable])
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "photos",
      dataIndex: "photos",
      key: "photos",
    },
    {
      title: "user ",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "zone",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?">
            <Button variant="outlined">Update</Button>
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => console.log("delete")}
          >
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];

  const handleChange = (event) => {
    setZ(event);
    console.log("setZ ", event);
  };

  const onChange = (value) => {
    setUser(value);
  };

  const onChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList)
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PublicIcon sx={{ m: 3 }}>
            <LockOutlinedIcon />
          </PublicIcon>
          <Typography component="h1" variant="h5">
            Ajouter Pharmacie
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nom"
              label="nom"
              id="nom"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="adresse"
              label="adresse"
              id="adresse"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="latitude"
              label="latitude"
              id="latitude"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="longitude"
              label="longitude"
              id="longitude"
              autoFocus
            />
            <ImgCrop rotationSlider>
              <Upload
                name="photos"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChangeImage}
                onPreview={onPreview}
              >
                {fileList.length < 50 && "+ Upload"}
              </Upload>
            </ImgCrop>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              fullWidth
              showSearch
              style={{
                width: 260,
              }}
              placeholder="Select user"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "anas",
                  label: "anas",
                },
                {
                  value: "jeg",
                  label: "jeg",
                },
              ]}
            />
            <FormControl fullWidth style={{ marginTop: 14 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={z}
                label="zone"
                onChange={handleChange}
              >
                {zones?.map((item) => (
                  <MenuItem value={item.id}>{item.nom}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>

      <Table columns={columns} dataSource={pharmacies} loading={loading} bordered />
    </ThemeProvider>
  );
}
