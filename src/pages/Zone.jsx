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
import axios from "../service/caller.service.jsx"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";

const theme = createTheme();

export default function Zone() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb
  const [allV, setAllV] = useState([]);
  const [v, setV] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [selectedZone, setSelectedZone] = useState(null);
  //

  // SAVE
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
      ville: {
        id: v,
      },
    };
    if (!d.nom) {
      alert("Zone vide !");
    } else {
      await axios.post("/api/controller/zones/save", d).then(() => {
        forceUpdate();
      });

    }
  };

  // ALL
  const getVl = async () => {
    setLoad(true);
    try {
      const res = await axios.get("/api/controller/zones/");
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
    axios.delete(`/api/controller/zones/delete/${id}`).then((result) => {
      console.log("delete ", id);
      result.json().then((resp) => {
        getVl();
      });
    });
    forceUpdate(); // rel
  }

  // villes

  // select villes
  useEffect(() => {
    axios.get("/api/controller/villes/").then((res) => {
      setAllV(res.data);
    });
  }, []);

  const handleChange = (event) => {
    setV(event.target.value);
  };
  //
  //MODAL
  const ModalhandleChange = (e) => {
    setMv(e.target.value);
  };
  //

  const updateZone = () => {
    axios
      .put(`/api/controller/zones/update/${selectedZone.id}`, {
        nom: form.getFieldValue("nom"),
        ville: {
          id: modalVille,
        },
      })
      .then((result) => {
        getVl();
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    forceUpdate();
  };

  const handleCancel = () => {
    setSelectedZone(null);
    setOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    setSelectedZone(record);
    setOpen(true);
  };

  const handleSubmit = () => {
    setModalText("The modal will be closed after one second");
    setConfirmLoading(true);
    updateZone();
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("SelectedZone after update: ", selectedZone);
  }, [selectedZone]);
  useEffect(() => {
    form.setFieldsValue({ nom: selectedZone?.nom });
  }, [selectedZone, form]);
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
      filters: allV.map((v) => ({
        text: v.nom,
        value: v.nom,
      })),
      onFilter: (value, record) => record.ville.indexOf(value) === 0,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="outlined" onClick={() => handleUpdate(record)}>
            Update
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteUser(record.id)}
          >
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
      <Modal
        forceRender
        title="Title"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={form.submit}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ nom: selectedZone?.nom }}
        >
          <Form.Item
            label="Zone"
            name="nom"
            rules={[
              {
                required: true,
                message: "Please input your zone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ville" name="ville">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vl}
              label="villes"
              onChange={ModalhandleChange}
              fullWidth
              style={{ height: 14 }}
            >
              {allV?.map((item) => (
                <MenuItem value={item.id}>{item.nom}</MenuItem>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </ThemeProvider>
  );
}
