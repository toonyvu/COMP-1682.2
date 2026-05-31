"use client";

import MealkitList from "@/components/[mealkits]/MealkitList";
import WeeksGrid from "@/components/[mealkits]/WeeksGrid";
import { useEffect, useState } from "react";
import { getWeekYear } from "@/utils/dates";
import { useUserStore } from "@/stores/userStore";

export default function Dashboard() {
  const [week, setWeek] = useState<number>(0);
  const user = useUserStore((state) => state.user);

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
        <h1 className="text-5xl font-semibold mt-8 place-self-center">
          Welcome, {user?.username}!
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
