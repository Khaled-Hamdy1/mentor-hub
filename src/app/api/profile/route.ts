import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { auth } from "@/lib/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary-config";
import { getAuth } from "@/services/auth";
import { formDataToObject, objectToFormData } from "@/utils/form-data-handler";
import type { CreateProfileForm } from "./schema";

export async function GET() {
  try {
    const user = await getAuth();
    if (!user)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(profile), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const formDataObj = formDataToObject(formData) as CreateProfileForm;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.id !== formDataObj.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    let avatarLink: string | null = formDataObj.avatarLink;
    const avatarFile = formData.get("avatarFile") as File | null;
    if (avatarFile) {
      const uploadResult = await uploadImageToCloudinary(
        avatarFile,
        formDataObj.userId,
      );
      avatarLink = uploadResult.url;
    }
    const { avatarFile: _, ...dataToSubmit } = formDataObj;
    console.log("Object", { ...dataToSubmit, avatarLink });

    // const profile = await prisma.user.update({
    //   where: { id: "USER_ID_FROM_AUTH" }, // عدلها حسب نظامك auth
    //   data: {
    //     name,
    //     bio,
    //     skills,
    //     avatar: avatarUrl,
    //   },
    // });

    return NextResponse.json("profile", { status: 201 });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}
