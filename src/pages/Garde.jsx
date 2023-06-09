import React, { useEffect, useReducer, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../service/caller.service.jsx"
import { Table, Space, Popconfirm, Select } from "antd";
import FormControl from "@mui/material/FormControl";

const theme = createTheme();

export default function Garde() {
  const [types, setTypes] = useState("");
  const [loading, setLoad] = useState(false);
  const [gardes, setGardes] = useState([]);
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const setEditingKey = useState('');
  // ADD
  const onSubmit = async (event) => {
    event.preventDefault();
    let d = {
      type: types,
    };
    if (!d.type) {
      alert("vide !");
      return;
    }
    await axios.post("/api/controller/gardes/save", d).then(() => {
      forceUpdate();
    });
  };
  const onChange = (value) => {
    setTypes(value);
  };
  // ALL
  const getAll = async () => {
    setLoad(true);
    try {
      const res = await axios.get("/api/controller/gardes/");
      setGardes(
        res.data.map((item) => ({
          id: item.id,
          type: item.type,
        }))
      );
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  // table auto
  useEffect(() => {
    getAll();
  }, [upTB]);
  //DEL
  function deleteUser(id) {
    axios
      .delete(`/api/controller/gardes/delete/${id}`)
      .then((result) => {
        console.log("delete ", id);
        result.json().then((resp) => {
          console.log(resp);
        });
      }).then(()=>{
        forceUpdate();
      })
  }
  const column = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
       <Popconfirm title="Sure to delete?">
          <Button variant="outlined">Update</Button>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() =>  deleteUser(record.id)}>
           <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];
  const cancel = () => {
    setEditingKey('');
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TimelapseIcon sx={{ m: 3 }}>
          </TimelapseIcon>
          <Typography component="h1" variant="h5">
          Espace garde (jour ou nuit)
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl style={{ marginTop: 17 }}>
              <Select
                showSearch
                style={{
                  width: 260,
                }}
                placeholder="Select garde"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    key: '1',
                    value: "jour",
                    label: "jour",
                  },
                  {
                    key:'2',
                    value: "nuit",
                    label: "nuit",
                  },
                ]}
              />
            </FormControl>

            <Button
              type="submit"
              style={{
                backgroundColor: 'green',
                width: 260,
              }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>
          <Table 
          style={{marginTop: '5px'}}
                bordered  columns={column} dataSource={gardes} loading={loading}
                 pagination={{
                    onChange: cancel,
                  }}
               />
  
    </ThemeProvider>
  );
}
