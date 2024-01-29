import { StaticTimezone } from "@/types/staticTimezone";
import { staticTimezones } from "@/constants/staticTimezones";

export function getStaticTimezones() {
  const timezones = staticTimezones.reduce((acc: string[], curr: StaticTimezone) => {
    acc.push(...curr.utc);
    return acc;
  }, []);
  return timezones;
}
