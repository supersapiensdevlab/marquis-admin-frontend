import React from "react";
import Navbar from "@/components/navbar/Navbar";
import DocumentTable from "@/components/table/DocumentTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchDocuments = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/document/getAllDocuments"
    );
    return data.data;
  };
  useEffect(() => {
    fetchDocuments()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          documents: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Documents"} />
      <div className="px-8 py-6">
        {state ? <DocumentTable data={state["documents"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
