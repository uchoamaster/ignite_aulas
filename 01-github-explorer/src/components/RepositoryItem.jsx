export function RepositoryItem(props) {
    return(
        <li>
        <strong>{props.repository ?? 'Default'} </strong>
        <p>Forms in React</p>
        <a href="#">
            Acessar Repositório
        </a>
    </li>
    );
}