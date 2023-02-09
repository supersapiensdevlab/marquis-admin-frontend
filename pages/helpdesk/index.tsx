import React from "react";
import Navbar from "@/components/navbar/Navbar";
import HelpDeskTable from "@/components/table/HelpDeskTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchHelpDeskQuesries = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/helpdesk//getAllHelpDeskQueries"
    );
    return data.data;
  };
  useEffect(() => {
    fetchHelpDeskQuesries()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          helpdesk: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Helpdesk  Queries"} />
      <div className="px-8 py-6">
        {state ? <HelpDeskTable data={state["helpdesk"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
