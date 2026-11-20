import { ProductCard } from "@/components/productCard";

export default function Home() {
  return (
    <div className="w-[750px] h-[750px] bg-pink-600">
      <div className="w-[650px] h-[650px] bg-yellow-500  flex items-center justify-center">
        <div className="w-[120px] h-[120px] bg-green-500"></div>
        <div className="w-[120px] h-[120px] bg-blue-500 fixed top-[10px] right-[5px]"></div>
        <div className="w-[120px] h-[120px] bg-red-500"></div>
        <div className="w-[120px] h-[120px] bg-purple-500"></div>
        <div className="w-[120px] h-[120px] bg-white "></div>
      </div>
    </div>
  );
}
