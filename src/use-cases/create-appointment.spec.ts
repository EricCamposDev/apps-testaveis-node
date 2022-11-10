import { AppointmentsRepository } from './../repositories/appointments-repository';
import { InMemoryApointmentsRepository } from './../repositories/in-memory/in-memory-appointments-repository';
import { Appointment } from './../entities/appointment';
import { it, describe, expect } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { getFutureDate } from '../tests/utils/get-future-date';

describe('Create appointment', () => {
    it('should be able to create an appointment', () => {

        const createAppointment = new CreateAppointment(
            new InMemoryApointmentsRepository
        )

        const endsAt = getFutureDate("2022-08-11")
        const startsAt = getFutureDate("2022-08-10")
        
        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })


    it('should not be able to create an appointment with overlapping dates', async () => {

        const createAppointment = new CreateAppointment(
            new InMemoryApointmentsRepository
        )

        const endsAt = getFutureDate("2022-08-15")
        const startsAt = getFutureDate("2022-08-10")


        await createAppointment.execute({
            customer: "John Doe",
            startsAt,
            endsAt
        })

        
        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFutureDate("2022-08-08"),
            endsAt: getFutureDate("2022-08-17")
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFutureDate("2022-08-11"),
            endsAt: getFutureDate("2022-08-12")
        })).rejects.toBeInstanceOf(Error)
    })
})