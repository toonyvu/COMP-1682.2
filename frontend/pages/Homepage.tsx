import Image from "next/image";
import homeImage from "../public/homeImage.jpg";

export default function Homepage() {
  return (
    <div>
      <section className="w-full h-175 bg-linear-to-br from-green-600 to-emerald-500 flex items-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Cooking made <span className="text-yellow-300">easy</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-green-50 max-w-xl">
              Discover simple, delicious recipes you can cook in under 30
              minutes. No stress. No complicated steps. Just great food.
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 rounded-xl bg-black text-white font-semibold shadow-lg hover:bg-white hover:text-black transition">
                See Plans
              </button>

              <button className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur text-white font-semibold border border-white/40 hover:bg-white hover:text-black transition">
                Browse Recipes
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-70 h-70 md:w-112.5 md:h-112.5">
              <Image
                src={homeImage}
                alt="Cook beautiful dishes with GoodRecipes"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-200 bg-white"></section>
    </div>
  );
}
