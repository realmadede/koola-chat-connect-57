import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { useEffect } from "react";

interface UserData {
  uid: string;
  displayName: string;
  email: string;
}

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-chat-bg">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSelectUser = (u: UserData) => {
    setSelectedUser(u);
    // On mobile, hide sidebar when user is selected
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-chat-bg">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } w-full flex-col md:flex md:w-[350px] md:min-w-[300px]`}
      >
        <Sidebar selectedUser={selectedUser} onSelectUser={handleSelectUser} />
      </div>

      {/* Chat area */}
      <div
        className={`${
          !showSidebar || selectedUser ? "flex" : "hidden"
        } flex-1 flex-col md:flex`}
      >
        {/* Mobile back button */}
        {!showSidebar && selectedUser && (
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 bg-chat-header px-3 py-2 text-sm text-chat-header-foreground md:hidden"
          >
            ← Back
          </button>
        )}
        <ChatArea selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
