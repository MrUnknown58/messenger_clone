import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await request.json();
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("UnAuthorized", { status: 401 });
    const updatesUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: name,
        image: image,
      },
    });
    return NextResponse.json(updatesUser);
  } catch (e: any) {
    console.log("ERROR FROM SETTINGS", e);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
