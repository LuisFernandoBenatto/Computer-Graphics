# Implementação: Animação com WebGL e Three.js

<p>Professor: Wellington Della Mura</p>
<p>Disciplina: Computação Gráfica</p>

#### Criar uma animação utilizando WebGL e a biblioteca Three.js que siga os seguintes critérios:

- Utilizar animação com RequestAnimationFrame
    - [requestAnimationFrame(animate);](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L68)
    - [requestAnimationFrame(renderScene);](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L149) 
- Utilize pelo menos 3 tipos diferentes de geometrias
    - [Cube - ⬜](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L419L431)
    - [Sphere - ⚪](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L433L442)
    - [TorusKnot - 🥨](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L444L456)
- Utilize pelo menos 2 tipos de materiais
    - [THREE.ShaderMaterial({});](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L323)
    - [THREE.MeshLambertMaterial({});](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L343)
    - [HREE.MeshStandardMaterial({});](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L422)
- Carregue pelo menos 1 textura
    - [Textura](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L339L349)
- Possua pelo menos 2 fontes de iluminação
    - [THREE.HemisphereLight();](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L226L232)
    - [THREE.DirectionalLight();](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L239L261)
- Carregue pelo menos um modelo externo
    - [Flamingo - 🦩](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L364L372)
    - [Stork - 🦤](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L374L382)
    - [Parrot - 🦜](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L384L392)
- Realize a criação de objetos dinâmicos  
    - [THREE.GLTFLoader();](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L351L362)
    - [Add Flamingo - 🦩](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L101L104)
    - [Add Stork - 🦤](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L109L112)
    - [Add Parrot- 🦜](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L105L108)
- Possua algum tipo de interação com o usuário (mouse ou teclado)
    - [Controle de luz do cenário](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L93L100)
    - [THREE.TrackballControls();](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L306L313)
    - [dat.GUI();](https://github.com/LuisFernandoBenatto/Computer-Graphics/blob/main/src/animation/js/main.js#L126L135)



## Animação

A animação trata-se de um projeto que faz uso da biblioteca Three.js, a animação em questão aborda alguns controles básicos de iluminação do cenário e a criação de objetos que trafegam pela tela em um looping dentro de um espaço determinado.  

**Observação**: A animação já inicia com três flamingos. A criação de um novo objeto (de uma nova ave) é gerada totalmente de forma randômica. 
 
 
 ## Exemplos
 
 ![animatioThreejs_01](https://user-images.githubusercontent.com/49990149/188483152-ea1c9729-2d27-44f7-a9be-a300f343501b.png)
 ![animatioThreejs_02](https://user-images.githubusercontent.com/49990149/188483603-54661d4a-f9ce-4c26-a84b-3b999b0a6d86.png)
![animatioThreejs_03](https://user-images.githubusercontent.com/49990149/188484289-73e49c23-5c32-44cc-bc60-b8476bf5bbad.png)
![animatioThreejs_04](https://user-images.githubusercontent.com/49990149/188484349-07284dce-12eb-42ef-a11a-334c67b59a94.png)
![animatioThreejs_05](https://user-images.githubusercontent.com/49990149/188484395-66518fa0-2c43-4478-8eac-810c993258fe.png)
![animatioThreejs_06](https://user-images.githubusercontent.com/49990149/188484407-0a5f6e10-1558-4c21-a140-1417b5bf1e93.png)

## Trocando o arquivo JS
```html
    De: <script src="./js/main.js"></script>
    Para: <script src="./js/main_test.js"></script>
```
**Observação**: Ao invés da animação iniciar com três flamingos, agora ela inicia com três cavalos.

