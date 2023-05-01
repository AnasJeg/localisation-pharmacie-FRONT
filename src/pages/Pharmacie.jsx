import React, { useEffect, useReducer, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "antd";
import axios from "axios";
import { Upload } from "antd";
import { Button } from "@mui/material";
import { UploadOutlined } from '@ant-design/icons';
import img from "../assets/logo.png"

const theme = createTheme();

export default function Pharmacie() {
  const [loading, setLoad] = useState(false);
  const [zones, setZones] = useState([]);
  const [z, setZ] = useState("");
  const [pharmacies, setPharmacies] = useState();
  const [uptable, forceupdate] = useReducer((x) => x + 1, 0);
  const [file, setFile] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [modalepharmacie, setPH_modal] = useState("");
  const [modalegarde, setG_modal] = useState("");
  const [selectedGarde_Ph, setSelectedGarde_Ph] = useState(null);
  const [fileList, setFileList] = useState("");
  const [fileModale, setFileModale] = useState(img);
  //
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
      photos: file,
      zone: {
        id: z,
      },
    };
    if (!d) {
      alert(" vide !");
    } else {
      try {
        console.log(d);
        await axios.post(`/api/pharmacies/save`, d).then(() => {
          forceupdate();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //ALL pharmacies
  const Allpharmacies = async () => {
    setLoad(true);
    try {
      await axios.get("/api/pharmacies/").then((res) => {
        console.log(res.data);
        setPharmacies(
          res.data.map((item) => ({
            id: item.id,
            nom: item.nom,
            adresse: item.adresse,
            latitude: item.latitude,
            longitude: item.longitude,
            photos: item.photos,
            zone: item.zone.nom,
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };
  useEffect(() => {
    Allpharmacies();
  }, [uptable]);
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

      render: (t, r) => (
        <img
          src={r.photos}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          alt="pharmacy"
        />
      ),
      key: "photos",
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
          <Button variant="outlined" onClick={() => handleUpdate(record)}>
            Update
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deletePharmacie(record.id)}
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
  //update 
  const handleUpdate = (record) => {
    console.log(record)
    setFileList(record.photos)
    setOpen(true);
  };
  // Delete
  function deletePharmacie(id) {
    axios.delete(`/api/pharmacies/delete/${id}`).then((result) => {
      console.log("delete ", id);
      Allpharmacies()
    });
    forceupdate();
  }
  // Modal update
  const handleSubmit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setSelectedGarde_Ph(null);
    setOpen(false);
    form.resetFields();
  };
  const ModalhandleChangeZones = (e) => {
    console.log(e)
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFileModale(dataUrl);
    };
    reader.readAsDataURL(file);
    return false;
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

            {/*    
            <input type="file" id="photos" onChange={handleChangeImage} />
           */}
            <Upload.Dragger
              name="photos"
              id="photos"
              maxCount={1}
              listType="picture"
              action="http://localhost:3000/Pharmacie"
              accept=".png,.PNG,.JPEG,.jpeg,.jpg"

              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const dataUrl = event.target.result;
                  console.log(dataUrl);
                  setFile(dataUrl);
                };
                reader.readAsDataURL(file);
                return false;
              }}
            >
              <p className="ant-upload-text">Drag image here</p>
            </Upload.Dragger>


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

      <Table
        columns={columns}
        dataSource={pharmacies}
        loading={loading}
        bordered
        size="small"
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

        >
          <Form.Item
            label="Nom"
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
          <Form.Item
            label="Adresse"
            name="adresse"
            rules={[
              {
                required: true,
                message: "Please input your zone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Latitude"
            name="latitude"
            rules={[
              {
                required: true,
                message: "Please input your zone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Longitude"
            name="longitude"
            rules={[
              {
                required: true,
                message: "Please input your zone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Upload
              name="photosModale"
              maxCount={1}
              listType="picture"
              action="http://localhost:3000/Pharmacie"
              accept=".png,.PNG,.JPEG,.jpeg,.jpg"
              beforeUpload={beforeUpload}
              defaultFileList={[
                {
                  uid: 'img',
                  name: 'imh.png',
                  status: 'done',
                  url: fileModale,
                },
              ]}
            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="zonesModal" name="zonesModal">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={z}
              label="zones"
              onChange={ModalhandleChangeZones}
              fullWidth
              style={{ height: 14 }}
            >
              {zones?.map((item) => (
                <MenuItem value={item.id}>{item.nom}</MenuItem>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </ThemeProvider>
  );
}
