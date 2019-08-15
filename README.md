# React NavX

Navigation and state management in one place for your React Native projects.

_Featuring React context & hooks, React Navigation, and MobX-React._

## Quick Peek

In your main app file:

```tsx
import React, { useState } from "react"
import { AppRegistry } from "react-native"
import { NavX, types } from "react-navx"
import { AppStoreModel } from "./models/app-store"
import { MainStack } from "./navigation/main-stack"

function App(props) {
  const [appStore] = useState(AppStoreModel.create({}))

  return (
    <NavX
      stores={{ appStore }}
      storeModels={{ appStore: AppStoreModel }}
      screen={MainStack}
    />
  )
}

AppRegistry.registerComponent("MyApp", () => App)
```

Then, in a screen or other component:

```tsx
import * as React from "react"
import { useStore, observer } from "react-navx"

function StatusComponent(props) {
  const { status } = useStore("AppStore")

  return <View>{status}</View>
}

export const Status = observer(StatusComponent)
```

## Features

* [x] [React Navigation 3.x](https://reactnavigation.org/) for navigation and routing
* [x] [MobX-React, MobX, MobX-State-Tree](https://mobx-react.js.org/) for state management
* [x] [Reactotron](https://infinite.red/reactotron) bindings for easy debugging
* [x] TypeScript support

## Getting Started (React Native)

#### 1. Install `react-navx` and its dependencies:

```
yarn add -D react-navx

# or, if you prefer npm
npm i --save-dev react-navx
```

#### 2. Add a store to your app

Add a MobX-State-Tree (MST) store to your app. See [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) documentation for much more on what you can do with MST models.

Note that React-NavX exports everything from `mobx-state-tree`, so you can access `types` and other functions from there directly.

```jsx
import { types } from "react-navx"

// your primary mobx-state-tree store for app state
export const AppStoreModel = types
  .model("AppStore", {
    status: types.optional(types.enumeration(["pending", "loading", "done", "error"]), "pending"),
  })
  .actions(self => ({
    setStatus: newStatus => (self.status = newStatus),
  }))
```

#### 3. Create a main navigator for your app

This is powered by [react-navigation](https://reactnavigation.org/). There are many types of navigators you can use, but here's an example StackNavigator:

```tsx
import { createStackNavigator } from "react-navx"
import { WelcomeScreen, StatusScreen } from "../screens"

export const MainStack = createStackNavigator(
  {
    welcomeScreen: { screen: WelcomeScreen },
    statusScreen: { screen: StatusScreen },
  },
  {
    headerMode: "none",
  },
)
```

#### 4. Bring it all together with NavX

Now bring it all together in your main app file. This is often `index.js` or `app.tsx` or similar.

```tsx
import React, { useState } from "react"
import { AppRegistry } from "react-native"
import { NavX, types } from "react-navx"
import { AppStoreModel } from "./models/app-store"
import { MainStack } from "./navigation/main-stack"

function App(props) {
  const [appStore] = useState(AppStoreModel.create({}))

  return (
    <NavX
      stores={{ appStore }}
      storeModels={{ appStore: AppStoreModel }}
      screen={MainStack}
    />
  )
}

AppRegistry.registerComponent("MyApp", () => App)
```

That's it!

## Advanced Usage

### Customizing the navigationStore

React-NavX creates its own navigation store by default. If you'd like to create your own and provide it, just use the `navigationStore` prop on the `NavX` component.

```tsx
<NavX
  // ...
  navigationStore={myNavStore}
/>
```

### Adding additional stores

If you want more than just the `appStore`, just add them to the `stores` and `storeModels` props:

```tsx
<NavX
  stores={{ appStore, loginStore }}
  storeModels={{
    appStore: AppStoreModel,
    loginStore: LoginStoreModel
  }}
  screen={MainStack}
/>
```

Currently, both `stores` and `storeModels` are required to be provided. In the future, I'd like to infer the `storeModels` to make it easier.

## Help and Support

The best way to get help is to join [our vibrant Infinite Red community Slack](http://community.infinite.red).

If you have a replicable bug, please feel free to [file an issue](https://github.com/infinitered/react-navx/issues) with steps to reproduce. If you can provide a pull request to fix the issue, even better.

## License

This project is released under the MIT license.

## Author

React-NavX was created by [Jamon Holmgren](https://twitter.com/jamonholmgren) of [Infinite Red](https://infinite.red).

