# HorariosAPI
  O sistema foi desenvolvido com o objetivo de manter informações de Professores, Disciplinas, Alunos e garantir um sistema de importação e exportação para o cadastro em massa destas entidades. Além destes essenciais, o sistema também cadastra Cursos e Horários.
  Para o desenvolvimento do sistema foram utilizadas várias ferramentas e tecnologias nas quais sem elas, o sistema pode não funcionar corretamente, algumas delas são substituíveis.

### Backend - Java
  * Jdk 11
  * Spring boot
  * Maven

### Frontend
  * Node: 14.17.5
  * React
  * Yarn: Gerenciador de dependências.
  * Bootstrap

### Banco de dados 
  * MySQL

### Deploy
  * Docker: 20.10.12

### Versionamento
  * Git

## Casos de uso
  ### Diagrama de casos
   ![Diagrama de casos de uso](https://i.imgur.com/QxCl5hZ.png)
    
  ##### Administrador
   O administrador poderá executar toda operação CRUD de todas as entidades além de Importar e Exportar a entidade que deseja e logar e deslogar.
  
  ##### Usuário
   O usuário comum poderá apenas ler todas as entidades cadastradas, logar e deslogar.
   
## Diagrama de classes
  ![Diagrama de classes](https://i.imgur.com/CzBMrIX.png)
  
  	Em amarelo estão as classes entidades do sistema, em azul as classes Enum. Os atributos em vermelho são regrados para não se repetir no banco de dados (unique = true) e os atributos que possuem o “*” (asterisco), são os que não podem estar vazios (nullable = false).
   	As entidades usuário e role não estão relacionadas com outras por serem entidades apenas para gerenciar a autenticação no sistema. Não é possível cadastrar ou deletar roles por enquanto, existem apenas o ROLE_USER e o ROLE_ADMIN por padrão.
   
## Entidade e relacionamento
   ![Entidade e relacionamento](https://i.imgur.com/lxojiTL.png)
   
   	Diagrama que mostra a relação das tabelas diretamente do Banco de dados, existe uma tabela não inclusa no diagrama por ser uma não relacional na qual somente gerencia os id's das entidades.
   
## Camadas do sistema
   ![Camadas do sistema](https://i.imgur.com/fTe3tHX.png)
   
   	O sistema é composto por duas camadas principais, Frontend e Backend, uma não funciona corretamente sem a outra. O Frontend vai se comunicar com o Backend através de requisições HTTP . O Backend possui 4 camadas: Controladores, serviços, repositórios (acesso a dados) e Entidades. 
	Os controladores vão receber a requisição e determinar para qual entidade foi direcionada e qual o verbo (PUT, POST, GET, DELETE). O controlador então deve repassar para a camada de serviço e caso necessário transformar o objeto DTO em Entidade. O Serviço deve então executar os passos necessários para executar a instrução e em seguida registrar no Banco de dados através da camada de acesso a dados. 
	Caso a instrução seja um GET o Controlador pedirá para o serviço e o serviço para o acesso a dados, em seguida, a resposta é devolvida para o serviço e o serviço transforma a Entidade em DTO para enviar para o Controlador.
	
## Deploy
   ![Deploy](https://i.imgur.com/XHaC1Yv.png)
   
   	O deploy do sistema é completamente manual por enquanto, então, para executar o deploy da aplicação é necessário um passo a passo cuidadoso.
   	1. Primeiramente é necessário o commit no repositório no qual o sistema está sendo versionado, atualmente é usado o GitHub.
   	2. O segundo passo é o Build da imagem no Docker, no repositório há duas pastas, o Frontend e o Backend, o Build das imagens devem ser feitos separadamente, uma imagem para o Backend e outra para o Frontend, após o build execute o push para a imagem ser armazenada na nuvem do Docker, o Docker Hub.
   	3. O terceiro passo é rodar a imagem Docker em container colocando as variáveis de ambiente necessárias, primeiro o Backend e depois o Frontend.


   
  
    

