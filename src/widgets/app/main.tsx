import { RouteTabs } from '../../components/routeTabs/routeTabs'
import { HomeWorkDownloadButton } from '../exportHomework/homeWorkDownloadButton'
import { Resizer } from '../resizer/resizer'
import * as React from 'react'
import { useState } from 'react'
import { RouteEnum } from '../../entities'
import { Auth } from '../auth/auth'

export const Main = () => {
  const [routing, setRoute] = useState(RouteEnum.HOMEWORK_EXPORT)
  const mainRouteHandler = (route: RouteEnum) => {
    setRoute(route)
  }
  return (
    <>
      <div>
        <RouteTabs
          route={routing}
          changeRouteCallback={mainRouteHandler}
        />
        {routing === RouteEnum.HOMEWORK_EXPORT && <HomeWorkDownloadButton />}
        {routing === RouteEnum.RESIZER && <Resizer />}
        {routing === RouteEnum.AUTH && <Auth />}
      </div>
    </>
  )
}
