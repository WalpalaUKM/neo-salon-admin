import { ProductCard } from "@/components/productCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50/70 p-6 sm:p-10 md:p-16 dark:bg-zinc-950 flex flex-col items-center justify-center">
      <div className="mb-12 text-center max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Curated Catalog
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Featured Devices
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Clean, creative, and elegant product cards crafted with precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
        <ProductCard
          title="iPhone 15 Pro"
          tagline="Titanium body with A17 Pro chip."
          category="Apple"
          price={999.99}
          originalPrice={1299.99}
          imageSrc="/images/iphone.png"
          specs={["A17 Pro", "48MP Main", "Type-C"]}
          inStock={true}
        />

        <ProductCard
          title="Samsung Galaxy S24"
          tagline="Galaxy AI with Dynamic AMOLED 2X."
          category="Samsung"
          price={899.99}
          originalPrice={1049.99}
          imageSrc="/images/iphone.png"
          specs={["Snapdragon 8 Gen 3", "50MP", "Galaxy AI"]}
          inStock={true}
          colors={[
            { name: "Onyx Black", color: "#232323" },
            { name: "Marble Gray", color: "#cfd0d2" },
            { name: "Cobalt Violet", color: "#48435c" },
            { name: "Amber Yellow", color: "#e8dcbe" },
          ]}
        />

        <ProductCard
          title="Xiaomi 14 Ultra"
          tagline="Leica Quad Camera with Variable Aperture."
          category="Xiaomi"
          price={1199.99}
          originalPrice={1399.99}
          imageSrc="/images/iphone.png"
          specs={["Leica Optics", "1-inch Sensor", "120W Charge"]}
          inStock={false}
          colors={[
            { name: "Titanium Gray", color: "#787676" },
            { name: "Black Vegan Leather", color: "#1a1a1a" },
            { name: "White Ceramic", color: "#f7f7f7" },
          ]}
        />
      </div>
    </main>
  );
}
