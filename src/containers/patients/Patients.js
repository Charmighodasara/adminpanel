import React, { useEffect, useState } from 'react';
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

function Patients(props) {
    const [open, setOpen] = useState(false);
    const [data , setData ] =  useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formikObj.resetForm()

    };
    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("Patients"))

        let id = Math.floor(Math.random() * 10000);
        console.log(id);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("Patients", JSON.stringify(localData))
        }
        handleClose()
        loadData()
    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter patient Name"),
        phone: yup.number().required("please enter Phone number").positive().integer(),
        date: yup.string().required("please enter Appointment Date"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            phone: '',
            date: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },
        enableReinitialize: true,

    });

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj;

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'phone', headerName: 'Contact Number', width: 200 },
        { field: 'date', headerName: 'Appointment Date', width: 200 },
    ];
    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem("Patients"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <h2>Patients</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Appointment
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>patient Details</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="patient name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                margin="dense"
                                name="phone"
                                label="Contact Number"
                                type="tel"
                                fullWidth
                                variant="standard"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                maxlength="10"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                            <TextField
                                margin="dense"
                                name="date"
                                label="Appointment Date"
                                type="datetime"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Patients;