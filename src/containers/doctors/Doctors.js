import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Doctors(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };
    const handleInsert = (values) => {
        console.log(values);
        let localData = JSON.parse(localStorage.getItem("doctor"))

        if (localData === null) {
            localStorage.setItem("doctor", JSON.stringify([values]))
        }
        else {
            localData.push(values)
            localStorage.setItem("doctor", JSON.stringify([localData]))
        }
    }
    let schema = yup.object().shape({
        code: yup.number().required("please enter doctor's code number").positive().integer(),
        fname: yup.string().required("please enter first name"),
        lname: yup.string().required("please enter last name"),
        specialty: yup.string().required("please enter doctor's specialty"),
    });

    const formik = useFormik({
        initialValues: {
            code: '',
            fname: '',
            lname: '',
            specialty: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            handleInsert(values);

        },
    });

    const { handleBlur, handleSubmit, handleChange, values, errors, touched } = formik
    return (
        <div>
            <h2>Doctors</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Details
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Doctors Details</DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="code"
                                label="Doctor's Code"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.code && touched.code ? <p>{errors.code}</p> : ''}
                            <TextField
                                margin="dense"
                                name="fname"
                                label="Doctor First Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.fname && touched.fname ? <p>{errors.fname}</p> : ''}
                            <TextField
                                margin="dense"
                                name="lname"
                                label="Doctor Last Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lname && touched.lname ? <p>{errors.lname}</p> : ''}
                            <TextField
                                margin="dense"
                                name="specialty"
                                label="Doctor Specialty"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.specialty && touched.specialty ? <p>{errors.specialty}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Add</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Doctors;