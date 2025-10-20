import prisma from "@/db/prisma";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
): Promise<string> => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  // return conversation
  return "Loading... we are still developing this.";
};

export const findConversation = async (
  memberOneId: string,
  memberTwoId: string,
): Promise<string> => {
  try {
    // return await prisma.conversation.findFirst({
    //   where: {
    //     AND: [
    //       {
    //         memberOneId: memberOneId,
    //         memberTwoId: memberTwoId,
    //       },
    //     ],
    //   },
    //   include: {
    //     memberOne: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //     memberTwo: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //   },
    // })
  } catch {
    // return null
  }
  return "Loading... we are still developing this.";
};

export const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
): Promise<string> => {
  try {
    // return await prisma.conversation.create({
    //   data: {
    //     memberOneId: memberOneId,
    //     memberTwoId: memberTwoId,
    //   },
    //   include: {
    //     memberOne: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //     memberTwo: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //   },
    // })
  } catch {
    // return null
  }
  return "Loading... we are still developing this.";
};
