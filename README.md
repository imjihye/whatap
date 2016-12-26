# whatap test env

## rest test
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
node chat-http.js
```
#### express
```shell
node chat-express.js
```
#### express framework (v.4.13.4)
```shell
node chat-express_framework.js
```
