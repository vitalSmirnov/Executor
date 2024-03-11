import { RecordListItem } from '../RecordListItem/recordListItem'
import { GetAirTableResponse } from '../../shared/api'
import { TopicHeader } from '../../shared/ui/TopicHeader'
import styles from './index.module.css'

interface RecordListProps {
  data: GetAirTableResponse
}

export const RecordList = ({ data }: RecordListProps) => {
  return (
    <div>
      {data ? (
        <>
          <TopicHeader
            level={5}
            children={`${data.records.length} - claimed homework`}
          />
          <div className={styles.list}>
            {data!.records.map(item => {
              return <RecordListItem title={item.fields.Name} />
            })}
          </div>
        </>
      ) : (
        <div className={'loading'}></div>
      )}
    </div>
  )
}
