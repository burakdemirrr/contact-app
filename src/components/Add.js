import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Add = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const navigate=useNavigate();
    const contacts = useSelector((state) => state);
    const dispatch=useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.email === email && email);

       
        const checkNumber = contacts.find(contact => contact.number === number && parseInt(number));


        if (!email || !number || !name) {
            return toast.warning("All Fields Are Required");
        }
        if(checkEmail){
            return toast.error("this email  already exists");
        }
        if(checkNumber){
            return toast.error("this number already exists");
        }

    const data={
        id:contacts[contacts.length-1].id+1,
        name,
        email,
        number
    }

    dispatch({type:"ADD_CONTACT",payload:data});
    navigate("/");
    };

    

    return (
        <div className="container">
            <div className="row">
                <h1 className="display-3  text-center ">
                    Add Student
                </h1>
                <div className="col-md-6 shadow mx-auto p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group py-2">
                            <input type="text" placeholder="Name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group py-2">
                            <input type="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group py-2">
                            <input type="nubmer" placeholder="phone number" className="form-control" value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className="form-group py-4">
                            <input type="submit" value="Add Student" className="btn btn-block btn-dark" />
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Add
