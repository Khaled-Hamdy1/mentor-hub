import type { User } from "@prisma/client";
import { PROFILE } from "@/constants/images";
import { getUserSocialLinks } from "@/services/user";
import ContactInfo from "./ContactInfo";
import MentorshipStats from "./MentorshipStats";
import ProfessionalLinks from "./ProfessionalLinks";
import ProfileInfo from "./ProfileInfo";
import SocialLinks from "./SocialLinks";

type UserSidebarProps = {
  user: User;
};

export default async function ProfileSidebar({ user }: UserSidebarProps) {
  const socialLinks = await getUserSocialLinks(user.id);

  return (
    <aside className="m-3 w-full md:w-1/4 max-w-sm bg-white md:p-8 lg:p-10 rounded-2xl">
      <div className="flex flex-col items-center">
        {/* Profile Section */}
        <ProfileInfo
          name={user.name || "User"}
          title={user.jobTitle || "Mentor"}
          id={user.id}
          rating={4.8}
          userImage={user.image || PROFILE}
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* About Section */}
        <ContactInfo
          phone={user.phone || "+1 (555) 123-4567"}
          email={user?.email || "mentor@example.com"}
          address={user.location || "123 Main St, New York, NY"}
          dateOfBirth={
            user.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Jan 1, 1990"
          }
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Mentorship Sessions Section */}
        <MentorshipStats userId={user.id} />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Professional Links Section */}
        <ProfessionalLinks
          links={{
            linkedin: socialLinks?.linkedin || "https://linkedin.com/in/mentor",
            github: socialLinks?.github || "https://github.com/mentor",
            behance: socialLinks?.behance || "https://behance.net/mentor",
            dribbble: socialLinks?.dribbble || "https://dribbble.com/mentor",
          }}
        />

        <hr className="my-6 border-gray-300 w-full" />

        {/* Social Links Section */}
        <SocialLinks
          links={{
            facebook: socialLinks?.facebook || "https://facebook.com/mentor",
            instagram: socialLinks?.instagram || "https://instagram.com/mentor",
            telegram: socialLinks?.telegram || "https://t.me/mentor",
            whatsapp: socialLinks?.whatsapp || "https://wa.me/1234567890",
          }}
        />
      </div>
    </aside>
  );
}
