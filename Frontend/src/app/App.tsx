"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";


const App = () => {
  return (
    <>
      <h1 className="text-center text-lg">Hello, Welcome to the page</h1>
      <Image src={"/duck.jpg"} width={500} height={500} alt={"hiii"}></Image>
    </>
  );
};

export default App;
