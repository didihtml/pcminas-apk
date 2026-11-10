# Mapeamento das referências — PUC Minas Mobile

Referência: arquivo ZIP fornecido na conversa, com 66 imagens. A numeração abaixo segue a ordem alfabética dos nomes dentro do ZIP, não a ordem de navegação. As capturas incluem dados pessoais; eles não devem ser copiados para dados de outros usuários.

## Fluxos identificados

| Área | Telas ou estados nas imagens | Situação neste projeto |
|---|---|---|
| Menu | Perfil, reconhecimento facial, credenciais, financeiro, bolsas, serviços, ajuda, carreiras, A PUC Minas, configurações e sair (3) | Menu existe. Carreiras abre o site oficial; configurações possui telas de opções e informações disponíveis no navegador. |
| Reconhecimento facial | Instruções, carregamento, câmera e passo 1 de 4 (1, 2, 5) | Instruções e câmera existem. As quatro fases atuais avançam por tempo; não realizam validação facial. As referências não mostram as demais fases nem o resultado final. |
| Credenciais | Código de pessoa; PUC Mail, Office/Teams, Canvas, Wi-Fi, CAPES, laboratórios e Azure (4, 6, 9, 11–14) | Tela e cartões existem. Código e email são gerados no aplicativo e não confirmados pela instituição. As credenciais oficiais não estão integradas. |
| Acessos externos | Recuperação de senha, Google, Microsoft, Canvas e Azure (7, 8, 10, 15–17, 19) | Existem links externos para serviços; a página intermediária de recuperação é local. Imagens de autenticação pertencem a serviços externos e os estados dependem da sessão do usuário. |
| Financeiro | Menu, boletos, negociação, período do plano de estudos e declaração (18, 20–24, 28) | Estruturas visuais existem; não há integração de parcelas, situação de pagamento ou documentos financeiros. |
| Bolsas | Lista e aviso de termos (25, 26) | Categoria e tela de adesão existem; a consulta de termos não está integrada. |
| Solicitação de serviços | Estado vazio e abertura de chamado com categorias (27, 29, 34) | Tela inicial existe; abrir chamado ainda não está integrado. Falta identificação do destino e do serviço responsável. |
| Central de ajuda | Lista, assistente virtual, Fale Conosco, ouvidoria e WhatsApp (30–33, 35–40, 47) | Lista e formulário inicial do assistente existem; Fale Conosco e Ouvidoria abrem os sites oficiais. Atendimento virtual e WhatsApp ainda não estão integrados. |
| PUC Carreiras | Página inicial e seção para estudantes (41, 42) | O item abre o site oficial em uma nova aba. |
| A PUC Minas | Página principal, missão e valores, reitoria, pesquisa e extensão (43–46, 48–62, 65) | A PUC e Missão e Valores existem. Reitoria, pesquisa e extensão aparecem no menu, mas ainda não navegam. Referências incluem páginas web externas. |
| Configurações | Manter conectado, notificações, configuração do dispositivo e detalhes do dispositivo (63, 64, 66) | Telas de configurações e informações disponíveis no navegador foram adicionadas. Sessão persistente e notificações estão indisponíveis. |

## Fluxo de navegação observado

- Menu → Reconhecimento facial → instruções → câmera → quatro etapas indicadas; só o primeiro passo está visível nas referências.
- Menu → Credenciais → cartões → serviços externos ou recuperação de senha.
- Menu → Financeiro → boletos / negociação / plano de estudos / declaração → seleção ou visualização correspondente.
- Menu → Bolsas → adesão ao termo → aviso ou conteúdo do termo.
- Menu → Solicitação de Serviços → abrir chamado → categorias de atendimento.
- Menu → Central de ajuda → assistente / Fale Conosco / Ouvidoria / WhatsApp.
- Menu → PUC Carreiras ou A PUC Minas → seções institucionais.
- Menu → Configurações → configuração do dispositivo.

## Reclamações verificadas

- [App Store: PUC Minas Mobile](https://apps.apple.com/br/app/puc-minas-mobile/id902000970): há relatos de boletos duplicados, situações de pagamento incorretas, dificuldades de atendimento e falhas de abertura e login. O desenvolvedor respondeu a um dos relatos financeiros dizendo que houve atualizações; não é possível concluir se o problema persiste para todos os usuários.
- [Google Play: PUC Minas Mobile](https://play.google.com/store/apps/details?hl=pt_BR&id=br.pucminas): avaliação relata carregamento contínuo de vínculos, indisponibilidade da carteirinha e dificuldade de acesso a matérias, notas e solicitações.
- [AppRecs: avaliações para iOS](https://apprecs.com/ios/902000970/puc-minas-mobile): um relato menciona notificações duplicadas e problemas de leitura e inconsistência do modo escuro; é uma fonte secundária para comentários de usuários.
- G2: não foi encontrada uma página verificável de avaliações do PUC Minas Mobile nesta pesquisa.
- Reddit: não foi encontrada uma reclamação verificável especificamente sobre o aplicativo nesta pesquisa. Discussões genéricas sobre a instituição não foram tratadas como reclamações sobre o app.

## Verificação técnica e dependências

- O projeto é React/TypeScript/Vite, com API Node/Vercel e PostgreSQL via Prisma.
- O modelo Prisma versionado contém cartões de acesso; não há modelos versionados para parcelas, bolsas, notas ou declarações financeiras.
- Na implementação atual da API de login, a consulta usa código ou CPF e não verifica a senha enviada. Isso precisa ser resolvido com uma autenticação real antes de expor dados privados ou operar cobrança.
- Parte dos atalhos e telas atuais mostra conteúdo estático ou indisponível; detalhes específicos estão em seus componentes.
- As imagens não comprovam os estados de erro, acessibilidade, comportamento offline, fluxo de sucesso ou permissões de integração.
- Melhorias relacionadas às reclamações dependem de serviços reais: autenticação segura, sincronização de situação financeira, carregamento resiliente da carteirinha e canal de suporte funcional. Não se pode afirmar que elas estejam resolvidas apenas pela reprodução visual.

## Informações necessárias antes de completar funções

1. Identificar o serviço autorizado para login, carteirinha, notas, boletos, bolsas, chamados e documentos; fornecer documentação ou acesso de desenvolvimento apropriado, sem enviar senhas ou tokens pelo chat.
2. Confirmar os endereços oficiais ou fornecer as referências para PUC Carreiras, Central de ajuda, abertura de chamado, pesquisa e extensão, especialmente quando a tela fotografada é um site externo.
3. Fornecer capturas das fases 2–4 e do resultado do reconhecimento facial, e definir se haverá reconhecimento real.
4. Definir o comportamento das opções de configurações (sessão, notificações, dados e cópia de informações do dispositivo).
5. Confirmar quais telas já existentes precisam de ajustes visuais: as capturas permitem comparação, mas não demonstram necessariamente todos os estados.

## Índice das imagens no ZIP

1. WhatsApp Image 2026-11-08 at 21.31.27 (1).jpeg
2. WhatsApp Image 2026-11-08 at 21.31.27 (2).jpeg
3. WhatsApp Image 2026-11-08 at 21.31.27.jpeg
4. WhatsApp Image 2026-11-08 at 21.37.00 (1).jpeg
5. WhatsApp Image 2026-11-08 at 21.37.00.jpeg
6. WhatsApp Image 2026-11-08 at 21.37.01 (1).jpeg
7. WhatsApp Image 2026-11-08 at 21.37.01 (2).jpeg
8. WhatsApp Image 2026-11-08 at 21.37.01 (3).jpeg
9. WhatsApp Image 2026-11-08 at 21.37.01 (4).jpeg
10. WhatsApp Image 2026-11-08 at 21.37.01.jpeg
11. WhatsApp Image 2026-11-08 at 21.37.02 (1).jpeg
12. WhatsApp Image 2026-11-08 at 21.37.02 (2).jpeg
13. WhatsApp Image 2026-11-08 at 21.37.02 (3).jpeg
14. WhatsApp Image 2026-11-08 at 21.37.02 (4).jpeg
15. WhatsApp Image 2026-11-08 at 21.37.02.jpeg
16. WhatsApp Image 2026-11-08 at 21.37.03 (1).jpeg
17. WhatsApp Image 2026-11-08 at 21.37.03 (2).jpeg
18. WhatsApp Image 2026-11-08 at 21.37.03 (3).jpeg
19. WhatsApp Image 2026-11-08 at 21.37.03.jpeg
20. WhatsApp Image 2026-11-08 at 21.37.04 (1).jpeg
21. WhatsApp Image 2026-11-08 at 21.37.04 (2).jpeg
22. WhatsApp Image 2026-11-08 at 21.37.04.jpeg
23. WhatsApp Image 2026-11-08 at 21.37.05 (1).jpeg
24. WhatsApp Image 2026-11-08 at 21.37.05 (2).jpeg
25. WhatsApp Image 2026-11-08 at 21.37.05 (3).jpeg
26. WhatsApp Image 2026-11-08 at 21.37.05 (4).jpeg
27. WhatsApp Image 2026-11-08 at 21.37.05 (5).jpeg
28. WhatsApp Image 2026-11-08 at 21.37.05.jpeg
29. WhatsApp Image 2026-11-08 at 21.37.06 (1).jpeg
30. WhatsApp Image 2026-11-08 at 21.37.06 (2).jpeg
31. WhatsApp Image 2026-11-08 at 21.37.06 (3).jpeg
32. WhatsApp Image 2026-11-08 at 21.37.06 (4).jpeg
33. WhatsApp Image 2026-11-08 at 21.37.06 (5).jpeg
34. WhatsApp Image 2026-11-08 at 21.37.06.jpeg
35. WhatsApp Image 2026-11-08 at 21.37.07 (1).jpeg
36. WhatsApp Image 2026-11-08 at 21.37.07 (2).jpeg
37. WhatsApp Image 2026-11-08 at 21.37.07 (3).jpeg
38. WhatsApp Image 2026-11-08 at 21.37.07 (4).jpeg
39. WhatsApp Image 2026-11-08 at 21.37.07 (5).jpeg
40. WhatsApp Image 2026-11-08 at 21.37.07.jpeg
41. WhatsApp Image 2026-11-08 at 21.37.08 (1).jpeg
42. WhatsApp Image 2026-11-08 at 21.37.08 (2).jpeg
43. WhatsApp Image 2026-11-08 at 21.37.08 (3).jpeg
44. WhatsApp Image 2026-11-08 at 21.37.08 (4).jpeg
45. WhatsApp Image 2026-11-08 at 21.37.08 (5).jpeg
46. WhatsApp Image 2026-11-08 at 21.37.08 (6).jpeg
47. WhatsApp Image 2026-11-08 at 21.37.08.jpeg
48. WhatsApp Image 2026-11-08 at 21.37.09 (1).jpeg
49. WhatsApp Image 2026-11-08 at 21.37.09 (2).jpeg
50. WhatsApp Image 2026-11-08 at 21.37.09 (3).jpeg
51. WhatsApp Image 2026-11-08 at 21.37.09 (4).jpeg
52. WhatsApp Image 2026-11-08 at 21.37.09 (5).jpeg
53. WhatsApp Image 2026-11-08 at 21.37.09.jpeg
54. WhatsApp Image 2026-11-08 at 21.37.10 (1).jpeg
55. WhatsApp Image 2026-11-08 at 21.37.10 (2).jpeg
56. WhatsApp Image 2026-11-08 at 21.37.10 (3).jpeg
57. WhatsApp Image 2026-11-08 at 21.37.10 (4).jpeg
58. WhatsApp Image 2026-11-08 at 21.37.10 (5).jpeg
59. WhatsApp Image 2026-11-08 at 21.37.10.jpeg
60. WhatsApp Image 2026-11-08 at 21.37.11 (1).jpeg
61. WhatsApp Image 2026-11-08 at 21.37.11 (2).jpeg
62. WhatsApp Image 2026-11-08 at 21.37.11 (3).jpeg
63. WhatsApp Image 2026-11-08 at 21.37.11 (4).jpeg
64. WhatsApp Image 2026-11-08 at 21.37.11 (5).jpeg
65. WhatsApp Image 2026-11-08 at 21.37.11.jpeg
66. WhatsApp Image 2026-11-08 at 21.37.12.jpeg
