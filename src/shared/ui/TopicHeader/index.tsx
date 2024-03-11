import { PropsWithChildren } from 'react'
import styles from './index.module.css'

interface TopicHeaderProps extends PropsWithChildren {
  level?: number
  className?: string
}
export const TopicHeader = ({ children, className, level = 2 }: TopicHeaderProps) => {
  const stylesTopic = className === 'danger' ? styles.danger : ''
  return (
    <>
      {level === 2 ? (
        <h2 className={stylesTopic}>{children}</h2>
      ) : level === 3 ? (
        <h3 className={stylesTopic}>{children}</h3>
      ) : level === 4 ? (
        <h4 className={stylesTopic}>{children}</h4>
      ) : (
        <h5 className={stylesTopic}>{children}</h5>
      )}
    </>
  )
}
