import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, openAPI } from "better-auth/plugins";
import { redirect } from "next/navigation";
import prisma from "@/db/prisma";
import { emailTemplates } from "@/email-temps";
import { sendEmail } from "@/lib/send-email";
import { sendVerificationEmail } from "./auth-handler";

switch (true) {
  case !process.env.BASE_URL:
    throw new Error("BASE_URL is required");

  case !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET:
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required");

  case !process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET:
    throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are required");

  case !process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET:
    throw new Error(
      "LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET are required",
    );

  default:
    break;
}

export const auth = betterAuth({
  appName: "Mentor Hub",
  baseURL: process.env.BASE_URL,
  user: {
    additionalFields: {
      profileComplete: {
        type: "boolean",
        defaultValue: false,
      },
      streamRegistered: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      gender: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      },
      jobTitle: {
        type: "string",
        required: false,
      },
      dateOfBirth: {
        type: "date",
        required: false,
      },
      about: {
        type: "string",
        required: false,
      },
      skills: {
        type: "string",
        required: false,
      },
      availableForMentoring: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      mentoringRate: {
        type: "number",
        defaultValue: 0,
      },
      hourlyRate: {
        type: "number",
        defaultValue: 0,
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) =>
      sendVerificationEmail(user.email, url),
    sendOnSignUp: true,
    expiresIn: 3600, // 1 hour
    onEmailVerification: async (user) => {
      redirect(`/auth/create-profile/${user.id}`);
    },
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendEmail(
        emailTemplates.forgetPassword({
          to: user.email,
          code: url,
        }),
      );
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI(), admin(), nextCookies()],
  trustedOrigins: [`${process.env.BASE_URL}*`],
});
