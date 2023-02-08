import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/navbar/Navbar";
import Table from "@/components/table/Table";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Marquis-Admin</title>
        <meta name="description" content="Marquis Admin Panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title={"Home"} />
      <div className="px-8 py-6">
        {/* <Table /> */}
      </div>
    </>
  );
}
