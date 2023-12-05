import styled from 'styled-components';


const  Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: ${props=>props.he};
max-width: 2000px;
min-width: 500px;
margin-left:auto;
margin-right: auto;
background-color: gray;
`;






// 스타일 추가 후 익스포트 해주세요
export { Container};