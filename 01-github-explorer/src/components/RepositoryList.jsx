import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

//https://api.github.com/orgs/rocketseat/repos

export function RepositoryList() {
    const [repositories, setRepositories] = useState([]);
//useEffect serve para disparar uma ação quando algo acontecer na minha aplicação
useEffect(() => {
    fetch('https://api.github.com/users/uchoamaster/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
}, [repositories]);

    return(
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                {repositories.map(repository => {
                    return  <RepositoryItem key={repository.name} repository={repository}/>
                    } )}

            </ul>
        </section>
    );
}