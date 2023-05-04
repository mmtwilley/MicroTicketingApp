import request from 'supertest';
import { app } from '../../app';
import { id } from '../../utilis/IdTest';

it('returns a 404 if the provided id does not exist', async () => {
    await request(app)
     .put(`/api/tickets/${id}`)
     .set('Cookie', global.signin())
     .send({
        title:'A valid title',
        price: 20
     })
     .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    await request(app)
     .put(`/api/tickets/${id}`)
     .send({
        title:'A valid title',
        price: 20
     })
     .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  
   const firstSend = {
      title: "firstSend",
      price: 1,
    };
    const secondSend = {
      title: "secondSend",
      price: 2,
    };
  
  
   const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(firstSend);

    await request(app)
     .put(`/api/tickets/${response.body.id}`)
     .set('Cookie', global.signin())
     .send(secondSend)
     .expect(401)

     
   expect(response.body).toMatchObject(firstSend);

});

it('returns a 404 if the provides a ticket or price', async () => {
   const cookie = global.signin();

   const response = await request(app)
     .post('/api/tickets')
     .set('Cookie', cookie)
     .send({
       title: 'asldkfj',
       price: 20,
     });
 
   await request(app)
     .put(`/api/tickets/${response.body.id}`)
     .set('Cookie', cookie)
     .send({
       title: '',
       price: 20,
     })
     .expect(400);
 
   await request(app)
     .put(`/api/tickets/${response.body.id}`)
     .set('Cookie', cookie)
     .send({
       title: 'alskdfjj',
       price: -10,
     })
     .expect(400);
});

it('updates the ticket provided vaild inputs', async () => {
   const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(100);
});