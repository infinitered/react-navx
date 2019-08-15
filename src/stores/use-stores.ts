import React from "react"
import { MobXProviderContext } from "mobx-react"
import { RootStore } from "./root-store"

// To access any store in React
export function useStores() {
  return React.useContext(MobXProviderContext)
}

export function useRootStore(): RootStore {
  return useStores().rootStore
}

export function useStore(storeName: string) {
  return useRootStore()[storeName]
}

export function useNavigationStore() {
  return useStore("navigationStore")
}
