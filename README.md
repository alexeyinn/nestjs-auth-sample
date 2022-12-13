Sample app


Документация доступна по ссылке http://localhost:3000/graphql

Ниже будет описано то, что технические не получится описать там.

uploadAvatar:

form-data: {
operations: {"query":"mutation UploadAvatar($file:Upload!) {\n uploadAvatar(file:$file)\n}", "variables": { "file": null }},
map: { "0": ["variables.file"] },
0: picture-name.jpg // --- сам файл
}
