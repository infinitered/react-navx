import { useEffect } from "react"
import { BackHandler } from "react-native"
import { inject, observer } from "mobx-react"
import { NavigationActions } from "react-navigation"
import { useNavigationStore } from "../stores/use-stores"

interface BackButtonHandlerProps {
  /**
   * Are we allowed to exit?
   */
  canExit(routeName: string): Boolean

  /**
   * Whatevs, don't care
   */
  children: any
}

const BackButtonHandlerComponent = (props: BackButtonHandlerProps) => {
  const navigationStore = useNavigationStore()
  console.tron.logImportant(navigationStore)

  useEffect(() => {
    /**
     * Fires when the back button is pressed on android.
     */
    const onBackPress = () => {
      // grab the current route
      const routeName = navigationStore.findCurrentRoute().routeName

      // are we allowed to exit?
      if (props.canExit(routeName)) {
        // let the system know we've not handled this event
        return false
      } else {
        // we can't exit, so let's turn this into a back action
        navigationStore.dispatch(NavigationActions.back())
        // let the system know we've handled this event
        return true
      }
    }

    // subscribe
    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      // unsubscribe
      BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }
  }, [])

  return props.children
}

// Workaround for https://github.com/mobxjs/mobx-react/issues/690#issuecomment-508647033
export const BackButtonHandler = inject("navigationStore")(observer(BackButtonHandlerComponent))
