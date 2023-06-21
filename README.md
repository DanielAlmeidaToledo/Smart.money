# Smart.money

<p align="center">
  <img src="https://github.com/DanielAlmeidaToledo/Smart.money/assets/96501443/a8cce6c7-4637-4e48-b9cd-a54ef62dd3f9" alt="Smart.money width="180" height="180"/>
</p>

## Front-end:

- React.JS
- Typescript
- React Router Dom
- Sass
- Vite

## Back-end:

- Laravel
- Laravel Telescope
- Breeze (Laravel)

## Banco de Dados:

- MySQL

## Como rodar esse projeto:

- Abrir terminal do Ubuntu (WSL)

- Clonar esse repositório
```
git clone https://github.com/DanielAlmeidaToledo/Smart.money.git
```

- Entrar na pasta do projeto
```
cd Smart.money
```

- Suba os containers do projeto
```sh
docker-compose up -d
```

- Acessar o container
```sh
docker-compose exec app bash
```

- Instalar as dependências do projeto
```sh
composer install
```


- Gerar a key do projeto Laravel
```sh
php artisan key:generate
```
