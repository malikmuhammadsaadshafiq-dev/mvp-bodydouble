"use client";

import { useState } from "react";
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
  isJoined?: boolean;
}

interface RoomCardProps {
  room: Room;
  onJoin: (id: string) => void;
  onLeave: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export function RoomCard({ room, onJoin, onLeave, onDelete, deletingId }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    break: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <div
      className={cn(
        "bg-[#141414] rounded-[20px] border border-white/[0.08] p-6 card-hover relative overflow-hidden",
        "transition-all duration-300",
        deletingId === room.id && "opacity-0 -translate-x-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{room.name}</h3>
          <p className="text-sm text-white/50">Hosted by {room.host}</p>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-medium border", statusColors[room.status])}>
          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
        </div>
      </div>

      <p className="text-sm text-white/70 mb-6 line-clamp-2 leading-relaxed">
        {room.description}
      </p>

      <div className="flex items-center gap-4 mb-6 text-sm text-white/50">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>{room.participants} members</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{room.focusTime} min focus</span>
        </div>
        <div className="flex items-center gap-1 text-[#a78bfa]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <span>{room.streak} day streak</span>
        </div>
      </div>

      <div className="flex gap-2">
        {room.isJoined ? (
          <>
            <button
              onClick={() => onLeave(room.id)}
              className="flex-1 py-2.5 px-4 rounded-full border border-white/[0.08] text-white font-medium hover:bg-white/5 btn-press transition-colors text-sm"
            >
              Leave Room
            </button>
            <button
              onClick={() => onDelete(room.id)}
              className="py-2.5 px-4 rounded-full border border-red-500/30 text-red-400 font-medium hover:bg-red-500/10 btn-press transition-colors text-sm"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={() => onJoin(room.id)}
            className="w-full py-2.5 px-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 btn-press transition-colors text-sm"
          >
            Join Room
          </button>
        )}
      </div>

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}