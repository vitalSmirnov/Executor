import styles from './index.module.css'

interface RecordListItemProps {
  title: string
}
export const RecordListItem = ({ title }: RecordListItemProps) => {
  return (
    <>
      <span className={styles.listItem}>{title}</span>
    </>
  )
}
