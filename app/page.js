import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Items from "@/components/Items";

export default async function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Cart />
      <Items />
    </>
  );
}
