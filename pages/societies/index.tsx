import React from "react";
import Navbar from "@/components/navbar/Navbar";
import SocietyTable from "@/components/table/SocietyTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios,{AxiosError} from "axios"

function Index() {
  const { state, setState } = useDatabase();
  const fetchSocieties = async () => {
    const data = await axios.get(
        'https://marquis-backend.onrender.com/society/getAllSocieties'
    );
    return data.data
};
  useEffect(()=>{
    fetchSocieties()
    .then((p) => setState((prevState : any) => ({
      ...prevState,
      societies:p.data
    })))
    .catch((e: Error | AxiosError) => console.log(e));
  },[])
  return (
    <>
      <Navbar title={"Society"} />
      <div className="px-8 py-6">
        {state ? 
          <SocietyTable data={state["societies"]}/>:<></>
        }       
      </div>
    </>
  );
}

export default Index;
