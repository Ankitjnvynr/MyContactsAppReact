import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import Navbar from './components/Navbar';
import { IoIosAddCircle, IoMdTrash } from "react-icons/io";
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();




  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          }
          );
          setContacts(contactsList);
          return contactsList;
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value;
    
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      }
      );

      const filteredContacts = contactsList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts);
      
      return filteredContacts;
    })
  }



  return (
    <>
      <div className='max-w-[355px] m-auto p-2 '>
        <Navbar />
        <div className='my-3 flex items-center '>
          <FiSearch className='absolute text-3xl text-white mx-1' />
          <input onChange={filterContacts} className='border pr-3 flex-grow border-white h-10 rounded-md bg-transparent text-white pl-10' type="text" />
          <IoIosAddCircle onClick={onOpen} className=' text-4xl text-white mx-1 cursor-pointer' />
        </div>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position='bottom-center' />
    </>
  )
}

export default App