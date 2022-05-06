import request from "supertest";
import { app } from "../../app";


test('should return a 201 on successfully sign up', async () => {
  request(app).post('/api/users/signup').send({
    email: "test.test.com",
    password: "password"
  }).expect(201);
});

