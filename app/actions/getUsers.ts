import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    console.log("User Not Found");
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        NOT: { email: session.user.email },
      },
    });
    return users;
  } catch (e: any) {
    console.log("error");
    return [];
  }
};
export default getUsers;
