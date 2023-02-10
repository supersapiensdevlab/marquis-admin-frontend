import React from "react";
import Navbar from "@/components/navbar/Navbar";
import InviteTable from "@/components/table/InviteTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchInvites = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/invite/getAllInvites"
    );
    return data.data;
  };
  useEffect(() => {
    fetchInvites()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          invites: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Invites"} />
      <div className="px-8 py-6">
        {state ? <InviteTable data={state["invites"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
