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
  
    

