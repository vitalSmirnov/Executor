import { RouteTabs } from '../components'
import { Auth, HomeWorkDownloadButton } from '../widgets'
import * as React from 'react'
import { useState } from 'react'
import { RouteEnum } from '../entities'

export const Main = () => {
  const [routing, setRoute] = useState(RouteEnum.HOMEWORK_EXPORT)
  const mainRouteHandler = (route: RouteEnum) => {
    setRoute(route)
  }

  const setAuth = () => {
    setRoute(RouteEnum.AUTH)
  }

  const unsetAuth = () => {
    setRoute(RouteEnum.HOMEWORK_EXPORT)
  }

  return (
    <>
      <div>
        <RouteTabs
          route={routing}
          changeRouteCallback={mainRouteHandler}
        />
        {routing === RouteEnum.HOMEWORK_EXPORT && <HomeWorkDownloadButton errorCallback={setAuth} />}
        {routing === RouteEnum.AUTH && <Auth errorCallback={unsetAuth} />}
      </div>
    </>
  )
}
