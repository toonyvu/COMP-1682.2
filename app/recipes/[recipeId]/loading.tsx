import loading from "@/public/loading.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src={loading}
        height={80}
        width={80}
        alt={"Loading"}
        className="animate-spin"
      ></Image>

      <h1 className="mt-5">Fetching Recipe...</h1>
    </div>
  );
}
