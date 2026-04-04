import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Send, MessageCircle } from "lucide-react";

interface UserData {
  uid: string;
  displayName: string;
  email: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Timestamp | null;
}

interface ChatAreaProps {
  selectedUser: UserData | null;
}

const ChatArea = ({ selectedUser }: ChatAreaProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Generate a consistent chat ID for two users
  const getChatId = (uid1: string, uid2: string) => {
    return [uid1, uid2].sort().join("_");
  };

  useEffect(() => {
    if (!selectedUser || !user) return;

    const chatId = getChatId(user.uid, selectedUser.uid);
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const msgs: Message[] = [];
      snap.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    });

    return unsub;
  }, [selectedUser, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !user || sending) return;

    setSending(true);
    const chatId = getChatId(user.uid, selectedUser.uid);
    try {
      await addDoc(collection(db, "messages"), {
        chatId,
        senderId: user.uid,
        receiverId: selectedUser.uid,
        text: newMessage.trim(),
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: Timestamp | null) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-chat-bg">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-10 w-10 text-primary/40" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-foreground/60">Koola Chat</h2>
        <p className="mt-1 text-sm text-muted-foreground">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-3 bg-chat-header px-4 py-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 text-sm font-semibold text-chat-header-foreground">
          {selectedUser.displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-chat-header-foreground">{selectedUser.displayName}</p>
          <p className="text-xs text-chat-header-foreground/70">{selectedUser.email}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-chat-bg p-4">
        <div className="mx-auto max-w-3xl space-y-2">
          {messages.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No messages yet. Say hello! 👋
            </p>
          )}
          {messages.map((msg) => {
            const isSent = msg.senderId === user?.uid;
            return (
              <div key={msg.id} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    isSent
                      ? "rounded-br-md bg-chat-sent text-chat-sent-foreground"
                      : "rounded-bl-md bg-chat-received text-chat-received-foreground shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p
                    className={`mt-1 text-right text-[10px] ${
                      isSent ? "text-chat-sent-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border bg-card px-4 py-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full border border-input bg-secondary px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2 placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
