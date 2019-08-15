import * as React from "react"
import { observer } from "mobx-react"
// @ts-ignore: until they update @type/react-navigation to include getNavigation.
// prettier-ignore
import { createStackNavigator, getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"
import { useNavigationStore } from "../stores/use-stores"
import { load, save } from "../storage"

interface NavXNavigatorProps {
  children?: any
}

export const createNavXNavigator = RootNavigator => {
  const NavXNavigatorComponent = (props: NavXNavigatorProps) => {
    const navigationStore = useNavigationStore()

    let currentNavProp: NavigationScreenProp<NavigationState>

    const getCurrentNavigation = () => currentNavProp

    // grab our state & dispatch from our navigation store
    const { state, dispatch, actionSubscribers } = navigationStore

    // create a custom navigation implementation
    currentNavProp = getNavigation(
      RootNavigator.router,
      state,
      dispatch,
      actionSubscribers(),
      {},
      getCurrentNavigation,
    )

    // set persistance methods
    const persistenceKey = "navigationState"
    const persistNavigationState = async navState => {
      await save(persistenceKey, JSON.stringify(navState))
    }
    const loadNavigationState = async () => {
      const jsonString = await load(persistenceKey)
      return JSON.parse(jsonString)
    }

    // prettier-ignore
    const persist = __DEV__ ? undefined : { persistNavigationState, loadNavigationState }

    return <RootNavigator {...persist} navigation={currentNavProp}></RootNavigator>
  }

  return observer(NavXNavigatorComponent)
}
