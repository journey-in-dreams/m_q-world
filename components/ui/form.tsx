'use client'

import type * as LabelPrimitive from '@radix-ui/react-label'
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  )
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

interface FormItemContextValue {
  id: string
}

const FormItem: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  const id = React.useId()

  return (
    <FormItemContext value={{ id }}>
      <div className={cn(className)} {...props} />
    </FormItemContext>
  )
}
FormItem.displayName = 'FormItem'

const FormLabel: React.FC<React.ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}
FormLabel.displayName = 'FormLabel'

const FormControl: React.FC<React.ComponentPropsWithoutRef<typeof Slot>> = ({ ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}
FormControl.displayName = 'FormControl'

const FormDescription: React.FC<React.ComponentProps<'p'>> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  )
}
FormDescription.displayName = 'FormDescription'

const FormMessage: React.FC<React.ComponentProps<'p'>> = ({ className, children, ...props }) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  return (
    <p
      id={formMessageId}
      className={cn('text-xs font-medium min-h-5', body ? 'text-destructive' : '', className)}
      {...props}
    >
      {body}
    </p>
  )
}
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
