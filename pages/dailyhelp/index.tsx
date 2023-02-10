import React from "react";
import Navbar from "@/components/navbar/Navbar";
import DailyHelpTable from "@/components/table/DailyHelpTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchDailyHelps = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/dailyhelp/getAllDailyHelps"
    );
    return data.data;
  };
  useEffect(() => {
    fetchDailyHelps()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          dailyhelp: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Daily Help"} />
      <div className="px-8 py-6">
        {state ? <DailyHelpTable data={state["dailyhelp"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
