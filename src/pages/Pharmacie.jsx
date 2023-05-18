import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { pharmacieService } from '../service/pharmacie.service';
import { zoneServices } from '../service/zone.service';
import { Dropdown } from 'primereact/dropdown';


export default function Pharmacie() {
    const [pharmacies, setPharmacies] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [zones, setZones] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const [file, setFile] = useState("");
    const [selectedZone, setSelectedZone] = useState(null);
    const [zonevalue, setZonevalue] = useState(null)
    const [id, setId] = useState('')

    useEffect(() => {
        zoneServices.getZones().then((res) =>
            setZones(
                res.data.map((item) => ({
                    id: item.id,
                    nom: item.nom,
                })))
        );
    }, []);

    useEffect(() => {
        console.log("zonevalueuseEffect  ", zonevalue);
    }, [zonevalue]);

    var showPharmacie = {
        nom: '',
        adresse: '',
        latitude: 0,
        longitude: 0,
        photos: null,
        zone: null,
    };
    const [product, setProduct] = useState(showPharmacie);

    const fetchPharmacies = async () => {
        pharmacieService.getAllPharmacies().then((res) =>
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
    };

    useEffect(() => {
        fetchPharmacies();
    }, [productDialog]);


    const openNew = () => {
        setProduct(showPharmacie);
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
                photos: file,
                zone: selectedZone
            };
            console.log("save_pharmacie", newProduct);
            setProductDialog(false);
            setProduct(newProduct);
            console.log("product ", product)
            pharmacieService.addPharmacie(newProduct).then(() => {
                fetchPharmacies();
            })
        }
    };

    const editProduct = (product) => {
        const newProduct = {
            ...product,
            photos: file,
            zone: selectedZone
        };
        setProduct(newProduct);
        console.log(product)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setId(product.id);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        pharmacieService.DeletePharmacie(id)
            .then(() => {
                console.log("_pharmacie ")
                setDeleteProductDialog(false);
                setProduct(showPharmacie);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                fetchPharmacies();
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

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
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

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.photos} alt={rowData.photos} className="shadow-2 border-round" style={{ width: '64px' }} />;
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
            <h4 className="m-0">Espace Pharmacies</h4>
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

    // photos

    const photosUpload = async (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            setFile(base64data);
            console.log(base64data)
        };
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={pharmacies}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Pharmacies" globalFilter={globalFilter} header={header}>
                    <Column field="id" header="Id" style={{ minWidth: '5rem' }}></Column>
                    <Column field="nom" header="Nom" style={{ minWidth: '16rem' }}></Column>
                    <Column field="adresse" header="adresse" style={{ minWidth: '10rem' }}></Column>
                    <Column field="latitude" header="latitude" style={{ minWidth: '8rem' }}></Column>
                    <Column field="longitude" header="longitude" style={{ minWidth: '12rem' }}></Column>
                    <Column field="photos" header="photos" body={imageBodyTemplate}></Column>
                    <Column field="zone" header="zone" style={{ minWidth: '12rem' }}></Column>
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
                <div className="field">
                    <label htmlFor="adresse" className="font-bold">
                        adresse
                    </label>
                    <InputTextarea id="adresse" value={product.adresse} onChange={(e) => onInputChange(e, 'adresse')} required rows={3} cols={20} />
                    {submitted && !product.adresse && <small className="p-error">adresse is required.</small>}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="latitude" className="font-bold">
                            latitude
                        </label>
                        <InputNumber id="latitude" value={product.latitude} onValueChange={(e) => onInputNumberChange(e, 'latitude')} />
                        {submitted && !product.latitude && <small className="p-error">latitude is required.</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="longitude" className="font-bold">
                            longitude
                        </label>
                        <InputNumber id="longitude" value={product.longitude} onValueChange={(e) => onInputNumberChange(e, 'longitude')} />
                        {submitted && !product.longitude && <small className="p-error">longitude is required.</small>}
                    </div>
                </div>
                <div className="card flex justify-content-center" style={{ marginTop: '1rem' }}>
                    <Dropdown value={selectedZone} onChange={(e) => setSelectedZone(e.value)} options={zones} optionLabel="nom" placeholder="Select zone"
                        filter className="w-full" />
                </div>
                <div className="card" style={{ marginTop: '1rem' }}>
                    <label htmlFor="photo" className="font-bold">
                        Photo
                    </label>
                    <FileUpload name="photos" url={'/api/upload'} multiple accept="image/*" customUpload uploadHandler={photosUpload} maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
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
