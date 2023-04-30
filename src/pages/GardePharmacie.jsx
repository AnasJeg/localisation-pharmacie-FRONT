import React, { useEffect, useReducer, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Table, Space, Popconfirm, DatePicker } from "antd";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Modal, Form } from "antd";

const theme = createTheme();

export default function GardePharmacie() {
  const [loading, setLoad] = useState(false);
  const [ph, setPh] = useState("");
  const [pharmacies, setPharmacies] = useState();
  const [gardes, setGardes] = useState();
  const [gr, setGr] = useState("");
  const [uptable, forceupdate] = useReducer((x) => x + 1, 0);
  const [dateD, setDateD] = useState("");
  const [dateF, setDateF] = useState("");
  const [GardePharmacies, setGardePharmacies] = useState();
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [modalepharmacie, setPH_modal] = useState("");
  const [modalegarde, setG_modal] = useState("");
  const [selectedGarde_Ph, setSelectedGarde_Ph] = useState(null);
  //
  //ALL pharmacies
  useEffect(() => {
    axios.get("/api/pharmacies/").then((res) => {
      setPharmacies(res.data);
    });
  }, []);
  //All garde
  useEffect(() => {
    axios.get("/api/gardes/").then((res) => {
      setGardes(res.data);
    });
  }, []);

  // SAVE
  const onSubmit = async (event) => {
    event.preventDefault();
    var d = {
      pg: {
        pharmacie: ph,
        garde: gr,
        dateDebut: dateD,
      },
      dateFin: dateF,
    };
    if (!d) {
      alert(" vide !");
    } else {
      try {
        console.log(d);
        await axios.post(`/api/GardePharmacie/save`, d).then(() => {
          forceupdate();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //ALL GardePharmacie
  const AllGardePharmacie = async () => {
    setLoad(true);
    try {
      await axios.get("/api/GardePharmacie/").then((res) => {
        console.log(res.data);
        setGardePharmacies(
          res.data.map((item) => ({
            dateFin: item.dateFin,
            garde: item.garde.type,
            dateDebut: item.pg.dateDebut,
            pharmacie: item.pharmacie.nom,
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };
  useEffect(() => {
    AllGardePharmacie();
  }, [uptable]);
  const columns = [
    {
      title: "dateDebut",
      dataIndex: "dateDebut",
      key: "dateDebut",
    },
    {
      title: "garde",
      dataIndex: "garde",
      key: "garde",
    },
    {
      title: "pharmacie",
      dataIndex: "pharmacie",
      key: "pharmacie",
    },
    {
      title: "dateFin",
      dataIndex: "dateFin",
      key: "dateFin",
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
            onConfirm={() => handleDelete(record)}
          >
            <Button variant="outlined">Delete</Button>
          </Popconfirm>
        </Space>
      ),
      key: "action",
    },
  ];
  // Delete 
  function handleDelete(record) {
    setSelectedGarde_Ph(record);
    console.log(selectedGarde_Ph.pharmacie)
    console.log(selectedGarde_Ph.garde)
    axios.delete(`/api/GardePharmacie/deleteGP/${selectedGarde_Ph.dateDebut}/${selectedGarde_Ph.pharmacie}/${selectedGarde_Ph.garde}`)
      .then((result) => {
        console.log("deleteGP ", selectedGarde_Ph);
        AllGardePharmacie();
        forceupdate(); // rel
      });
  }
  //
  const handleChangePH = (event) => {
    setPh(event);
    console.log("setPH ", event);
  };

  const handleChangeGR = (event) => {
    setGr(event);
    console.log("setGr ", event);
  };
  const { RangePicker } = DatePicker;

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      setDateD(dateStrings[0]);
      setDateF(dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  //update
  //  /${selectedGarde_Ph.pharmacie}/${selectedGarde_Ph.garde}
  const updateGarde_Pharmacie = () => {
    console.log(selectedGarde_Ph.pharmacie)
    console.log(selectedGarde_Ph.garde)
    axios
      .put(`/api/GardePharmacie/update/${selectedGarde_Ph.dateDebut}/${selectedGarde_Ph.pharmacie}/${selectedGarde_Ph.garde}`, {
        pg: {
          pharmacie: modalepharmacie,
          garde: modalegarde,
          dateDebut: dateD,
        },
        dateFin: dateF,
      })
      .then((result) => {

        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    forceupdate();
  };

  //MODAL

  const ModalhandleChangePh = (e) => {
    setPH_modal(e);
  };
  const ModalhandleChangeG = (e) => {
    setG_modal(e);
  };
  const handleCancel = () => {
    setSelectedGarde_Ph(null);
    setOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    console.log(record)
    setSelectedGarde_Ph(record);
    setOpen(true);
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    updateGarde_Pharmacie();
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 1000);
  };
  useEffect(() => {
    console.log("Selectedpharma_Garde after update: ", selectedGarde_Ph);
  }, [selectedGarde_Ph]);
  /*
   useEffect(() => {
     if (selectedGarde_Ph?.dateDebut && selectedGarde_Ph?.dateFin) {
       form.setFieldsValue({
         dates: [moment(selectedGarde_Ph.dateDebut), moment(selectedGarde_Ph.dateFin)],
         gardeForm: selectedGarde_Ph.garde,
         phramacieFrom: selectedGarde_Ph.pharmacie
       });
       console.log(selectedGarde_Ph.dateDebut);
       console.log(selectedGarde_Ph.dateFin);
     }
   }, [selectedGarde_Ph, form]);
 */

  useEffect(() => {
    form.setFieldsValue({
      gardeForm: selectedGarde_Ph?.garde,
      phramacieFrom: selectedGarde_Ph?.pharmacie
    });
    console.log(selectedGarde_Ph?.dateDebut)
    console.log(selectedGarde_Ph?.dateFin)
  }, [selectedGarde_Ph, form]);

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
            Ajouter Garde Pharmacie
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Space direction="vertical" size={12}>
              <RangePicker presets={rangePresets} onChange={onRangeChange} />
            </Space>
            <FormControl fullWidth style={{ marginTop: 14 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gr}
                label="gardes"
                onChange={handleChangeGR}
              >
                {gardes?.map((item) => (
                  <MenuItem value={item.id}>{item.type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 14 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ph}
                label="pharmacies"
                onChange={handleChangePH}
              >
                {pharmacies?.map((item) => (
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
        dataSource={GardePharmacies}
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
          initialValues={{ nom: selectedGarde_Ph?.nom }}
        >
          <Form.Item label="Dates" name="dates">
            <RangePicker presets={rangePresets} onChange={onRangeChange} />
          </Form.Item>
          <Form.Item label="Garde" name="gardeForm">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gr}
              label="Garde : "
              fullWidth
              onChange={ModalhandleChangeG}
              style={{ height: 14 }}
            >
              {gardes?.map((item) => (
                <MenuItem value={item.id}>{item.type}</MenuItem>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Pharmacie" name="phramacieFrom">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ph}
              label="pharmacies"
              fullWidth
              onChange={ModalhandleChangePh}
              style={{ height: 14 }}
            >
              {pharmacies?.map((item) => (
                <MenuItem value={item.id}>{item.nom}</MenuItem>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </ThemeProvider>
  );
}
