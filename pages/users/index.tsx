import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Table from "@/components/table/Table";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios,{AxiosError} from "axios"

function index() {
  const { state, setState } = useDatabase();
  const fetchUsers = async () => {
    const data = await axios.get(
        'https://marquis-backend.onrender.com/user/getAllUsers'
    );
    return data.data
};
  useEffect(()=>{
    fetchUsers()
    .then((p) => setState((prevState : any) => ({
      ...prevState,
      users:p.data
    })))
    .catch((e: Error | AxiosError) => console.log(e));
  },[])
  return (
    <>
      <Navbar title={"Users"} />
      <div className="px-8 py-6">
        {state ? 
          <Table data={state["users"]}/>:<></>
        }       
      </div>
    </>
  );
}

export default index;
