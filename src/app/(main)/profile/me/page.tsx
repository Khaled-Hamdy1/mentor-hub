import type { User } from "@prisma/client";
import { getUser } from "@/services/user";
import AboutMe from "./components/AboutMe";
import ProfileSidebar from "./components/ProfileSidebar";
import Reviews from "./components/Reviews";
import Skills from "./components/Skills";

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex gap-1 bg-light">
      <ProfileSidebar user={user as User} />
      <div className="min-h-screen bg-white rounded-2xl m-3">
        <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* About Me Section */}
          <AboutMe bio={user?.about || ""} />
          {/* Skills Section */}
          <Skills skills={user?.skills?.split(",") || []} />
          {/* Reviews Section */}
          <Reviews />
        </main>
      </div>
    </main>
  );
}
