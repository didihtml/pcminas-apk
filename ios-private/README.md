# IPA privado para iPhone

Este projeto abre https://puc-minas-main-nu.vercel.app/ em uma janela própria no iOS. A versão web precisa estar acessível para funcionar; recursos dependentes do navegador devem ser testados no iPhone.

Para gerar o IPA sem assinatura, envie este projeto e o fluxo `.github/workflows/ios-privado.yml` ao GitHub. Em **Actions**, selecione **Gerar IPA privado** e execute **Run workflow**. Ao terminar, baixe o artefato **PUCMinas-IPA-sem-assinatura** e extraia o arquivo `.ipa`.

O IPA precisa ser assinado e instalado no iPhone pelo Sideloadly ou AltStore com a conta Apple do próprio usuário. Contas gratuitas exigem renovação periódica. A compilação na nuvem e a instalação em um iPhone precisam ser verificadas antes de distribuir o aplicativo.
