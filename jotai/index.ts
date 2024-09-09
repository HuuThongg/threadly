import { atom } from "jotai"

import { atomWithStorage } from "jotai/utils"
export const isThreadPostOpenedAtom = atom(false)

export const expandChatAtom = atomWithStorage("expandChat", false)
