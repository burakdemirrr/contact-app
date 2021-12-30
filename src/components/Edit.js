import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Edit = () => {
    const {id} =useParams(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

   
    const contacts=useSelector(state=>state);

    const currentContact=contacts.find(contact=>contact.id===parseInt(id));

    useEffect(()=>{
            if(currentContact){
                setName(currentContact.name);
                setEmail(currentContact.email);
                setNumber(currentContact.number);
            }
        
        },[currentContact])

        const handleSubmit = (e) => {
            e.preventDefault();
    
            const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
    
           
            const checkNumber = contacts.find(contact =>contact.id !== parseInt(id) && contact.number ===  parseInt(number));
    
    
           
          
    
        const data={
            id:parseInt(id),
            name,
            email,
            number
        }
    
        dispatch({type:"UPDATE_CONTACT",payload:data}); 
        toast.success("Student updated succesfully.")
        navigate("/");
        };
    

    return (
        <div className="container ">
            {currentContact ? 
            <>
            <div className="row">
                <h1 className="display-3 my-5 text-center ">
                    Edit Student {id}
            </h1>
                    <div className="col-md-6 shadow mx-auto p-4">
                        <form onSubmit={handleSubmit }>
                            <div className="form-group py-2">
                                <input type="text" placeholder="Name" className="form-control" value={name} 
                                onChange={e=>setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-2">
                                <input type="email" placeholder="Email" className="form-control" value={email} 
                                onChange={e=>setEmail(e.target.value)} />
                            </div>
                            <div className="form-group py-2">
                                <input type="nubmer" placeholder="phone number" className="form-control" 
                                    value={number} 
                                    onChange={e=>setNumber(e.target.value)}
                                />
                            </div>
                            <div className="form-group py-4">
                                <input type="submit" value="Update Student"  className="btn  btn-dark"/>
                                <Link to="/" className="btn btn-danger mx-3">Cancel</Link>
                                
                            </div> 
                        </form>
                    </div>

               
            </div>
            </>
            :<h1 className='display-3 my-5 text-center'>Student Contact id 
              {id} not exists.
            </h1>
        }
            
        </div>
    )
}

export default Edit
