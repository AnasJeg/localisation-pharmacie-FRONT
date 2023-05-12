import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent } from '@mui/material';
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";


export default function Employe() {
    const [loading, setLoad] = useState(false);
    const [emp, setEmp] = useState();
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0); // reaload tb

    // SAVE
    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var d = {
            cin: data.get("cin"),
            nom: data.get("nom"),
            prenom: data.get("prenom"),
            adresse: data.get("adresse"),
            email: data.get("email"),
            telephone: data.get("telephone"),
            dateNaissance: data.get("dateNaissance"),
            matricule: data.get("matricule")
        };
        if (!d.nom) {
            alert("agence vide !");
        } else {
            fetch("http://localhost:8080/banque/employees/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(d),
            }).then(() => {
                forceUpdate(); // rel
            });
        }
    };
    // ALL
    const getAllAgences = async () => {
        setLoad(true);
        try {
            const res = await axios.get("http://localhost:8080/banque/employees/read")
            setEmp(
                res.data.map((row) => ({
                    id: row.id,
                    cin: row.cin,
                    nom: row.nom,
                    prenom: row.prenom,
                    adresse: row.adresse,
                    email: row.email,
                    telephone: row.telephone,
                    dateNaissance: row.dateNaissance,
                    matricule: row.matricule
                }))
            );
        } catch (error) {
            console.error(error);
        }
        setLoad(false);
    };
    useEffect(() => {
        getAllAgences();
    }, [upTB]);
    // Delete 
    function deleteEmploye(id) {
        axios
            .delete(`http://localhost:8080/banque/employees/delete/${id}`)
            .then((result) => {
                console.log("delete ", id);
            }).then(() => {
                forceUpdate();
            })
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "cin",
            dataIndex: "cin",
            key: "cin",
        },
        {
            title: "nom",
            dataIndex: "nom",
            key: "nom",
        },
        {
            title: "prenom",
            dataIndex: "prenom",
            key: "prenom",
        },
        {
            title: "Adresse",
            dataIndex: "adresse",
            key: "adresse",
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "telephone",
            dataIndex: "telephone",
            key: "telephone",
        },
        {
            title: "dateNaissance",
            dataIndex: "dateNaissance",
            key: "dateNaissance",
        },
        {
            title: "matricule",
            dataIndex: "matricule",
            key: "matricule",
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
                        onConfirm={() => deleteEmploye(record.id)}
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
    // 
    //MODAL

    //
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");
    const [form] = Form.useForm();
    const [selectedEmp, setSelectedEmp] = useState(null);

    const updateEmployee = () => {
        axios
            .put(`http://localhost:8080/banque/employees/update/${selectedEmp.id}`, {
                id: selectedEmp.id,
                cin: form.getFieldValue("cin"),
                nom: form.getFieldValue("nom"),
                prenom: form.getFieldValue("prenom"),
                adresse: form.getFieldValue("adresse"),
                email: form.getFieldValue("email"),
                telephone: form.getFieldValue("telephone"),
                dateNaissance: form.getFieldValue("dateNaissance"),
                matricule: form.getFieldValue("matricule"),
            })
            .then((result) => {
                console.log("update ", selectedEmp);
                console.log("result ", result.data);
                getAllAgences();
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
        setSelectedEmp(null);
        setOpen(false);
        form.resetFields();
    };

    const handleUpdate = (record) => {
        setSelectedEmp(record);
        setOpen(true);
    };

    const handleSubmit = () => {
        setModalText("The modal will be closed after one second");
        setConfirmLoading(true);
        updateEmployee();
        setTimeout(() => {
            setConfirmLoading(false);
            setOpen(false);
        }, 1000);
    };

    useEffect(() => {
        console.log("Selected Ville after update: ", selectedEmp);
    }, [selectedEmp]);
    useEffect(() => {
        form.setFieldsValue({
            cin: selectedEmp?.cin,
            nom: selectedEmp?.nom,
            prenom: selectedEmp?.prenom,
            adresse: selectedEmp?.adresse,
            email: selectedEmp?.email,
            telephone: selectedEmp?.telephone,
            dateNaissance: selectedEmp?.dateNaissance,
            matricule: selectedEmp?.matricule
        });
    }, [selectedEmp, form]);
    return (
        <Container component="main" maxWidth="lg">
            <Card sx={{ marginTop: 3 }} >
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Employe
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="cin"
                                            label="cin"
                                            id="cin"
                                            autoComplete="cin"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nom"
                                            label="nom"
                                            id="nom"
                                            autoComplete="nom"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="prenom"
                                            label="prenom"
                                            id="prenom"
                                            autoComplete="prenom"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="adresse"
                                            label="adresse"
                                            id="adresse"
                                            autoComplete="nom"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="email"
                                            label="email"
                                            id="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="telephone"
                                            label="telephone"
                                            id="telephone"
                                            autoComplete="telephone"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="dateNaissance"
                                            id="dateNaissance"
                                            autoComplete="dateNadateissance"
                                            type="date"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="matricule"
                                            label="matricule"
                                            id="matricule"
                                            autoComplete="matricule"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    sx={{ mt: 3, mb: 2 }}
                                    variant="contained"
                                >
                                    ajouter
                                </Button>


                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Card sx={{ marginTop: 5 }}>
                <CardContent>
                    <Table
                        columns={columns}
                        dataSource={emp}
                        loading={loading}
                        bordered
                        onChange={onChange}
                    />
                </CardContent>
            </Card>
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
                    initialValues={{
                        cin: selectedEmp?.cin,
                        nom: selectedEmp?.nom,
                        prenom: selectedEmp?.prenom,
                        adresse: selectedEmp?.adresse,
                        email: selectedEmp?.email,
                        telephone: selectedEmp?.telephone,
                        dateNaissance: selectedEmp?.dateNaissance,
                        matricule: selectedEmp?.matricule
                    }}
                >
                    <Form.Item
                        label="cin"
                        name="cin"
                        rules={[
                            {
                                required: true,
                                message: "Please input your cin!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="nom"
                        name="nom"
                        rules={[
                            {
                                required: true,
                                message: "Please input your nom!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="prenom"
                        name="prenom"
                        rules={[
                            {
                                required: true,
                                message: "Please input your prenom!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="adresse"
                        name="adresse"
                        rules={[
                            {
                                required: true,
                                message: "Please input your adresse!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="telephone"
                        name="telephone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your telephone!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="dateNaissance"
                        name="dateNaissance"
                        rules={[
                            {
                                required: true,
                                message: "Please input your dateNaissance!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="matricule"
                        name="matricule"
                        rules={[
                            {
                                required: true,
                                message: "Please input your matricule!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Container>
    );
}