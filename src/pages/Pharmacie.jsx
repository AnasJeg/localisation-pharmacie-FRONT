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
import Select from "@mui/material/Select";
import { Input, InputLabel } from "@mui/material";
import axios from "axios";

const theme = createTheme();

export default function Pharmacie() {
  const [loading, setLoad] = useState(false);
  const [zones, setZones] = useState([]);
  const [z, setZ] = useState("");

  useEffect(() => {
    axios.get("/api/zones/")
      .then((res) => {
        setZones(res.data)
      })
  }, [])

  // SAVE
  const onSubmit = (event) => {
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
      }
    };
    console.log(JSON.stringify(d));
    if (!d) {
      alert(" vide !");
    } else {
      console.log(d)
    }
  };

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
          <Popconfirm title="Sure to delete?" onConfirm={() => console.log('delete')}>
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];

  const handleChange = (event) => {
    setZ(event.target.value);
    console.log("setF ", event.target.value);
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
            <Input
              margin="normal"
              type="file"
              required
              fullWidth
              name="photos"
              label="photos"
              id="photos"
              autoFocus
            />

            <FormControl fullWidth style={{ marginTop: 14 }}>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={zones}
                label="user"

              >
                {zones?.map((item) => (
                  <MenuItem value={item.id}>{item.nom}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 14 }}>
              <InputLabel id="demo-simple-select-label">Zones</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={zones}
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

      <Table
        columns={columns}
        loading={loading}
        bordered
        handleChange={handleChange}
      />
    </ThemeProvider>
  );
}
