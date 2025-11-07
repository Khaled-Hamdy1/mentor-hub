"use server";

import type { SocialLinks, User } from "@prisma/client";
import prisma from "@/db/prisma";
import { getAuth } from "./auth";

export const getAllUsers = async () => {
  return (await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as User[];
};

export const getUser = async (id?: string) => {
  const authanticated = await getAuth();

  if (!authanticated) throw new Error("Unauthorized");

  const userId = id || authanticated.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user as User;
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (data: Partial<User>) => {
  const user = await getAuth();

  if (!user) throw new Error("Unauthorized");
  if (!data) throw new Error("No data provided");

  await prisma.user.update({
    where: { id: user.id },
    data,
  });
};

export const getUserSocialLinks = async (userId: string) => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");

  if (!userId) throw new Error("No userId provided");

  const socialLinks = await prisma.socialLinks.findUnique({
    where: { userId },
  });

  return socialLinks;
};

export const updateUserSocialLinks = async (
  data: SocialLinks,
  userId: string,
) => {
  const user = await getAuth();

  if (!user) throw new Error("Unauthorized");
  if (!data) throw new Error("No data provided");

  await prisma.socialLinks.update({
    where: { userId },
    data,
  });
};
