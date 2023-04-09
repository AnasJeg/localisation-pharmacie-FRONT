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
import axios from "axios";
import { Table, Space, Popconfirm } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ButtonBase, InputLabel } from "@mui/material";

const theme = createTheme();

export default function Zone() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [v, setV] = useState("");

  // SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
      ville: {
        id: v,
      },
    };
    console.log("JSON.stringify(d)  ", JSON.stringify(d));
    if (!d.nom) {
      alert("Zone vide !");
    } else {
      fetch("http://localhost:8080/api/zones/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      }).then(() => {
        forceUpdate(); // rel
      });
    }
  };

  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await axios.get("http://localhost:8080/api/zones/");
      setVl(
        res.data.map((row) => ({
          id: row.id,
          nom: row.nom,
          ville: row.ville.nom,
        }))
      );
      setVilles([...villes, vl]);
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    getVl();
  }, [upTB]);

  // Delete
  function deleteUser(id) {
    axios
      .delete(`http://localhost:8080/api/zones/delete/${id}`)
      .then((result) => {
        console.log("delete ", id);
        result.json().then((resp) => {
          console.log(resp);
          getVl();
        });
      });
    forceUpdate(); // rel
  }

  // villes

  // select villes
  useEffect(() => {
    axios.get("http://localhost:8080/api/villes/").then((res) => {
      setAllV(res.data);
    });
  }, []);

  const handleChange = (event) => {
    setV(event.target.value);
    console.log("setF ", event.target.value);
  };
  //

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
      title: "Ville",
      dataIndex: "ville",
      key: "ville",
      /*    filters: [
      {
        text: 'marrakech',
        value: 'marrakech',
      },
      {
        text: 'casablanca',
        value: 'casablanca',
      },
      {
        text: 'essaouira',
        value: 'essaouira',
      },
    ],
    onFilter: (value, record) => record.ville.indexOf(value) === 0,
*/ filters: allV.map((v) => ({
        text: v.nom,
        value: v.nom,
      })),
      onFilter: (value, record) => record.ville.indexOf(value) === 0,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteUser(record.id)}
          >
            <Button variant="outlined">Update</Button>
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];
  const onChange = (filters) => {
    console.log("params", filters.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PublicIcon sx={{ m: 3 }}>
            <LockOutlinedIcon />
          </PublicIcon>
          <Typography component="h1" variant="h5">
            Ajouter zone
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
            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel id="demo-simple-select-label">Villes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vl}
                label="villes"
                onChange={handleChange}
              >
                {allV?.map((item) => (
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
        dataSource={vl}
        loading={loading}
        bordered
        onChange={onChange}
      />
    </ThemeProvider>
  );
}
