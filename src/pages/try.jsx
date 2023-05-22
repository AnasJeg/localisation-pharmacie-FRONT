
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { zoneServices } from '../service/zone.service';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import '../style/test.css'
import { GardePharmacieService } from '../service/gardepharmacie.service';
import { pharmacieService } from '../service/pharmacie.service';
import { gardeServices } from '../service/garde.service';

export default function Test() {
    const [zones, setZones] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [pharmacies, setPharmacies] = useState("");
    const [selectedPharmacie, setSelectedPharmacie] = useState(null);
    const [gardes, setGardes] = useState("");
    const [selectedGarde, setSelectedGarde] = useState(null);
    const [dD, setDD] = useState('')
    const [ph, setPh] = useState('')
    const [gr, setGr] = useState('')
    const [dateD, setDateD] = useState("");
    const [dateF, setDateF] = useState("");

    useEffect(() => {
        pharmacieService.getAllPharmacies()
            .then((res) =>
                setPharmacies(
                    res.data.map((item) => ({
                        id: item.id,
                        nom: item.nom,
                        adresse: item.adresse,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        photos: item.photos,
                        zone: item.zone.nom,
                    })))
            );
    }, []);

    useEffect(() => {
        console.log("pharmacies  ", pharmacies);
    }, [pharmacies]);
    //Gardes
    useEffect(() => {
        gardeServices.getGardes()
            .then((res) =>
                setGardes(
                    res.data.map((item) => ({
                        id: item.id,
                        type: item.type,
                    })))
            );
    }, []);

    useEffect(() => {
        console.log("gardes  ", gardes);
    }, [gardes]);


    var showGardePharmacie = {
        pg: {
            dateDebut: '',
            pharmacie: '',
            garde: ''
        },
        dateFin: ''
    };
    const [product, setProduct] = useState(showGardePharmacie);

    const fetchGardePharmacie = async () => {
        GardePharmacieService.getAllGardePharmacies()
            .then((res) =>
                setZones(
                    res.data.map((item) => ({
                        dateFin: item.dateFin,
                        garde: item.garde.type,
                        dateDebut: item.pg.dateDebut,
                        pharmacie: item.pharmacie.nom,
                    })))
            );
    };

    useEffect(() => {
        fetchGardePharmacie();
    }, [productDialog]);


    const openNew = () => {
        setProduct(showGardePharmacie);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };



    const saveProduct = () => {
        setSubmitted(true);
        const newProduct = {
            pg: {
                dateDebut: dateD,
                pharmacie: selectedPharmacie.id,
                garde: selectedGarde.id
            },
            dateFin: dateF
        };
        console.log("save_zone", newProduct);
        setProductDialog(false);
        setProduct(newProduct);
        GardePharmacieService.addGardePharmacie(newProduct).then(() => {
            fetchGardePharmacie();
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'operation done', life: 3000 });
        })
    };

    const editProduct = (product) => {
        const newProduct = {
            pg: {
                dateDebut: dateD,
                pharmacie: selectedPharmacie,
                garde: selectedGarde
            },
            dateFin: dateF
        };
        setProduct(newProduct);
        console.log('Edit product', newProduct)
        setProductDialog(true);
        GardePharmacieService.UpdateGardePharmacie(product.dateDebut, product.pharmacie,product.garde,
            newProduct
            )
            .then(() => {
                setDeleteProductDialog(false);
                setProduct(showGardePharmacie);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'operation done', life: 3000 });
                fetchGardePharmacie();
            })
    };

    const confirmDeleteProduct = (product) => {
        console.log(product)
        setDD(product.dateDebut)
        setPh(product.pharmacie)
        setGr(product.garde)
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        GardePharmacieService.DeleteGardePharmacie(dD, ph, gr)
            .then(() => {
                setDeleteProductDialog(false);
                setProduct(showGardePharmacie);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'operation done', life: 3000 });
                fetchGardePharmacie();
            })
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Espace Garde Pharmacie</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

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

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={zones}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Zones" globalFilter={globalFilter} header={header}>
                    <Column field="dateDebut" header="dateDebut" style={{ minWidth: '5rem' }}></Column>
                    <Column field="pharmacie" header="pharmacie" style={{ minWidth: '16rem' }}></Column>
                    <Column field="garde" header="garde" style={{ minWidth: '12rem' }}></Column>
                    <Column field="dateFin" header="dateFin" style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Pharmacie Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.photos && <img src={product.photos} alt={product.photos} className="product-image block m-auto pb-3" />}
                <RangePicker presets={rangePresets} onChange={onRangeChange} className='w-full' />
                <div className="card flex justify-content-center" style={{ marginTop: '1rem' }}>
                    <Dropdown value={selectedPharmacie} onChange={(e) => setSelectedPharmacie(e.value)} options={pharmacies} optionLabel="nom" placeholder="Select pharmacie"
                        filter className="w-full" />
                </div>
                <div className="card flex justify-content-center" style={{ marginTop: '1rem' }}>
                    <Dropdown value={selectedGarde} onChange={(e) => setSelectedGarde(e.value)} options={gardes} optionLabel="type" placeholder="Select garde"
                        filter className="w-full" />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.nom}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
