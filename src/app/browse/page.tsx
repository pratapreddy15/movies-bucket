import { useRouter } from "next/navigation";

import ReleaseDateFilter from "@/components/release-date-filter/ReleaseDateFilter";

export default async function BrowsePage() {
  return (
    <div style={{ textAlign: "center", fontSize: "1.2rem", width: "80%", margin: "auto" }}>
      <p style={{ margin: "15px 0" }}>Use filters to browse the movies of your choice.</p>
      <p style={{ margin: "15px 0" }}>Due to the limitation of the underlying api, please provide the release date range.</p>
      <ReleaseDateFilter />
    </div>
  );
}
