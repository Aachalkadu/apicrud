import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from 'react-toastify'
import axios from 'axios';
import './AddEdit.css';
const initialState = {
  name: '',
  email: '',
  contact: '',
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {id}= useParams();

  useEffect(()=>{
    if(id) {
      getSingleUser(id);
    }
  },[id])

  const getSingleUser= async (id)=>{
    const response = await axios.get(`http://localhost:5000/user/${id}`);
      if(response.status===200) {
        setState({...response.data[0] });
      }

  }

  const { name, email, contact } = state;
  const addUser = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/user', data);
      if (response.status === 200) {
        toast.success(response.data); // Use toast for success message
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.'); // Use toast for error message
    }
  };

  const updateUser = async (data,id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data); // Use toast for success message
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.'); // Use toast for error message
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('Please provide a value in each input field.'); // Use toast for validation error message
    } else {
      if(!id){
        addUser(state);
      }else{
        updateUser(state,id);
      }
      // addContact(state);
      navigate('/');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      {/* Display the message div with CSS properties */}
      {message && (
        <div
          className={`message ${message.startsWith('An error') ? 'error' : 'success'}`}
        >
          {message}
        </div>
      )}
      <div style={{ marginTop: '100px' }}>
        <form
          style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name..."
            onChange={handleInputChange}
            value={name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email..."
            onChange={handleInputChange}
            value={email}
          />
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter Contact No..."
            onChange={handleInputChange}
            value={contact}
          />
          <input type="submit" value={id? "update":"Add"} />
        </form>
      </div>
    </div>
  );
};
export default AddEdit;