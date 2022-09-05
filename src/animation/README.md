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
 