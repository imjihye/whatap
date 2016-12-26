var app = require('../app.js');
var request = require('supertest')(app);
var faker = require('faker');


describe('users', function(){
    describe('users rest call', function(){
        it('get', function(){
            request
            .get('/users/get')
            .query({limit: 1})
            .expect(function(res){
                console.log(res.body)
            })
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it('post', function(){
            request
            .post('/users/post')
            .send({
                name: 'Adolf Kertzmann'
            })
            .expect(function(res){
                console.log(res.body)
            })
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it('put', function(){
            request
            .put('/users/put')
            .send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.phoneNumber(),
                ip: faker.internet.ip(),
                city: faker.address.city(),
                company: faker.company.companyName(),
                food: faker.image.food(),
                date: faker.date.past(),
            })
            .expect(function(res){
                console.log(res.body)
            })
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it('delete', function(){
            request
            .delete('/users/delete')
            .send({
                name: 'test'
            })
            .expect(function(res){
                console.log(res.body)
            })
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });
    });
});

describe.skip('stream', function(){
    describe('stream lib test', function(){
        it('readable', function(){
            request
            .get('/stream/readable')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it('writeable', function(){
            request
            .get('/stream/writeable')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });


        it('duplex', function(){
            request
            .get('/stream/duplex')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });
    });
});

describe.skip('http', function(){
    describe('http lib test', function(){
        it('client', function(){
            request
            .get('/http/client')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it.only('server', function(){
            request
            .get('/http/server')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });
    });
});

describe.skip('socket', function(){
    describe('socket lib test', function(){
        it('/socket client', function(){
            request
            .get('/socket/client')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });

        it.only('/socket server', function(){
            request
            .get('/socket/server')
            .expect(200, function(err, data){
                if(err) console.log(err);
            });
        });
    });
});
