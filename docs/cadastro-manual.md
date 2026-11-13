# Cadastro manual de registros

O painel `/admin-registros.html` permite localizar um aluno pelo ID da tabela `cards` e incluir ou editar suas disciplinas e boletos. A chave digitada no painel é mantida apenas na memória da página.

## Configuração

1. Configure `DATABASE_URL` e `STUDENT_RECORDS_ADMIN_TOKEN` no servidor. Gere uma chave longa e aleatória e mantenha-a fora do repositório.
2. Aplique, no banco correto, os scripts `prisma/student-data.sql` e `prisma/academic-disciplines.sql` após revisar os arquivos e fazer um backup. Sem as três tabelas `student_contacts`, `student_bills` e `student_disciplines`, o login não retorna os registros.
3. Publique os arquivos e acesse `/admin-registros.html` por HTTPS. Informe a chave e o ID do aluno, consulte e cadastre os dados confirmados.
4. O aluno precisa entrar novamente para carregar os dados atualizados. O link de boleto é opcional e deve começar com HTTPS; não há emissão ou confirmação automática de pagamentos.

**Antes de cadastrar dados reais:** o endpoint atual de login (`api/auth/login.ts`) consulta o usuário sem verificar a senha. Isso permite que terceiros com um CPF ou identificador consultem informações da conta. Corrija e valide a autenticação e a autorização antes de usar dados pessoais, acadêmicos ou financeiros reais. A chave administrativa não protege o login do aluno.

O painel exige sempre a variável `STUDENT_RECORDS_ADMIN_TOKEN` e não depende do bloqueio por pagamento. O cadastro e a correção são manuais; situação de pagamento e notas só devem ser informadas após conferência com uma fonte confiável.
