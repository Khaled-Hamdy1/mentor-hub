import { getAllProfiles } from "@/services/user";

export default async function Home() {
  const profiles = await getAllProfiles();
  console.log("profiles", profiles.length);
  return <div>Home</div>;
}
