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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Patients(props) {
    const [open, setOpen] = useState(false);
    const [dopen, setDopen] = useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickDopen = () => {
        setDopen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        setUpdate(false)
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

    const handleUpdatedata = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));
        let update = localData.map((l) => {
            if (l.id === values.id) {
                return values;
            } else {
                return l;
            }
        })
        localStorage.setItem("Patients", JSON.stringify(update))
        loadData()
        handleClose();
    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter patient Name"),
        age: yup.number().required("please enter age").positive().integer(),
        phone: yup.number().required("please enter Phone number").positive().integer(),
        date: yup.string().required("please enter Appointment Date"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            age: '',
            phone: '',
            date: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdatedata(values)
            } else {
                handleInsert(values)
            }
        },
        enableReinitialize: true,

    });

    const handleDelete = () => {
        // console.log(params.id);
        let localData = JSON.parse(localStorage.getItem("Patients"))
        let fData = localData.filter((l) => l.id !== did)
        localStorage.setItem("Patients", JSON.stringify(fData))
        loadData()
        handleClose()
    }
    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikObj;

    const handleEdit = (params) => {
        handleClickOpen()
        formikObj.setValues(params.row)
        // console.log(params.row);
        setUpdate(true)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'age', headerName: 'Age', width: 200 },
        { field: 'phone', headerName: 'Contact Number', width: 200 },
        { field: 'date', headerName: 'Appointment Date', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDopen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
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
            <Dialog
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this data ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                {
                    update ?
                        <DialogTitle>Update Patient Details</DialogTitle>
                        :
                        <DialogTitle>patient Details</DialogTitle>
                }
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
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
                                value={values.age}
                                margin="dense"
                                name="age"
                                label="patient age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                            <TextField
                                value={values.phone}
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
                                value={values.date}
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
                                {
                                    update ?
                                        <Button type="submit">Update</Button> :
                                        <Button type="submit">Add</Button>
                                }
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