"use client";

import MealkitList from "@/components/MealkitList";
import WeeksGrid from "@/components/WeeksGrid";
import { useEffect, useState } from "react";
import { getWeekYear } from "@/utils/dates";

export default function Dashboard() {
  const [week, setWeek] = useState<number>(0);

  useEffect(() => {
    async function getInitialDate() {
      const weekData = await getWeekYear();
      setWeek(weekData.week);
    }

    getInitialDate();
  }, []);

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

      <WeeksGrid week={week} setWeek={setWeek} />
      <MealkitList week={week} />
    </div>
  );
}
