import { useState } from 'react'
import { Input } from '../../shared/ui/Input'
import { Button } from '../../shared/ui/button'
import { resizeHandler } from './helpers/helper'
import { TopicHeader } from '../../shared/ui/TopicHeader'

export const Resizer = () => {
  const [selectedSize, setSize] = useState<number>(300)
  const resizerHandler = async () => {
    await resizeHandler(selectedSize)
  }

  return (
    <>
      <TopicHeader children={'Resizer'} />
      <Input<number>
        label={'Size'}
        onChange={e => setSize(e)}
        value={selectedSize}
      />
      <Button
        title={'Resize items'}
        onClick={resizerHandler}
      />
    </>
  )
}
