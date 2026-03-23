import MealkitList from "@/components/MealkitList";

export default function Dashboard() {
  const now = Date();
  return (
    <div>
      <div>
        <h1 className="text-5xl font-semibold mt-2 place-self-center">
          Welcome!
        </h1>
        <h2 className="text-2xl font-semibold mt-2 place-self-center">
          See what&apos;s available on the menu
        </h2>
      </div>

      <div className="grid grid-cols-6 w-1/2 place-self-center mt-10 rounded-xl overflow-hidden border-2 border-black">
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          M
        </button>
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          T
        </button>
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          W
        </button>
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          T
        </button>
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          F
        </button>
        <button className="h-15 transition duration-100 hover:bg-black hover:text-white">
          S
        </button>
      </div>

      <MealkitList />
    </div>
  );
}
