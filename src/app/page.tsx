import ProductCard from "./cars/page";
import Hero from "./components/Hero";
import Recommended from "./recommended/page";


export default function Home() {
  return (
    <div className="bg-gray-200">
      <Hero />
      <ProductCard />
      <Recommended />
    </div>
  );
}
