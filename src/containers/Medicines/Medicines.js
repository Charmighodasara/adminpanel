import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formikobj.resetForm()

    };

    const handleInsert = (values) => {
        console.log(values);
        let localdata = JSON.parse(localStorage.getItem("medicine"))

        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([values]))
        } else {
            localdata.push(values)
            localStorage.setItem("medicine", JSON.stringify(localdata))
        }

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

            handleInsert(values);
        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched } = formikobj

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
        </div>
    );
}
export default Medicines;