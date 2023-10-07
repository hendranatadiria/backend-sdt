import request from 'supertest'
import {describe, beforeAll, afterAll, it, expect} from '@jest/globals'

import app from '../index'
import { db } from '../config/db'

const truncate = async () => {
  await db.user.deleteMany();
}

const userCreateData = {
  emailAddress: 'test@email.com',
  firstName: 'Test',
  lastName: 'User',
  birthday: '2023-10-08',
  location: 'Asia/Manila',
}

const userDeleteData = {
  emailAddress: userCreateData.emailAddress,
}

describe('Testing /user endpoints', () => {
  beforeAll(async () => {
    await truncate();
  })

  afterAll(async () => {
    await truncate();
    app.close();
  })

  describe('POST /user', () => {
    it ("should return 200 with newly created user", async () => {
      const res = await request(app).post('/user').send(userCreateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toMatchObject({
        id: expect.any(Number),
        ...userCreateData,
        birthday: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

    })
  })

  describe('POST /user again with the same data', () => {
    it('should return 400 with error message', async () => {
      const res = await request(app).post('/user').send(userCreateData);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Validation Error');
    })
  })

  describe('DELETE /user', () => {
    it ("should return 200 with newly created user", async () => {
      const res = await request(app).delete('/user').send(userDeleteData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toMatchObject({
        id: expect.any(Number),
        ...userCreateData,
        birthday: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

    })
  })

  describe('DELETE /user again with the same data', () => {
    it('should return 400 with error message', async () => {
      const res = await request(app).delete('/user').send(userDeleteData);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Validation Error');
    })
  })

})
