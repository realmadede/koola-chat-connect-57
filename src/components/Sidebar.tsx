import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Search, LogOut, MessageCircle } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

interface UserData {
  uid: string;
  displayName: string;
  email: string;
}

interface SidebarProps {
  selectedUser: UserData | null;
  onSelectUser: (user: UserData) => void;
}

const Sidebar = ({ selectedUser, onSelectUser }: SidebarProps) => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("displayName"));
    const unsub = onSnapshot(q, (snap) => {
      const list: UserData[] = [];
      snap.forEach((doc) => {
        const data = doc.data() as UserData;
        if (data.uid !== user?.uid) list.push(data);
      });
      setUsers(list);
    });
    return unsub;
  }, [user?.uid]);

  const filtered = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between bg-primary px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary-foreground" />
          <span className="text-lg font-bold text-primary-foreground">Koola Chat</span>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="rounded-full p-2 text-primary-foreground/80 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            No users found
          </p>
        )}
        {filtered.map((u) => (
          <button
            key={u.uid}
            onClick={() => onSelectUser(u)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-sidebar-hover ${
              selectedUser?.uid === u.uid ? "bg-sidebar-hover" : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {u.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{u.displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{u.email}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
