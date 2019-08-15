import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  // todo: figure out how to access the navigationStore here
  // navigationStore: types.maybe(IAnyModel),
})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
