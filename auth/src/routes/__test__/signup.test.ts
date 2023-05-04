import  supertest from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup', async () => {
    process.env.JWT_KEY = "asdf";

    return supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email',async () => {
    process.env.JWT_KEY = "asdf";

    return supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test',
            password: 'password'
        })
        .expect(400);
})

it('returns a 400 with an invalid password',async () => {
    process.env.JWT_KEY = "asdf";

    return supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test',
            password: 'p'
        })
        .expect(400);
})

it('returns a 400 with a missing email and password',async () => {
    process.env.JWT_KEY = "asdf";
    await supertest(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);


    await supertest(app)
        .post('/api/users/signup')
        .send({
            password:"fnldk"
        })
        .expect(400);
});

it('returns a 400 when duplicate emails',async () => {
    process.env.JWT_KEY = "asdf";

    await supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password'
        })
        .expect(201);

    await supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after a successful signup', async () => {
    process.env.JWT_KEY = "asdf";

    const response = await supertest(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
    
});