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
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";

const theme = createTheme();

export default function Ville() {
  const [villes, setVilles] = useState([]);
  const [loading, setLoad] = useState(false);
  const [vl, setVl] = useState();
  const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb

  // SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var d = {
      nom: data.get("nom"),
    };
    console.log(JSON.stringify(d));
    if (!d.nom) {
      alert("ville vide !");
    } else {
      fetch("/api/villes/save", {
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
      const res = await axios.get("/api/villes/");
      setVl(
        res.data.map((row) => ({
          id: row.id,
          nom: row.nom,
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
    axios.delete(`/api/villes/delete/${id}`).then((result) => {
      console.log("delete ", id);
      result.json().then((resp) => {
        console.log(resp);
        getVl();
      });
    });
    forceUpdate(); // rel
  }

  //MODAL

  //
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();

  const [selectedVille, setSelectedVille] = useState(null);

  const updateVille = () => {
    axios
      .put(`/api/villes/update/${selectedVille.id}`, {
        nom: form.getFieldValue("nom"),
      })
      .then((result) => {
        console.log("update ", selectedVille);
        console.log("result ", result.data);
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
    console.log("Clicked cancel button");
    setSelectedVille(null);
    setOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    setSelectedVille(record);
    setOpen(true);
  };

  const handleSubmit = () => {
    setModalText("The modal will be closed after one second");
    setConfirmLoading(true);
    updateVille();
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("Selected Ville after update: ", selectedVille);
  }, [selectedVille]);
  useEffect(() => {
    form.setFieldsValue({ nom: selectedVille?.nom });
  }, [selectedVille, form]);
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
            Ajouter ville
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
          initialValues={{ nom: selectedVille?.nom }}
        >
          <Form.Item
            label="Ville"
            name="nom"
            rules={[
              {
                required: true,
                message: "Please input your ville!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </ThemeProvider>
  );
}
