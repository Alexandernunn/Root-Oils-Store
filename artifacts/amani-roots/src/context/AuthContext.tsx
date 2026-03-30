import React, { createContext, useContext, useEffect, useState } from "react"
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  type User,
} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"

export interface MemberProfile {
  name: string
  email: string
  phone: string
  joinedGroups: string[]
}

interface AuthContextType {
  user: User | null
  loading: boolean
  memberProfile: MemberProfile | null
  signInWithGoogle: () => Promise<void>
  sendEmailLink: (email: string) => Promise<void>
  signOut: () => Promise<void>
  refreshMemberProfile: () => Promise<void>
  isConfigured: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  memberProfile: null,
  signInWithGoogle: async () => {},
  sendEmailLink: async () => {},
  signOut: async () => {},
  refreshMemberProfile: async () => {},
  isConfigured: false,
})

async function fetchMemberProfile(email: string): Promise<MemberProfile | null> {
  if (!db) return null
  try {
    const snap = await getDoc(doc(db, "members", email.toLowerCase()))
    return snap.exists() ? (snap.data() as MemberProfile) : null
  } catch (err: unknown) {
    console.error("Failed to load member profile:", err)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null)
  const isConfigured = Boolean(auth)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    // Complete email link sign-in if this page load came from an email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailForSignIn = localStorage.getItem("emailForSignIn") ?? ""
      if (emailForSignIn) {
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then(() => {
            localStorage.removeItem("emailForSignIn")
            localStorage.setItem("openComposeAfterAuth", "1")
            window.history.replaceState({}, "", window.location.pathname)
          })
          .catch((err: unknown) => console.error("Email link sign-in error:", err))
      }
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u?.email) {
        const profile = await fetchMemberProfile(u.email)
        setMemberProfile(profile)
      } else {
        setMemberProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) return
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err: unknown) {
      console.error("Google sign-in error:", err)
    }
  }

  const sendEmailLink = async (email: string) => {
    if (!auth) return
    const actionCodeSettings = {
      url: `${window.location.origin}/groups`,
      handleCodeInApp: true,
    }
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    localStorage.setItem("emailForSignIn", email)
  }

  const refreshMemberProfile = async () => {
    if (!user?.email) return
    const profile = await fetchMemberProfile(user.email)
    setMemberProfile(profile)
  }

  const signOut = async () => {
    if (!auth) return
    try {
      await firebaseSignOut(auth)
      setMemberProfile(null)
    } catch (err: unknown) {
      console.error("Sign-out error:", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, memberProfile, signInWithGoogle, sendEmailLink, signOut, refreshMemberProfile, isConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
