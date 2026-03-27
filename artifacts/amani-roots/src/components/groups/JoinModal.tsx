import React, { useState } from "react"
import { X, Mail, User, Phone, Leaf } from "lucide-react"
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { incrementMemberCount } from "@/lib/groups"
import { useAuth } from "@/context/AuthContext"

interface Props {
  groupId: string
  groupName: string
  onClose: () => void
  onJoined: () => void
}

type Step = "form" | "sending" | "sent"

export default function JoinModal({ groupId, groupName, onClose, onJoined }: Props) {
  const { sendEmailLink, isConfigured } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [step, setStep] = useState<Step>("form")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConfigured || !db) return
    setStep("sending")

    try {
      const emailKey = email.trim().toLowerCase()
      const memberRef = doc(db, "members", emailKey)
      const existing = await getDoc(memberRef)

      if (existing.exists()) {
        // Returning member — just add this group if not already joined
        const data = existing.data() as { joinedGroups?: string[] }
        if (!data.joinedGroups?.includes(groupId)) {
          await updateDoc(memberRef, { joinedGroups: arrayUnion(groupId) })
          await incrementMemberCount(groupId)
        }
      } else {
        // New member — save full profile
        await setDoc(memberRef, {
          name: name.trim(),
          email: emailKey,
          phone: phone.trim(),
          joinedGroups: [groupId],
          createdAt: new Date().toISOString(),
        })
        await incrementMemberCount(groupId)
      }

      await sendEmailLink(emailKey)
      setStep("sent")
      onJoined()
    } catch (err: unknown) {
      console.error("Join error:", err)
      setStep("form")
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-md flex flex-col"
        style={{ backgroundColor: "var(--bg)", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Leaf size={16} style={{ color: "var(--forest)" }} />
            <span
              className="font-heading text-base font-light tracking-[0.06em]"
              style={{ color: "var(--text)" }}
            >
              Join {groupName}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:opacity-60 transition-opacity">
            <X size={16} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {step === "sent" ? (
          /* Confirmation */
          <div className="px-8 py-12 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "var(--mint)" }}
            >
              <Mail size={22} style={{ color: "var(--forest)" }} />
            </div>
            <p
              className="font-heading text-xl font-light tracking-wide mb-3"
              style={{ color: "var(--text)" }}
            >
              Check your inbox
            </p>
            <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We sent a sign-in link to <span style={{ color: "var(--forest)" }}>{email}</span>.
              Click it to complete joining — no password needed.
            </p>
            <button
              onClick={onClose}
              className="mt-8 text-[10px] font-light tracking-[0.15em] uppercase px-8 py-3 transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              Got it
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
            <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Already a member? Enter your email and we'll send you a sign-in link.
            </p>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-light tracking-[0.14em] uppercase" style={{ color: "var(--sage)" }}>
                Full Name
              </label>
              <div
                className="flex items-center gap-3 border px-4 py-3 transition-colors focus-within:border-current"
                style={{ borderColor: "var(--border)" }}
              >
                <User size={13} style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="flex-1 bg-transparent text-xs font-light outline-none placeholder:opacity-40"
                  style={{ color: "var(--text)" }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-light tracking-[0.14em] uppercase" style={{ color: "var(--sage)" }}>
                Email <span style={{ color: "var(--gold)" }}>*</span>
              </label>
              <div
                className="flex items-center gap-3 border px-4 py-3 transition-colors focus-within:border-current"
                style={{ borderColor: "var(--lavender)" }}
              >
                <Mail size={13} style={{ color: "var(--lavender)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent text-xs font-light outline-none placeholder:opacity-40"
                  style={{ color: "var(--text)" }}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-light tracking-[0.14em] uppercase" style={{ color: "var(--sage)" }}>
                Phone Number
              </label>
              <div
                className="flex items-center gap-3 border px-4 py-3 transition-colors focus-within:border-current"
                style={{ borderColor: "var(--border)" }}
              >
                <Phone size={13} style={{ color: "var(--text-muted)" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="flex-1 bg-transparent text-xs font-light outline-none placeholder:opacity-40"
                  style={{ color: "var(--text)" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={step === "sending" || !email}
              className="w-full text-[10px] font-light tracking-[0.15em] uppercase py-4 mt-1 transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "var(--forest)", color: "#fff" }}
            >
              {step === "sending" ? "Sending…" : "Join & Get Sign-in Link"}
            </button>

            <p className="text-[9px] font-light text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We'll email you a magic link — no password required.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
