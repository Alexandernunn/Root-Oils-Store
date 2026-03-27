import React, { useEffect, useState } from "react"
import { Search, Plus, Users } from "lucide-react"
import { subscribeGroups, type Group } from "@/lib/groups"
import { db } from "@/lib/firebase"
import { useAuth } from "@/context/AuthContext"
import JoinModal from "./JoinModal"

interface Props {
  onCreateGroup: () => void
}

export default function GroupsSidebar({ onCreateGroup }: Props) {
  const [groups, setGroups] = useState<Group[]>([])
  const [search, setSearch] = useState("")
  const [joinModalGroup, setJoinModalGroup] = useState<Group | null>(null)
  const { memberProfile, refreshMemberProfile } = useAuth()

  // Joined groups come from the persisted Firestore member profile
  const joined = new Set(memberProfile?.joinedGroups ?? [])

  useEffect(() => {
    const unsub = subscribeGroups(setGroups)
    return () => { if (unsub) unsub() }
  }, [])

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="w-full flex flex-col gap-6">

      {/* Search */}
      <div
        className="flex items-center gap-2 border px-3 py-2"
        style={{ borderColor: "var(--border)" }}
      >
        <Search size={13} style={{ color: "var(--text-muted)" }} className="flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search groups…"
          className="flex-1 bg-transparent text-xs font-light tracking-wide outline-none placeholder:opacity-50"
          style={{ color: "var(--text)" }}
        />
      </div>

      {/* My Groups */}
      <div>
        <p className="text-[9px] font-light tracking-[0.18em] uppercase mb-3" style={{ color: "var(--sage)" }}>
          My Groups
        </p>
        {joined.size === 0 ? (
          <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Once you join groups, they'll appear here.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {groups
              .filter(g => joined.has(g.id))
              .map(g => (
                <li key={g.id} className="flex items-center gap-2 py-1">
                  {g.coverImage ? (
                    <img src={g.coverImage} alt={g.name} className="w-7 h-7 object-cover flex-shrink-0" />
                  ) : (
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--mint)" }}
                    >
                      <Users size={12} style={{ color: "var(--forest)" }} />
                    </div>
                  )}
                  <span className="text-xs font-light tracking-wide truncate" style={{ color: "var(--text)" }}>
                    {g.name}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Suggested Groups */}
      <div>
        <p className="text-[9px] font-light tracking-[0.18em] uppercase mb-3" style={{ color: "var(--sage)" }}>
          Suggested Groups
        </p>

        {!db ? (
          <p className="text-xs font-light italic" style={{ color: "var(--text-muted)" }}>
            Firebase not configured.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-xs font-light italic" style={{ color: "var(--text-muted)" }}>
            {search ? "No groups match your search." : "No groups yet."}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtered.map(group => (
              <li key={group.id}>
                {/* Cover media */}
                {group.mediaType === "image" && group.coverImage && (
                  <div className="w-full h-28 overflow-hidden mb-3">
                    <img src={group.coverImage} alt={group.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                )}
                {group.mediaType === "video" && group.coverVideo && (
                  <div className="w-full h-28 overflow-hidden mb-3">
                    <video src={group.coverVideo} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  </div>
                )}
                {!group.coverImage && !group.coverVideo && (
                  <div
                    className="w-full h-16 mb-3 flex items-center justify-center"
                    style={{ backgroundColor: "var(--mint)" }}
                  >
                    <Users size={20} style={{ color: "var(--forest)" }} />
                  </div>
                )}

                {/* Info */}
                <p className="font-heading text-sm font-light tracking-wide mb-0.5" style={{ color: "var(--text)" }}>
                  {group.name}
                </p>
                <p className="text-[10px] font-light mb-3" style={{ color: "var(--text-muted)" }}>
                  {group.memberCount} {group.memberCount === 1 ? "member" : "members"}
                </p>

                {/* Join button — hidden once the user has joined this group */}
                {!joined.has(group.id) && (
                  <button
                    onClick={() => setJoinModalGroup(group)}
                    className="w-full text-[10px] font-light tracking-[0.12em] uppercase py-2 border transition-all hover:opacity-70"
                    style={{ borderColor: "var(--forest)", color: "var(--forest)", backgroundColor: "transparent" }}
                  >
                    Join
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Create Group (admin) */}
      <button
        onClick={onCreateGroup}
        className="flex items-center justify-center gap-2 w-full text-[10px] font-light tracking-[0.15em] uppercase py-3 border transition-all hover:opacity-70"
        style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
      >
        <Plus size={13} />
        Create Group
      </button>

      {/* Join Modal */}
      {joinModalGroup && (
        <JoinModal
          groupId={joinModalGroup.id}
          groupName={joinModalGroup.name}
          onClose={() => setJoinModalGroup(null)}
          onJoined={async () => {
            setJoinModalGroup(null)
            await refreshMemberProfile()
          }}
        />
      )}
    </aside>
  )
}
