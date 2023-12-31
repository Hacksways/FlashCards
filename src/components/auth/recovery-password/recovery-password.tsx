import { DevTool } from '@hookform/devtools'
import { Link } from 'react-router-dom'

import {
  RecoveryPasswordForm,
  useRecoveryPasswordScheme,
} from '../../schemes/use-recovery-password-scheme.ts'
import { ControlledTextField } from '../../ui/controlled'

import s from './recovery-password.module.scss'

import Button from '@/components/ui/button/button.tsx'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: RecoveryPasswordForm) => void
}

export const RecoveryPassword = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useRecoveryPasswordScheme()

  const onFormSubmit = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={onFormSubmit}>
        <DevTool control={control} />
        <ControlledTextField label="Email" control={control} name="email" />

        <Typography variant="body2" className={s.description}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type="submit" fullWidth className={s.button}>
          Send Instructions
        </Button>
      </form>
      <Typography variant="body2" className={s.question}>
        Did you remember your password?
      </Typography>
      <Typography as={Link} to={'/login'} variant="link1" className={s.logging}>
        Try logging in
      </Typography>
    </Card>
  )
}
