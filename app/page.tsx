"use client"
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import SearchBar from "./components/SearchBar";
import Products from "./components/Products";
export default function Home() {
  return (
    <>
    <Nav/>
    <SearchBar/>
    <Products/>
    </>
  );
}
