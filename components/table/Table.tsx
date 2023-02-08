import React, {useState} from "react";
import placeholder from "../../public/images/person-placeholder.webp"
import axios, {AxiosError} from "axios"
import { useDatabase } from "@/lib/DatabaseContext";

function Table({data}:{data:Array<any>}) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewUser, setAddNewUser] = useState<any | null>({
    name:"",
      email_id:"",
      contact:"",
      profile_image:"",
      flat_no:null,
      wing_id:"",
      floor:null,
      society_id:"",
      type:"",
  })
  const {name,
    email_id,
    contact,
    flat_no,
    wing_id,
    floor,
    society_id,
    type} = addNewUser;
  const fetchUsers = async () => {
    const data = await axios.get(
        'https://marquis-backend.onrender.com/user/getAllUsers'
    );
    return data.data
};
  const handleUserDelete = async (user_id : string) =>{
    if(user_id){
    const data = await axios.post(
      'https://marquis-backend.onrender.com/user/deleteUser', {
        user_id
      }
  ).then((response)=>{console.log(response);
    fetchUsers()
    .then((p) => setState((prevState : any) => ({
      ...prevState,
      users:p.data
    })))
    .catch((e: Error | AxiosError) => console.log(e));}
  );
    }
  }

  console.log(formData)

  const handleUserUpdateModal = async (value : any) =>{
    setFormData(value)
  }
  const handleUpdateUser = async() =>{
    if(formData){
      const data = await axios.post(
        'https://marquis-backend.onrender.com/user/updateUser', formData
    ).then((response)=>{console.log(response);
      fetchUsers()
      .then((p) => setState((prevState : any) => ({
        ...prevState,
        users:p.data
      })))
      .catch((e: Error | AxiosError) => console.log(e));}
    );
      }
  }

  const handleChange = (e : any)=>{
    const {name, value} = e.target;
    setAddNewUser((prev : any)=>{
      return{
      ...prev,
      [name]:value
      }
    })
  }

  const handleAddNewUser = async() =>{
    console.log(addNewUser)
    if(addNewUser){
      const data = await axios.post(
        'https://marquis-backend.onrender.com/user/addUser', addNewUser
    ).then((response)=>{console.log(response);
      fetchUsers()
      .then((p) => setState((prevState : any) => ({
        ...prevState,
        users:p.data
      })))
      .catch((e: Error | AxiosError) => console.log(e));}
    );
      }
  }

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
      <label htmlFor="adduser-modal" className="btn btn-primary">Add User</label>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Society Id</th>
            <th>Flat no. / Floor</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, key)=>{
            return(
              <tr key={key}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={placeholder.src}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{value.name}</div>
                  {/* <div className="text-sm opacity-50">United States</div> */}
                </div>
              </div>
            </td>
            <td>
            {value.society_id}
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>{value.wing} / {value.flat_no}</td>
            <td>{value.contact}</td>
            <td className="flex space-x-1">
              <button className="btn btn-error btn-xs" onClick={()=>{handleUserDelete(value.user_id)}}>Delete</button>
              <label htmlFor="edit-modal" className="btn btn-info btn-xs" onClick={()=>{handleUserUpdateModal(value)}}>Edit</label>
            </td>
          </tr>
            )
          })}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
      <div>
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="edit-modal" className="btn btn-sm btn-circle bg-primary absolute right-6 top-4">✕</label>
    <h3 className="font-bold text-lg">Update User</h3>
    <hr className="my-2"/>
    {formData ? 
    <form method="POST">
      <div className="flex flex-col space-y-2 justify-center mt-4">
      <div className="flex space-x-2"><p className="w-1/5">Name</p><input type="textarea" value={formData.name} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          name:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Email</p><input type="textarea" value={formData.email_id} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          email_id:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Contact</p><input type="textarea" value={formData.contact} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          contact:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Flat no.</p><input type="textarea" value={formData.flat_no} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          flat_no:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Wing Id</p><input type="textarea" value={formData.wing_id} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          wing_id:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Floor</p><input type="textarea" value={formData.floor} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          floor:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Society Id</p><input type="textarea" value={formData.society_id} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          society_id:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Address</p><input type="textarea" value={formData.address} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          address:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Type</p><input type="textarea" value={formData.type} onChange={(e)=>{
        setFormData((prevState : any) => ({
          ...prevState,
          type:e.target.value
        }))
      }} className="h-5 w-full border border-black p-4 rounded-sm" ></input></div>
      <button onClick={(e)=>{e.preventDefault();handleUpdateUser()}} className="btn btn-primary">Save changes</button>
      </div>
    </form>:<></>
}
  </div>
</div>
</div>
<div>
<input type="checkbox" id="adduser-modal" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="adduser-modal" className="btn btn-sm btn-circle bg-primary absolute right-6 top-4">✕</label>
    <h3 className="font-bold text-lg">Add New User</h3>
    <hr className="my-2"/>
    <form method="POST">
      <div className="flex flex-col space-y-2 justify-center mt-4">
      <div className="flex space-x-2"><p className="w-1/5">Name</p><input type="textarea" value={name} name="name" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Email</p><input type="textarea" value={email_id} name="email_id" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Contact</p><input type="textarea" value={contact} name="contact" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Flat no.</p><input type="textarea" value={flat_no} name="flat_no" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Floor.</p><input type="textarea" value={floor} name="floor" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Wing Id</p><input type="textarea" value={wing_id} name="wing_id" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Type</p><input type="textarea" value={type} name="type" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <div className="flex space-x-2"><p className="w-1/5">Society Id</p><input type="textarea" value={society_id} name="society_id" onChange={(e)=>{handleChange(e)}} className="h-5 w-full border border-black p-4 rounded-sm"></input></div>
      <button onClick={(e)=>{e.preventDefault();handleAddNewUser()}} className="btn btn-primary">Add</button>
      </div>
    </form>
  </div>
</div>
</div>
    </div>
  );
}

export default Table;
