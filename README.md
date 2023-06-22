# Smart.money

<p align="center">
  <img src="https://github.com/DanielAlmeidaToledo/Smart.money/assets/96501443/a8cce6c7-4637-4e48-b9cd-a54ef62dd3f9" alt="Smart.money width="180" height="180"/>
</p>

## Como rodar esse projeto:

A seguir estão as etapas necessárias para executar o projeto em sua máquina. Certifique-se de seguir todas as instruções na ordem correta.

### Configuração inicial

1. Remova o Docker, caso esteja instalado em seu sistema.

2. Habilite o WSL no Windows 10:
   - Abra o PowerShell como administrador.
   - Execute o seguinte comando:
     ```
     dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
     ```
   - Em seguida, execute o comando:
     ```
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```

3. Habilite o WSL versão 2:
   - Abra o PowerShell como administrador.
   - Execute os comandos:
     ```
     wsl --install
     ```
     ```
     wsl --set-default-version 2
     ```

4. Instale o Ubuntu na Microsoft Store:
   - Procure por "Ubuntu" na Microsoft Store.
   - Selecione o Ubuntu e clique em "Instalar".
   - Siga as instruções na tela para concluir a instalação.

5. Instale o Windows Terminal:
   - Abra a Microsoft Store.
   - Procure por "Windows Terminal" e clique em "Instalar".

6. Desabilite o Hyper-V:
   - Abra o PowerShell como administrador.
   - Execute o comando:
     ```
     dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
     ```
   - Reinicie o seu computador para que as alterações tenham efeito.

7. Crie o arquivo `.wslconfig` em "C:\Users\<seu_usuario>":
   - Abra o Bloco de Notas ou qualquer editor de texto.
   - Insira o seguinte conteúdo no arquivo:
     ```
     [wsl2]
     memory=8GB
     processors=4
     swap=2GB
     ```
   - Salve o arquivo como `.wslconfig` (incluindo o ponto no início do nome) em "C:\Users\<seu_usuario>".

8. Instale o Docker:
   - Faça o download do instalador do Docker para Windows em: https://docs.docker.com/docker-for-windows/install/.
   - Execute o instalador baixado e siga as instruções na tela para concluir a instalação do Docker em seu sistema.
   - Após instalado acesse Configurações > Resources > WSL Integration e habilite o Ubuntu.
     
   - ![image](https://github.com/DanielAlmeidaToledo/Smart.money/assets/96501443/ea6d3707-6b31-4410-a02b-03338c41e7ff)


### Configuração do projeto

9. Clone este repositório:
   - Abra o Terminal do Ubuntu (WSL).
   - Execute o seguinte comando para clonar o repositório:
     ```
     git clone https://github.com/DanielAlmeidaToledo/Smart.money.git
     ```

10. Acesse a pasta do projeto:
    - No Terminal do Ubuntu (WSL), navegue até a pasta clonada usando o seguinte comando:
      ```
      cd Smart.money
      ```

### Configuração do backend

11. Acesse a pasta do backend:
    - No Terminal do Ubuntu (WSL), execute o seguinte comando para acessar a pasta backend:
      ```sh
      cd backend
      ```

12. Suba os containers do projeto:
    - No Terminal do Ubuntu (WSL), execute o seguinte comando para iniciar os containers do Docker:
      ```sh
      docker-compose up -d
      ```

13. Acesse o container do backend:
    - No Terminal do Ubuntu (WSL), execute o seguinte comando para acessar o container:
      ```sh
      docker-compose exec app bash
      ```

14. Instale as dependências do projeto:
    - No container do backend, execute o seguinte comando para instalar as dependências:
      ```sh
      composer install
      ```

15. Gere a chave do projeto Laravel:
    - Ainda no container do backend, execute o seguinte comando:
      ```sh
      php artisan key:generate
      ```

### Configuração do frontend

16. Instale as dependências do projeto frontend:
    - No Terminal do Ubuntu (WSL), navegue até a pasta do frontend usando o seguinte comando:
      ```
      cd ../frontend
      ```
    - Em seguida, execute o comando para instalar as dependências do projeto com o Yarn:
      ```sh
      yarn install
      ```

### Execução do projeto

17. Inicie o servidor de desenvolvimento do frontend:
    - No Terminal do Ubuntu (WSL), ainda na pasta do frontend, execute o seguinte comando:
      ```sh
      yarn dev
      ```

18. Agora você pode acessar o projeto no navegador:
    - Abra seu navegador e visite http://localhost:5173 para visualizar o frontend.

### Acesso ao banco de dados

O banco de dados pode ser visualizado usando o phpMyAdmin:
- Abra seu navegador e visite http://localhost:8080.
- Faça login com as seguintes credenciais:
  - Usuário: root
  - Senha: root

Certifique-se de que todos os passos foram seguidos corretamente para evitar problemas durante a execução do projeto.

## Front-end:

- React.JS
- Typescript
- React Router Dom
- Sass
- Mui
- Vite

## Back-end:

- Laravel
- Laravel Telescope
- Breeze (Laravel)
- PHP

## Banco de Dados:

- MySQL
