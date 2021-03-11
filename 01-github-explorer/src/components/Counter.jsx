import { useState } from 'react';
//Imutabilidade
//aqui o espaço na memoria sofre alteração como um todo, funciona mas ocorre isso.
//usuarios = [ 'diegos3', 'diegosf', 'danileao']
//usuarios.push('rafacamarda')

//este é  o conceito de imutabilidade, eu crio um espaço novo na memoria do que alterar um espaço que ja existe na memoria
//novoUsuarios = [... usuarios, 'rafacamarda']

export function Counter() {

const [counter, setCounter] = useState(0);


function increment() {
    setCounter(counter +1);
}

    return (
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment}>Increment</button>
        </div>
    );
}