import { RouteEnum } from '../../entities'

interface RouteTabsProps {
  route: RouteEnum
  changeRouteCallback: (route: RouteEnum) => void
}

export const RouteTabs = ({ route, changeRouteCallback }: RouteTabsProps) => {
  const routerSetter = (mode: RouteEnum) => {
    changeRouteCallback(mode)
  }

  return (
    <>
      <div className='tabs cs1 ce12'>
        <div className='tabs-header-list'>
          <div className={`tab ${route === RouteEnum.HOMEWORK_EXPORT && 'tab-active'}`}>
            <div
              onClick={() => routerSetter(RouteEnum.HOMEWORK_EXPORT)}
              className={'tab-text tab-badge'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className='icon icon-upload' />
            </div>
          </div>
          <div className={`tab ${route === RouteEnum.RESIZER && 'tab-active'}`}>
            <div
              onClick={() => routerSetter(RouteEnum.RESIZER)}
              className={'tab-text tab-badge'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className='icon icon-tile' />
            </div>
          </div>
          <div className={`tab ${route === RouteEnum.AUTH && 'tab-active'}`}>
            <div
              onClick={() => routerSetter(RouteEnum.AUTH)}
              className={'tab-text tab-badge'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className='icon icon-settings' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
