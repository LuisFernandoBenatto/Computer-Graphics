# Protocolo de processamento e interpretação de imagens

### Objetivo: 
- Implementar um contador de objetos considerando as amostras de imagens fornecidas.
### Ferramentas: 
- Implementação utilizando Python e OpenCV

### Requisitos:
1. Criação de um protocolo específico para a interpretação das imagens contendo as etapas a seguir:
    
    a. __Aquisição das imagens__:  quais equipamentos, parâmetros e formatos foram utilizados para digitalização da imagem?
    
    b. __Pré-processamento__: a imagem precisou ser tratada previamente para a próxima etapa? Quais filtros foram utilizados? 
    
    c. __Segmentação__: como foram segmentados os elementos da imagem? Quais algoritmos foram utilizados?
    
    d. __Interpretação__: qual a estratégia utilizada para a contagem dos objetos?
2. Implementação do protocolo utilizando Python e OpenCV.
3. Experimento para a validação do método.
   
    a. Descrição do problema
   
    b. Descrição do experimento
   
    c. Amostras utilizadas para o experimento
   
    d. Resultados obtidos

<!-- 
    imagem -> brickImage_01.jpeg == 32 ->  FAIL 30
    imagem -> brickImage_02.jpeg == 28 -> FAIL

    imagem -> brickImage_03.jpeg == 36 -> OK

    imagem -> brickImage_04.jpeg == 38 -> FAIL
    
    imagem -> brickImage_05.jpeg == 38 -> OK
    imagem -> brickImage_06.jpeg == 45 -> OK
    imagem -> brickImage_07.jpeg == 28 -> OK
    imagem -> brickImage_08.jpeg == 36 -> OK
    imagem -> brickImage_09.png == 99 -> OK
    imagem -> brickImage_10.webp == 70 -> OK


    imagem -> paredeExternaUenpComSol.jpeg == 60 -> OK
    imagem -> paredeExternaUenp.jpeg == 65 -> OK
    imagem -> pisoSegundoAndarUenp.jpeg == 47 -> OK
 -->