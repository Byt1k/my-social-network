export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = value => value ? undefined : 'This field is required'

export const email: ValidatorType = value => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
}