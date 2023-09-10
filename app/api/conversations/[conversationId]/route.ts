import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = await params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("UnAuthorized", { status: 401 });
    const existingConversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: { users: true },
    });
    if (!existingConversations)
      return new NextResponse("Invalid conversation ID", { status: 400 });
    const deletedConversations = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: { hasSome: [currentUser.id] },
      },
    });
    existingConversations.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversations
        );
      }
    });
    return NextResponse.json(deletedConversations);
  } catch (e: any) {
    console.log(e, "ERROR from /delete");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
