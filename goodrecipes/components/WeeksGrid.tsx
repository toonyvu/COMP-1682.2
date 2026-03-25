"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getWeeks } from "@/utils/dates";
import type { DateInfo } from "@/types/types";

type Props = {
  week: number;
  setWeek: Dispatch<SetStateAction<number>>;
};

export default function WeeksGrid({ week, setWeek }: Props) {
  const [weeks, setWeeks] = useState<DateInfo[] | null>(null);

  useEffect(() => {
    const fetchWeeks = () => {
      const result = getWeeks(6);
      setWeeks(result);
    };

    fetchWeeks();
  }, []);

  return (
    <div className="grid grid-cols-6 w-[75%] place-self-center mt-10 rounded-xl overflow-hidden border-2 border-black">
      {weeks?.map((weekData) => (
        <button
          onClick={() => {
            setWeek(weekData.week);
          }}
          key={weekData.week}
          className={`h-15 transition duration-100 ${weekData.week === week ? "bg-black text-white" : "bg-white text-black"}`}
        >
          Week {weekData.week} <br /> {weekData.range}
        </button>
      ))}
    </div>
  );
}
