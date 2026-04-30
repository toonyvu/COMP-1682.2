import ScrollItems from "./ScrollItems";

export default function SubscribeLeft() {
  return (
    <div className="flex-1 bg-green-600 min-w-0">
      <h1 className="text-white text-5xl font-extrabold mt-5 ml-4 mb-5">
        Subscribe for endless mealkit plannings.
      </h1>
      <h3 className="text-white text-xl ml-4 mb-5">
        Subscribe to one of these plans for free perks & more!
      </h3>

      <ScrollItems />
      <ScrollItems reverse />
      <ScrollItems />
    </div>
  );
}
