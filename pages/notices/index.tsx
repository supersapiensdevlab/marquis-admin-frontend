import React from "react";
import Navbar from "@/components/navbar/Navbar";
import NoticeTable from "@/components/table/NoticeTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchNotices = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/notice/getAllNotices"
    );
    return data.data;
  };
  useEffect(() => {
    fetchNotices()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          notices: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Notices"} />
      <div className="px-8 py-6">
        {state ? <NoticeTable data={state["notices"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
