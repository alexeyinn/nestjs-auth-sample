Sample Nest.js app with sample of auth. With access, refresh tokens, upload avatars, auth logic etc.

Tokens logic algorithm i took from webinar - https://www.youtube.com/watch?v=uAKzFhE3rxU&t=738s&ab_channel=CodewithVlad

Main branch: PostgreSQL - TypeORM - GraphQL

Other branch contains variation:

PostgreSQL - TypeORM - REST
PostgreSQL - Prisma - REST

You can start app with - `npm run start:dev` or trough docker `docker-compose up`

Docs: http://localhost:3000/graphql

And one resolver not included in docs.

uploadAvatar:

form-data: {
operations: {"query":"mutation UploadAvatar($file:Upload!) {\n uploadAvatar(file:$file)\n}", "variables": { "file": null }},
map: { "0": ["variables.file"] },
0: picture-name.jpg // --- сам файл
}
