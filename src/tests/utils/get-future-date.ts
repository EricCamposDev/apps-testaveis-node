import { setYear, parseISO } from 'date-fns'

/**
 *  Receives: "2022-11-10" and returns "2023-11-10"
 */

export function getFutureDate (date: string): Date {
    return setYear(parseISO(date), new Date().getFullYear() + 1)
}