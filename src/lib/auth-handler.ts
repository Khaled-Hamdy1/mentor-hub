"use server";

import type { User } from "@prisma/client";
import { unknown } from "better-auth";
import { redirect } from "next/navigation";
import type { Login } from "@/app/auth/login/schema";
import type { Register } from "@/app/auth/register/schema";
import { emailTemplates } from "@/email-temps";
import { auth } from "./auth";
import { sendEmail } from "./send-email";

export const signUpEmail = async (data: Register) => {
  auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    },
  });
};

export const signInEmail = async (data: Login) => {
  auth.api.signInEmail({ body: { ...data } });
};

export const signOut = async () => {
  auth.api.signOut({ headers: {} });
};

const signInSocial = async (provider: "google" | "linkedin" | "github") => {
  const { url } = await auth.api.signInSocial({
    body: { callbackURL: `${process.env.BASE_URL}/profile/me`, provider },
  });
  if (!url) {
    throw new Error("No URL returned from signInSocial");
  }
  redirect(url);
};

export const signInGoogle = async () => {
  await signInSocial("google");
};

export const signInGithub = async () => {
  await signInSocial("github");
};

export const signInLinkedIn = async () => {
  await signInSocial("linkedin");
};

export const signInFn = async (data: Login) => {
  try {
    const response = (await auth.api.signInEmail({
      body: data,
    })) as unknown as {
      redirect: boolean;
      token: string;
      url: string | undefined;
      user: User;
    };
    if (response?.user.profileComplete) redirect("/profile/me");
    else redirect("/profile/setup");
  } catch (error) {
    console.log("error", error);
  }
};

export const sendVerificationEmail = async (email: string, url: string) => {
  await sendEmail(
    emailTemplates.emailVerification({
      to: email,
      code: url,
    }),
  );
};
