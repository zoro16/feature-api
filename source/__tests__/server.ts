import supertest from 'supertest'
import server from '../server'
import { Request, Response } from 'express';

describe("POST /feature", () => {
    describe("given a featureName, email and is_enabled", () => {
        test("should respond with a 200 status code", async () => {
            const response: any = await supertest(server).post("/feature").send({
                featureName: "Basic",
                email: "someemail@example.com",
                is_enabled: true
            })
            expect(response.statusCode).toBe(200)
        })
    })

    describe("given a missing parameter (featureName, email or is_enabled)", () => {
        test("should respond with a 304 status code", async () => {
            const response: any = await supertest(server).post("/feature").send({
                featureName: "Basic",
                email: "someemail@example.com",
            })
            expect(response.statusCode).toBe(304)
        })
    })

})
