import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Table from "@/components/table/Table";
function index() {
  return (
    <>
      <Navbar title={"Home"} />
      <div className="px-8 py-6">
        {/* <Table /> */}
      </div>
    </>
  );
}

export default index;
