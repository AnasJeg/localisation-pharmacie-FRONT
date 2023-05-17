
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { pharmacieService } from '../service/pharmacie.service';
import { zoneServices } from '../service/zone.service';
import { Dropdown } from 'primereact/dropdown';


export default function Test() {
    const [pharmacies, setPharmacies] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deletePharmaciesDialog, setDeletePharmaciesDialog] = useState(false);
    const [selectedPharmacies, setSelectedPharmacies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [zones, setZones] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const [file, setFile] = useState("");
    const [selectedZone, setSelectedZone] = useState(null);
    const [zonevalue, setZonevalue] = useState(null)

    useEffect(() => {
        zoneServices.getZones().then((res) =>
            setZones(
                res.data.map((item) => ({
                    id: item.id,
                    nom: item.nom,
                })))
        );
        console.log("zones ", zones)
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

    const hideDeletePharmaciesDialog = () => {
        setDeletePharmaciesDialog(false);
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
        setProduct({ ...product });
        setProductDialog(true);
    };

    /*
     const confirmDeleteProduct = (product) => {
        setDeleteProductDialog(true);
        pharmacieService.DeletePharmacie(product.id).then(() => {
            setProduct(product);
            fetchPharmacies();
        })
    };

    const deleteProduct = () => {
        setDeleteProductDialog(false);
        setProduct(showPharmacie);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    }

    */
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
        pharmacieService.DeletePharmacie(product.id).then(() => {
        console.log("_pharmacie ")
        setDeleteProductDialog(false);
        setProduct(showPharmacie);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        })
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePharmaciesDialog(true);
    };

    const deleteSelectedPharmacies = () => {
        let _pharmacie = pharmacies.filter((val) => !selectedPharmacies.includes(val));

        setPharmacies(_pharmacie);
        setDeletePharmaciesDialog(false);
        setSelectedPharmacies(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Pharmacies Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
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
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => deleteProduct(rowData)} />
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
    const deletePharmaciesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePharmaciesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPharmacies} />
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
                <DataTable ref={dt} value={pharmacies} selection={selectedPharmacies} onSelectionChange={(e) => setSelectedPharmacies(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Pharmacies" globalFilter={globalFilter} header={header}>
                    <Column field="id" header="Id" style={{ minWidth: '5rem' }}></Column>
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="adresse" header="adresse" style={{ minWidth: '10rem' }}></Column>
                    <Column field="latitude" header="latitude" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="longitude" header="longitude" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="photos" header="photos" body={imageBodyTemplate}></Column>
                    <Column field="zone" header="zone" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
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
                    <label htmlFor="zone" className="font-bold">
                        Zone
                    </label>
                    <Dropdown value={selectedZone} onChange={(e) => setSelectedZone(e.value)} options={zones} optionLabel="nom" placeholder="Select zone"
                        filter className="w-full md:w-14rem" />
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

            <Dialog visible={deletePharmaciesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePharmaciesDialogFooter} onHide={hideDeletePharmaciesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected Pharmacies?</span>}
                </div>
            </Dialog>
        </div>
    );
}
