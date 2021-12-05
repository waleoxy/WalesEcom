import Head from "next/head";
import Image from "next/image";
import Layouts from "../components/Layouts";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layouts>
      <div>
        <h1>Row of list of featured products slide</h1>
        <h1>Popular products grid</h1>
        <h1>Footer</h1>
      </div>
    </Layouts>
  );
}
