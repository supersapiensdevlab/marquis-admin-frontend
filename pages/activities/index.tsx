import React from "react";
import Navbar from "@/components/navbar/Navbar";
import ActivityTable from "@/components/table/ActivityTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios,{AxiosError} from "axios"

function Index() {
  const { state, setState } = useDatabase();
  const fetchActivities = async () => {
    const data = await axios.get(
        'https://marquis-backend.onrender.com/activity/getAllActivities'
    );
    return data.data
};
  useEffect(()=>{
    fetchActivities()
    .then((p) => setState((prevState : any) => ({
      ...prevState,
      activities:p.data
    })))
    .catch((e: Error | AxiosError) => console.log(e));
  },[])
  return (
    <>
      <Navbar title={"Activity"} />
      <div className="px-8 py-6">
        {state ? 
          <ActivityTable data={state["activities"]}/>:<></>
        }       
      </div>
    </>
  );
}

export default Index;
