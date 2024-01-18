import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from "../config/firebase";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name  is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
})


function AddAndUpdateContact({ isOpen, onClose, isUpdate, contact }) {



    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            toast.success("Contact Added Sucessfully");
            onClose()

        } catch (error) {
            console.log(error)
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            toast.success("Contact Updated Sucessfully");
            onClose()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
                validationSchema={contactSchemaValidation}
                initialValues={
                    isUpdate ? {
                        name: contact.name,
                        email: contact.email,
                    } :
                        {
                            name: "",
                            email: "",
                        }
                }
                onSubmit={(values) => {

                    isUpdate ? updateContact(values, contact.id) :
                        addContact(values)

                }}
            >
                <Form className='flex flex-col' >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className="h-9 px-2 bg-transparent rounded-md border" />
                        <div className="text-xs text-red-500">
                            <ErrorMessage name='name' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                        <label htmlFor="email">Email</label>
                        <Field name="email" className="h-9 px-2 bg-transparent rounded-md border" />
                        <div className="text-xs text-red-500">
                            <ErrorMessage name='email' />
                        </div>
                    </div>
                    <button className='bg-orange border rounded-lg p-1 px-2 my-2 self-end' >{isUpdate ? "Update " : "Add"} Contact</button>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddAndUpdateContact