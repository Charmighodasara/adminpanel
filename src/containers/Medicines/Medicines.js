import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formikobj.resetForm()

    };

    // const nameRef = useRef();
    // const priceRef = useRef();
    // const quantityRef = useRef();
    // const expiryRef = useRef();
    // const rows = [{ id: 1, name: 'Snow', price: 'Jon', quantity: 35, expiry: 2025 }];
    const rows = [];

    // rows.map((v , i )=> {
    //     let {id ,name ,price ,quantity ,expiry}= v
    //     return(
    //         {id: 1, name: {name}, price: {price}, quantity: {quantity}, expiry: {expiry} }
    //     )
    // })

    const handleInsert = (values) => {
        console.log(values);
        let localdata = JSON.parse(localStorage.getItem("medicine"))

        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([values]))
        } else {
            localdata.push(values)
            localStorage.setItem("medicine", JSON.stringify(localdata))
        }
        // let obj = {
        //     name: nameRef.current.values,
        //     price: priceRef.current.values,
        //     quantity: quantityRef.current.values,
        //     expiry: expiryRef.current.values
        // };
        // rows.push(obj);
        // console.log(rows);

        handleClose()
    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter Medicine Name"),
        price: yup.number().required("please enter Medicine price").positive().integer(),
        quantity: yup.string().required("please enter Medicine quantity"),
        expiry: yup.string().required("please enter Medicine expiry"),
    });

    const formikobj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },

    });

    const { handleBlur, handleSubmit, handleChange, errors, touched } = formikobj

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Medicine Name', width: 150 },
        { field: 'price', headerName: ' Medicine price', width: 150 },
        {
            field: 'quantity',
            headerName: 'quantity',
            type: 'number',
            width: 100,
        },
        {
            field: 'expiry',
            headerName: 'expiry',
            description: 'This column has a value getter and is not sortable.',
            // sortable: false,
            width: 100,
        },
    ];

    return (
        <div>
            <h2>Medicines</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicines
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle> Add Medicines</DialogTitle>
                <Formik values={formikobj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                // ref={nameRef}
                                margin="dense"
                                name="name"
                                label="Medicine Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                // ref={priceRef}
                                margin="dense"
                                name="price"
                                label="Price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                            <TextField
                                // ref={quantityRef}
                                margin="dense"
                                name="quantity"
                                label="Quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                            <TextField
                                // ref={expiryRef}
                                margin="dense"
                                name="expiry"
                                label="Expiry"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type='submit'>Add </Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <h4>DATA TABLE</h4>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
export default Medicines;