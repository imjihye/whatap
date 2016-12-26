# whatap test env

## rest test
### node start
```shell
$ npm start
```
#### get
```shell
http://localhost:3000/users/get?limit=3
```
#### put
```shell
http://localhost:3000/users/put
{
    name : faker.name.findName(),
    email : faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    ip: faker.internet.ip(),
    city: faker.address.city(),
    company: faker.company.companyName(),
    food: faker.image.food(),
    date: faker.date.past(),
}
```
#### delete
```shell
http://localhost:3000/users/delete
{
    name : 'test'
}
```
#### post
```shell
http://localhost:3000/users/post
{
	name: 'Adolf Kertzmann'
}
```


## socket
#### http server
```shell
$ node chat-http.js
url : http://localhost:3033/
```
#### express
```shell
$ node chat-express.js
url : http://localhost:3033/
```
