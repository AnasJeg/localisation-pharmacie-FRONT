import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { villeServices } from '../service/ville.service';
import { Dropdown } from 'primereact/dropdown';
import { zoneServices } from '../service/zone.service';


export default function Zone() {
    const [zones, setZones] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [villes, setVilles] = useState("");
    const [selectedVille, setSelectedVille] = useState(null);
    const [id, setId] = useState('');


    useEffect(() => {
        villeServices.getVilles()
            .then((res) =>
                setVilles(
                    res.data.map((item) => ({
                        id: item.id,
                        nom: item.nom,
                    })))
            );
    }, []);

    useEffect(() => {
        console.log("zonevalueuseEffect  ", villes);
    }, [villes]);

    let showVille = {
        nom: '',
        ville: null
    };
    const [product, setProduct] = useState(showVille);

    const fetchZones = async () => {
        zoneServices.getZones()
            .then((res) =>
                setZones(
                    res.data.map((item) => ({
                        id: item.id,
                        nom: item.nom,
                        ville: item.ville.nom
                    })))
            );
    };

    useEffect(() => {
        fetchZones();
    }, [productDialog]);


    const openNew = () => {
        setProduct(showVille);
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
        if (product.nom.trim()) {
            const newProduct = {
                ...product,
                 ville: selectedVille
            };
            console.log("save_zone", newProduct);
            setProductDialog(false);
            setProduct(newProduct);
            console.log("product ", product)
            zoneServices.addZone(newProduct).then(() => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'operation done', life: 3000 });
                fetchZones();
            })
        }
    };

    
    const editProduct = (product) => {
        const newProduct = { ...product };
        const selectedVilleItem = villes.find((ville) => ville.nom === product.ville);
        setSelectedVille(selectedVilleItem); 
        setProduct(newProduct);
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setId(product.id);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        zoneServices.DeleteZone(id)
            .then(() => {
                setDeleteProductDialog(false);
                setProduct(showVille);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'operation done', life: 3000 });
                fetchZones();
            })
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
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
            <h4 className="m-0">Espace Zones</h4>
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

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={zones} 
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Zones" globalFilter={globalFilter} header={header}>
                    <Column field="id" header="Id" style={{ minWidth: '5rem' }}></Column>
                    <Column field="nom" header="Nom" style={{ minWidth: '16rem' }}></Column>
                    <Column field="ville" header="ville" style={{ minWidth: '12rem' }}></Column>
                    <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Pharmacie Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.photos && <img src={product.photos} alt={product.photos} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="nom" className="font-bold">
                        Nom
                    </label>
                    <InputText id="nom" value={product.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nom })} />
                    {submitted && !product.name && <small className="p-error">nom is required.</small>}
                </div>
                <div className="card flex justify-content-center" style={{ marginTop: '1rem' }}>
                    <Dropdown value={selectedVille} onChange={(e) => setSelectedVille(e.value)} options={villes} optionLabel="nom" placeholder="Select Ville"
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
