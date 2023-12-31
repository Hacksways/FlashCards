import s from './decks-filter.module.scss'

import { Trash } from '@/assets'
import Button from '@/components/ui/button/button.tsx'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

export type DecksFilterProps = {
  inputValue: string
  onChangeInputValue: (value: string) => void
  tabValue: string
  onChangeTabValue: (value: string) => void
  sliderValue: number[]
  minSliderValue?: number
  maxSliderValue?: number
  sliderLabel: string
  onChangeSliderValue: (value: number[]) => void
  onClearFilter: () => void
  className?: string
}

export const DecksFilter = ({
  inputValue,
  tabValue,
  sliderValue,
  sliderLabel,
  minSliderValue,
  maxSliderValue,
  onChangeInputValue,
  onChangeTabValue,
  onChangeSliderValue,
  onClearFilter,
}: DecksFilterProps): JSX.Element => {
  return (
    <div className={s.container}>
      <TextField
        placeholder={'Input deck name'}
        isSearch
        value={inputValue}
        onValueChange={onChangeInputValue}
      />

      <TabSwitcher
        value={tabValue}
        onValueChange={onChangeTabValue}
        tabs={[
          { title: 'My Decks', value: 'my' },
          { title: 'All Decks', value: 'all' },
        ]}
      ></TabSwitcher>
      <Slider
        value={sliderValue}
        onValueChange={onChangeSliderValue}
        min={minSliderValue}
        max={maxSliderValue}
        title={sliderLabel}
      />
      <Button className={s.button} variant={'secondary'} onClick={onClearFilter}>
        <Trash />
        <Typography variant={'subtitle2'}>Clear Filter</Typography>
      </Button>
    </div>
  )
}
