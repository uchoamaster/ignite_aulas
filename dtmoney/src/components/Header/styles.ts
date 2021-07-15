import styled from 'styled-components';

export const Container = styled.header `
background: var(--blue);
width:100%;

`;

export const Content = styled.div `
max-width: 1120px;
margin: 0 auto;
padding: 0 1rem 10rem;
display: flex;
align-items:center;
justify-content: space-between;

button{
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border:0;
    padding: 0 2rem;
}
`;