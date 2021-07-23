import { Container } from "./styles";


export function TransactionsTable() {
    return(
    <Container>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
        </table>
    </Container>
    );
}