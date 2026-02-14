"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { RoomCard } from "@/components/RoomCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Toast } from "@/components/Toast";
import { StatsCard } from "@/components/StatsCard";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  name: string;
  host: string;
  participants: number;
  status: "active" | "paused" | "break";
  focusTime: number;
  streak: number;
  description: string;
  isJoined: boolean;
  createdAt: string;
}

const initialRooms: Room[] = [
  {
    id: "1",
    name: "Deep Focus Sanctuary",
    host: "Sarah Chen",
    participants: 8,
    status: "active",
    focusTime: 45,
    streak: 12,
    description: "A quiet space for developers and designers to tackle complex problems together. We maintain a strict no-distraction policy during focus blocks.",
    isJoined: false,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    name: "Morning Writers Guild",
    host: "Marcus Johnson",
    participants: 5,
    status: "active",
    focusTime: 25,
    streak: 30,
    description: "Early risers crafting novels, blog posts, and technical documentation. Join us for structured writing sprints with optional sharing sessions.",
    isJoined: true,
    createdAt: "2024-03-14",
  },
  {
    id: "3",
    name: "Code & Coffee Collective",
    host: "Priya Patel",
    participants: 12,
    status: "break",
    focusTime: 50,
    streak: 5,
    description: "Remote developers gathering to ship features and review pull requests. We use the pomodoro technique with 10-minute social breaks between sessions.",
    isJoined: false,
    createdAt: "2024-03-13",
  },
  {
    id: "4",
    name: "Design Deep Dive",
    host: "Alex Rivera",
    participants: 6,
    status: "active",
    focusTime: 90,
    streak: 8,
    description: "UI/UX designers working on portfolio pieces and client projects. Camera optional but encouraged for accountability check-ins.",
    isJoined: false,
    createdAt: "2024-03-12",
  },
  {
    id: "5",
    name: "Thesis Writing Circle",
    host: "Dr. Emily Watson",
    participants: 4,
    status: "active",
    focusTime: 60,
    streak: 45,
    description: "PhD candidates supporting each other through dissertation chapters. Structured 50/10 splits with peer review opportunities.",
    isJoined: false,
    createdAt: "2024-03-11",
  },
  {
    id: "6",
    name: "Startup Sprint Room",
    host: "James Liu",
    participants: 15,
    status: "active",
    focusTime: 25,
    streak: 3,
    description: "Founders and indie hackers building in public. High energy environment for rapid prototyping and customer validation.",
    isJoined: true,
    createdAt: "2024-03-10",
  },
  {
    id: "7",
    name: "Language Learning Lab",
    host: "Sofia Garcia",
    participants: 7,
    status: "paused",
    focusTime: 30,
    streak: 20,
    description: "Polyglots practicing immersion techniques and vocabulary drills. Native speakers welcome to join and help others progress.",
    isJoined: false,
    createdAt: "2024-03-09",
  },
  {
    id: "8",
    name: "Financial Modeling Focus",
    host: "Robert Chen",
    participants: 3,
    status: "active",
    focusTime: 120,
    streak: 60,
    description: "Analysts and accountants working on complex spreadsheets and forecasts. Quiet environment with minimal chatter preferred.",
    isJoined: false,
    createdAt: "2024-03-08",
  },
  {
    id: "9",
    name: "Creative Coding Studio",
    host: "Zara Ahmed",
    participants: 9,
    status: "break",
    focusTime: 45,
    streak: 15,
    description: "Generative artists and creative technologists experimenting with shaders and algorithms. Show-and-tell at the end of each session.",
    isJoined: false,
    createdAt: "2024-03-07",
  },
  {
    id: "10",
    name: "Legal Brief Breakdown",
    host: "Amanda Scott",
    participants: 2,
    status: "active",
    focusTime: 55,
    streak: 25,
    description: "Attorneys drafting contracts and reviewing case law. Professional environment with strict confidentiality maintained.",
    isJoined: false,
    createdAt: "2024-03-06",
  },
  {
    id: "11",
    name: "Medical Study Group",
    host: "Dr. Kevin Park",
    participants: 6,
    status: "active",
    focusTime: 40,
    streak: 18,
    description: "Residents and medical students reviewing cases and research papers. Evidence-based discussion during breaks only.",
    isJoined: false,
    createdAt: "2024-03-05",
  },
  {
    id: "12",
    name: "Architecture Rendering Room",
    host: "Lisa Thompson",
    participants: 4,
    status: "active",
    focusTime: 75,
    streak: 9,
    description: "Architects working on 3D models and technical drawings. Software agnostic, all CAD platforms welcome for collaborative feedback.",
    isJoined: false,
    createdAt: "2024-03-04",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState("Alex Developer");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    focusTime: "25",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("bodydouble_rooms");
    const savedUser = localStorage.getItem("bodydouble_user");
    const savedDark = localStorage.getItem("bodydouble_darkmode");
    
    if (saved) {
      setRooms(JSON.parse(saved));
    } else {
      setRooms(initialRooms);
    }
    
    if (savedUser) setUserName(savedUser);
    if (savedDark) setDarkMode(JSON.parse(savedDark));
    
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      localStorage.setItem("bodydouble_rooms", JSON.stringify(rooms));
    }
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("bodydouble_user", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("bodydouble_darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  const filteredRooms = rooms.filter((room) => {
    const query = searchQuery.toLowerCase();
    return (
      room.name.toLowerCase().includes(query) ||
      room.host.toLowerCase().includes(query) ||
      room.description.toLowerCase().includes(query)
    );
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "participants") return b.participants - a.participants;
    if (sortBy === "streak") return b.streak - a.streak;
    return 0;
  });

  const handleJoinRoom = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, isJoined: true, participants: room.participants + 1 } : room
      )
    );
    setToast({ message: "Joined room successfully!", type: "success" });
  };

  const handleLeaveRoom = (id: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, isJoined: false, participants: room.participants - 1 } : room
      )
    );
    setToast({ message: "Left room", type: "info" });
  };

  const handleDeleteRoom = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setRooms((prev) => prev.filter((room) => room.id !== id));
      setDeletingId(null);
      setToast({ message: "Room deleted", type: "success" });
    }, 300);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Room name is required";
    else if (formData.name.length < 3) errors.name = "Name must be at least 3 characters";
    
    if (!formData.description.trim()) errors.description = "Description is required";
    else if (formData.description.length < 10) errors.description = "Description must be at least 10 characters";
    
    if (!formData.focusTime) errors.focusTime = "Focus time is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRoom: Room = {
      id: Date.now().toString(),
      name: formData.name,
      host: userName,
      participants: 1,
      status: "active",
      focusTime: parseInt(formData.focusTime),
      streak: 0,
      description: formData.description,
      isJoined: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRooms((prev) => [newRoom, ...prev]);
    setFormData({ name: "", description: "", focusTime: "25" });
    setToast({ message: "Room created successfully!", type: "success" });
  };

  const handleExportData = () => {
    const data = JSON.stringify(rooms, null, 2);
    navigator.clipboard.writeText(data);
    setToast({ message: "Data copied to clipboard!", type: "success" });
  };

  const totalRooms = rooms.length;
  const activeRooms = rooms.filter((r) => r.status === "active").length;
  const totalParticipants = rooms.reduce((acc, r) => acc + r.participants, 0);
  const avgStreak = Math.round(rooms.reduce((acc, r) => acc + r.streak, 0) / (rooms.length || 1));

  return (
    <div className={cn("min-h-screen", darkMode ? "bg-[#0a0a0a]" : "bg-gray-100")}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-8 fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-white font-semibold mb-2">Find Your Focus</h1>
                <p className="text-white/50">Join synchronized pomodoro rooms or create your own</p>
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#141414] border border-white/[0.08] rounded-full px-4 py-2 pl-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#a78bfa]/50 w-64"
                  />
                  <svg className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#141414] border border-white/[0.08] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a78bfa]/50"
                >
                  <option value="date">Sort by Date</option>
                  <option value="participants">Sort by Participants</option>
                  <option value="streak">Sort by Streak</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : sortedRooms.length === 0 ? (
              <div className="text-center py-20 bg-[#141414] rounded-[20px] border border-white/[0.08]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No rooms found</h3>
                <p className="text-white/50 mb-6">Create your first room to get started</p>
                <button
                  onClick={() => document.getElementById("create-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-gray-200 btn-press"
                >
                  Create Your First Room
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRooms.map((room, index) => (
                  <div key={room.id} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in-up">
                    <RoomCard
                      room={room}
                      onJoin={handleJoinRoom}
                      onLeave={handleLeaveRoom}
                      onDelete={handleDeleteRoom}
                      deletingId={deletingId}
                    />
                  </div>
                ))}
              </div>
            )}

            <div id="create-form" className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-8 mt-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Create New Room</h2>
              <form onSubmit={handleCreateRoom} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Room Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Deep Focus Sanctuary"
                      className={cn(
                        "w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#a78bfa]",
                        formErrors.name ? "border-red-500" : "border-white/[0.08]"
                      )}
                    />
                    {formErrors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Focus Duration (minutes)</label>
                    <select
                      value={formData.focusTime}
                      onChange={(e) => setFormData({ ...formData, focusTime: e.target.value })}
                      className={cn(
                        "w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a78bfa]",
                        formErrors.focusTime ? "border-red-500" : "border-white/[0.08]"
                      )}
                    >
                      <option value="25">25 minutes (Pomodoro)</option>
                      <option value="45">45 minutes (Deep Work)</option>
                      <option value="60">60 minutes (Extended)</option>
                      <option value="90">90 minutes (Marathon)</option>
                    </select>
                    {formErrors.focusTime && <p className="mt-2 text-sm text-red-400">{formErrors.focusTime}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the purpose and rules of your room..."
                    rows={3}
                    className={cn(
                      "w-full bg-[#0a0a0a] border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#a78bfa] resize-none",
                      formErrors.description ? "border-red-500" : "border-white/[0.08]"
                    )}
                  />
                  {formErrors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formErrors.description}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 btn-press transition-colors"
                  >
                    Create Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-8 fade-in-up">
            <div className="mb-8">
              <h1 className="text-white font-semibold mb-2">Dashboard</h1>
              <p className="text-white/50">Track your productivity and room statistics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Rooms"
                value={totalRooms}
                subtitle="Across all categories"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                trend="up"
                trendValue="+12%"
              />
              <StatsCard
                title="Active Now"
                value={activeRooms}
                subtitle="Currently focusing"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                trend="up"
                trendValue="+5"
              />
              <StatsCard
                title="Total Participants"
                value={totalParticipants}
                subtitle="Coworking today"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                trend="neutral"
                trendValue="0%"
              />
              <StatsCard
                title="Avg. Streak"
                value={`${avgStreak} days`}
                subtitle="Community average"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>}
                trend="up"
                trendValue="+2 days"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Room Status Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white/70">Active</span>
                    </div>
                    <span className="text-white font-medium">{rooms.filter(r => r.status === "active").length}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(rooms.filter(r => r.status === "active").length / (totalRooms || 1)) * 100}%` }} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-white/70">On Break</span>
                    </div>
                    <span className="text-white font-medium">{rooms.filter(r => r.status === "break").length}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(rooms.filter(r => r.status === "break").length / (totalRooms || 1)) * 100}%` }} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-white/70">Paused</span>
                    </div>
                    <span className="text-white font-medium">{rooms.filter(r => r.status === "paused").length}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(rooms.filter(r => r.status === "paused").length / (totalRooms || 1)) * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Focus Leaderboard</h3>
                <div className="space-y-3">
                  {rooms
                    .sort((a, b) => b.streak - a.streak)
                    .slice(0, 5)
                    .map((room, idx) => (
                      <div key={room.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            idx === 0 ? "bg-yellow-500/20 text-yellow-500" : 
                            idx === 1 ? "bg-gray-400/20 text-gray-400" : 
                            idx === 2 ? "bg-orange-700/20 text-orange-700" : "text-white/30"
                          )}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{room.host}</p>
                            <p className="text-white/40 text-xs">{room.name}</p>
                          </div>
                        </div>
                        <div className="text-[#a78bfa] font-semibold text-sm">{room.streak} days</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-8 fade-in-up">
            <div className="text-center mb-8">
              <h1 className="text-white font-semibold mb-2">Settings</h1>
              <p className="text-white/50">Manage your account and preferences</p>
            </div>

            <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Display Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a78bfa]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-8">
                <h3 className="text-lg font-semibold text-white mb-6">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-white/50 text-sm">Toggle between dark and light themes</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(
                      "w-14 h-7 rounded-full transition-colors relative",
                      darkMode ? "bg-[#a78bfa]" : "bg-white/20"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full bg-white absolute top-1 transition-transform",
                      darkMode ? "left-8" : "left-1"
                    )} />
                  </button>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-8">
                <h3 className="text-lg font-semibold text-white mb-6">Data</h3>
                <button
                  onClick={handleExportData}
                  className="w-full py-3 border border-white/[0.08] rounded-xl text-white font-medium hover:bg-white/5 btn-press transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Data to JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}