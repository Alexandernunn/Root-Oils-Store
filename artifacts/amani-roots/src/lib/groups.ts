import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  type Timestamp,
  type Unsubscribe,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface Group {
  id: string
  name: string
  description: string
  coverImage: string
  memberCount: number
  createdAt: Timestamp | null
}

export function subscribeGroups(
  onData: (groups: Group[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe | null {
  if (!db) return null
  const q = query(collection(db, "groups"), orderBy("createdAt", "desc"))
  return onSnapshot(
    q,
    snapshot => {
      const groups = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<Group, "id">),
      }))
      onData(groups)
    },
    err => onError?.(err)
  )
}

export async function createGroup(data: {
  name: string
  description: string
  coverImage: string
}): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.")
  await addDoc(collection(db, "groups"), {
    name: data.name.trim(),
    description: data.description.trim(),
    coverImage: data.coverImage.trim(),
    memberCount: 0,
    createdAt: serverTimestamp(),
  })
}

export async function incrementMemberCount(groupId: string): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.")
  const ref = doc(db, "groups", groupId)
  await updateDoc(ref, { memberCount: increment(1) })
}

export async function checkAdminPassword(entered: string): Promise<"match" | "nomatch" | "noconfig"> {
  if (!db) throw new Error("Firebase is not configured.")
  const ref = doc(db, "admin_config", "auth")
  const snap = await getDoc(ref)
  if (!snap.exists()) return "noconfig"
  const stored = (snap.data() as Record<string, unknown>)["password"]
  if (typeof stored !== "string") return "noconfig"
  return stored === entered ? "match" : "nomatch"
}
