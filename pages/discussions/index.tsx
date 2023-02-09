import React from "react";
import Navbar from "@/components/navbar/Navbar";
import DiscussionTable from "@/components/table/DiscussionTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchDiscussions = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/discussion/getAllDiscussions"
    );
    return data.data;
  };
  useEffect(() => {
    fetchDiscussions()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          discussions: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Discussions"} />
      <div className="px-8 py-6">
        {state ? <DiscussionTable data={state["discussions"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
