import { RecordListItem } from '../RecordListItem/recordListItem'
import { GetAirTableResponse } from '../../shared/api'
import { TopicHeader } from '../../shared/ui/TopicHeader'
import styles from './index.module.css'

interface RecordListProps {
  data: GetAirTableResponse
}

export const RecordList = ({ data }: RecordListProps) => {
  const listStyle = data.records.length > 5 ? styles.list + ' ' + styles.scrollable : styles.list

  return (
    <div>
      {data ? (
        <>
          <TopicHeader
            level={5}
            children={`${data.records.length} - claimed homework`}
          />
          <div className={listStyle}>
            {data!.records.map(item => {
              return (
                <RecordListItem
                  key={item.id}
                  title={item.fields.Name}
                />
              )
            })}
          </div>
        </>
      ) : (
        <div className={'loading'}></div>
      )}
    </div>
  )
}
