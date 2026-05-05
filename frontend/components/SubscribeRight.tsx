"use client";

import { createSubscriptionSession } from "@/lib/api/subscriptions";
import type { Subscriptions } from "@/types/types";

export default function SubscribeRight() {
  const handleSubscribe = async (tier: Subscriptions) => {
    await createSubscriptionSession(tier);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 items-center py-6 gap-8">
      <h1 className="font-black text-black text-4xl place-self-start ml-10">
        Plan options
      </h1>
      <div className="bg-none outline-2 outline-gray-600 rounded-xl w-[80%] shadow-gray-600 shadow-md p-4 cursor-default transition duration-100 inset-shadow-sm hover:inset-shadow-blue-500 hover:scale-101">
        <div className=" flex flex-row justify-between">
          <h1 className="font-black text-2xl">Free</h1>
          <h1 className="font-black text-2xl">0$/month</h1>
        </div>

        <div className="flex flex-row justify-between items-end">
          <ul className="text-sm">
            <li>
              {" "}
              <span>✔️</span> Order mealkit items
            </li>

            <li>
              {" "}
              <span>✔️</span> Browse Recipes
            </li>

            <li>
              {" "}
              <span>✖️</span> Access to Premium Recipes
            </li>

            <li>
              {" "}
              <span>✖️</span> Discounts for orders
            </li>

            <li>
              {" "}
              <span>✖️</span> Free deliveries
            </li>

            <li>
              {" "}
              <span>✖️</span> Weekly coupons
            </li>
          </ul>

          <button className="bg-blue-500 text-white h-10 w-29 flex items-center justify-center rounded-lg shadow-md transition duration-100 hover:bg-blue-800 hover:scale-105 ">
            You`&lsquo;`re here
          </button>
        </div>
      </div>

      <div className="bg-none outline-2 outline-gray-600 rounded-xl w-[80%] shadow-gray-600 shadow-md p-4 cursor-default transition duration-100 inset-shadow-sm hover:inset-shadow-green-700 hover:scale-101">
        <div className=" flex flex-row justify-between">
          <h1 className="font-black text-2xl">Premium</h1>
          <h1 className="font-black text-2xl">10$/month</h1>
        </div>

        <div className="flex flex-row justify-between items-end">
          <ul className="text-sm">
            <li>
              {" "}
              <span>✔️</span> Order mealkit items
            </li>

            <li>
              {" "}
              <span>✔️</span> Browse Recipes
            </li>

            <li>
              {" "}
              <span>✔️</span> Access to Premium Recipes
            </li>

            <li>
              {" "}
              <span>✔️</span> 10% discount for orders
            </li>

            <li>
              {" "}
              <span>✖️</span> Free deliveries
            </li>

            <li>
              {" "}
              <span>✖️</span> Weekly coupons
            </li>
          </ul>

          <button
            onClick={() => handleSubscribe("premium")}
            className="bg-green-600 text-white h-10 w-29 flex items-center justify-center rounded-lg shadow-md transition duration-100 hover:bg-green-800 "
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-none outline-2 outline-gray-600 rounded-xl w-[80%] shadow-gray-600 shadow-md p-4 cursor-default transition duration-100 inset-shadow-sm hover:inset-shadow-orange-800 hover:scale-101">
        <div className=" flex flex-row justify-between">
          <h1 className="font-black text-2xl">Deluxe</h1>
          <h1 className="font-black text-2xl">20$/month</h1>
        </div>

        <div className="flex flex-row justify-between items-end">
          <ul className="text-sm">
            <li>
              {" "}
              <span>✔️</span> Order mealkit items
            </li>

            <li>
              {" "}
              <span>✔️</span> Browse Recipes
            </li>

            <li>
              {" "}
              <span>✔️</span> Access to Premium Recipes
            </li>

            <li>
              {" "}
              <span>✔️</span> 20% discount for orders
            </li>

            <li>
              {" "}
              <span>✔️</span> Free deliveries
            </li>

            <li>
              {" "}
              <span>✔️</span> Weekly coupons
            </li>
          </ul>

          <button
            onClick={() => handleSubscribe("deluxe")}
            className="bg-orange-600 text-white h-10 w-29 flex items-center justify-center rounded-lg shadow-md transition duration-100 hover:bg-orange-800 "
          >
            Subscribe
          </button>
        </div>
      </div>
      <p className="text-gray-400">
        You will be charged monthly upon the date that you originally
        subscribed.
      </p>
    </div>
  );
}
