import prisma from "@/db/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    return prisma.user
      .findUnique({
        where: { id: id },
      })
      .then((user) => {
        if (!user) {
          return new Response("User not found", { status: 404 });
        }
        return new Response(JSON.stringify(user), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
