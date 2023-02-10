import React from "react";
import Navbar from "@/components/navbar/Navbar";
import AmenityTable from "@/components/table/AmenityTable";
import { useDatabase } from "@/lib/DatabaseContext";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Index() {
  const { state, setState } = useDatabase();
  const fetchAmenities = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/amenity/getAllAmenities"
    );
    return data.data;
  };
  useEffect(() => {
    fetchAmenities()
      .then((p) =>
        setState((prevState: any) => ({
          ...prevState,
          amenities: p.data,
        }))
      )
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);
  return (
    <>
      <Navbar title={"Amenity"} />
      <div className="px-8 py-6">
        {state ? <AmenityTable data={state["amenities"]} /> : <></>}
      </div>
    </>
  );
}

export default Index;
