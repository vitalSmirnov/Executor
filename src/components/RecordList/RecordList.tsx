import { RecordListItem } from '../RecordListItem/recordListItem'
import { GetAirTableResponse } from '../../shared'
import { TopicHeader } from '../../shared'
import styles from './index.module.css'

interface RecordListProps {
  data: GetAirTableResponse
}

export const RecordList = ({ data }: RecordListProps) => {
  return (
    <div>
      <TopicHeader
        level={5}
        children={`${data.records.length} - claimed homework`}
      />
      <div className={styles.list}>
        {data.records!.map(item => {
          return (
            <RecordListItem
              key={item.id}
              title={item.fields.Name}
            />
          )
        })}
      </div>
    </div>
  )
}
