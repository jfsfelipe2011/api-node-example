# api-node-example
Esse é um repositório de uma API básica para uso de um exemplo de testes de Feature com Newman

# como rodar?

É necessário ter o node instalado em sua máquina. Para isso verifique como instalar em seu SO nesse link:

[download node](https://nodejs.org/en/download/).

Com ele instalado rode o seguinte comando:

```shell
node index.js
```

# Como rodar os testes?

Para rodar os testes é necessário ter o newman instalado em sua máquina. Para isso siga o tutorial nessa página:

[download newman](https://www.npmjs.com/package/newman).

Com ele instalado rode o seguinte comando (lembrando que é necessário da aplicação estar rodando):

```shell
newman run tests/api-node-example.postman_collection.json --color on
```