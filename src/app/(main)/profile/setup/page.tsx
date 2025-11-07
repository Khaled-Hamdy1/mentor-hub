"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useEffectEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  type CreateProfileForm,
  CreateProfileSchema,
} from "@/app/api/user/schema";
import { useSession } from "@/hooks/useSession";
import Form from "./components/form";
import Skeleton from "./components/skeleton";
import UserNotFound from "./components/user-not-found";

export default function CreateProfile() {
  const { data: session, isLoading, error } = useSession();
  const methods = useForm<CreateProfileForm>({
    resolver: zodResolver(CreateProfileSchema),
  });

  console.log("Session data:", session);
  console.log("Session Error:", error);

  // const insertValues = useEffectEvent(() => {
  //   if (session?.user) {
  //     methods.setValue("name", session?.user.name || "");
  //     methods.setValue("avatarLink", session?.user.image || "");
  //     methods.setValue("avatarFile", null);
  //     methods.setValue("userId", session?.user?.id || "");
  //   }
  // });

  useEffect(() => {
    if (session?.user) {
      methods.setValue("name", session?.user.name || "");
      methods.setValue("avatarLink", session?.user.image || "");
      methods.setValue("avatarFile", null);
      methods.setValue("userId", session?.user?.id || "");
    }
  }, [session]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!session?.user || error) {
    return <UserNotFound />;
  }

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
