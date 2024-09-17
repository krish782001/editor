"use client";
import dynamic from "next/dynamic";
const App = dynamic(() => import("./editor/page"), {
  ssr: false,
});

export default App;
