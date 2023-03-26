import React, {  useEffect, useReducer, useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Table, Space, Popconfirm } from 'antd';

const theme = createTheme();

export default function Zone() {

  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate]= useReducer(x=> x+1,0); // reaload tb


// SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    var d = {
        nom: data.get('nom')
    } 
    console.log(
      JSON.stringify(d)
    );
    fetch('http://localhost:8080/api/villes/save',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(d)
    }).then(()=>{
      forceUpdate();  // rel
    })
  };
// ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await axios.get('http://localhost:8080/api/villes/');
      setVl(res.data.map(row => ({
        id: row.id,
        nom: row.nom,
      })));
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
    axios.delete(`http://localhost:8080/api/villes/delete/${id}`)
    .then((result) => {
      console.log("delete ",id)
      result.json().then((resp) => {
        console.log(resp)
        getVl()
      })
    })
    forceUpdate() // rel
  }
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
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() =>  deleteUser(record.id)}>
          <a>Delete</a>  
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
    
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PublicIcon sx={{ m: 3 }}>
            <LockOutlinedIcon />
          </PublicIcon>
          <Typography component="h1" variant="h5">
           Ajouter Zone
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

      <Table columns={columns} dataSource={vl} loading={loading} bordered />

    </ThemeProvider>
  );
}