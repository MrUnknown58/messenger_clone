import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherClient, pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("UnAuthorized", { status: 401 });

    //Find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Invalid conversation ID", { status: 400 });
    }

    //Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    // console.log("LOGGING LAST_MESSAGE: ", lastMessage);
    if (!lastMessage) return NextResponse.json(conversation);

    //Update seen of Last Message

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // Update all connections with new seen
    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    // If user has already seen the message, no need to go further
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    // Update last message seen
    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    // console.log("LOGGING UPDATED_MESSAGE: ", updatedMessage);

    // return NextResponse.json(updatedMessage);
    return new NextResponse("Success");
  } catch (e: any) {
    console.log(e, "ERROR MESSAGE FROM /seen");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
