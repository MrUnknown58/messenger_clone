import getConversations from "../actions/getConversationList";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <ConversationList initialItems={conversations} users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}