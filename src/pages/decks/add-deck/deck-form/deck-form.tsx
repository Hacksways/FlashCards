import { useState } from 'react'

import s from './deck-form.module.scss'

import { Edit } from '@/assets'
import { DeckFormValues, useDeckForm } from '@/components/schemes/use-deck-form.tsx'
import Button from '@/components/ui/button/button.tsx'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { FileUploader } from '@/pages/utils/file-uploader.tsx'

export type DeckFormProps = {
  buttonTitle: string
  values?: {
    name: string
    isPrivate?: boolean
    cover?: string | null
  }
  onSubmit: (data: FormData) => void
  onClose: () => void
}

export const DeckForm = ({
  buttonTitle,
  values,
  onSubmit,
  onClose,
}: DeckFormProps): JSX.Element => {
  const [cover, setCover] = useState<File | null>(null)
  const [error, setError] = useState<null | string>(null)

  const { control, handleSubmit } = useDeckForm({
    name: values?.name || '',
    isPrivate: values?.isPrivate || false,
  })

  const imageUrl = cover ? URL.createObjectURL(cover) : values?.cover

  const buttonUploadText = imageUrl ? 'Change Cover Image' : ' Add Cover Image'
  const onSubmitHandler = (data: DeckFormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', `${data.isPrivate}`)

    if (cover) {
      formData.append('cover', cover || '')
    }
    onSubmit(formData)
    onClose()
  }
  const onLoadCover = (data: File) => {
    setCover(data)
    setError(null)
  }
  const onLoadCoverError = (error: string) => {
    setError(error)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      {error && <div className={s.errorMessage}>{error}</div>} {/* Display error message */}
      {imageUrl && (
        <div className={s.imageBlock}>
          <img src={imageUrl} alt="Pack cover" />
        </div>
      )}
      <FileUploader
        className={s.fileUploader}
        onLoadCover={onLoadCover}
        onLoadError={onLoadCoverError}
      >
        <Button type="button" variant={'secondary'} fullWidth>
          <Edit />
          <Typography variant={'h2'} as="span">
            {buttonUploadText}
          </Typography>
        </Button>
      </FileUploader>
      <ControlledTextField className={s.input} control={control} name="name" label="Name Pack" />
      <div className={s.isPrivate}>
        <ControlledCheckbox control={control} name="isPrivate" label="Private pack" />
      </div>
      <div className={s.buttonsContainer}>
        <Button type="button" variant={'secondary'} onClick={onClose}>
          <Typography variant={'subtitle2'}>Cancel</Typography>
        </Button>
        <Button>
          <Typography variant={'subtitle2'}>{buttonTitle}</Typography>
        </Button>
      </div>
    </form>
  )
}
