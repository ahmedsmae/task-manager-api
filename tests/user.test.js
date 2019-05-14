const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree
} = require('./fixtures/db')

// this will run before each test
beforeEach(setupDatabase)

// this will run after each test
// afterEach(() => {
    // console.log('afterEach');
// })

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Ahmed Afifi',
        email: 'ahmed.mohsen.afifi@gmail.com',
        password: 'ahmed_smae_test'
    }).expect(201)

    // Assert that the database contains this user
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    // expect(response.body.user.name).toBe('Ahmed Afifi')

    expect(response.body).toMatchObject({
        user: {
            name: 'Ahmed Afifi',
            email: 'ahmed.mohsen.afifi@gmail.com'
        },
        token: user.tokens[0].token
    })

    // test that the password got hashed
    expect(user.password).not.toBe('ahmed_smae_test')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '623523889jh'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
