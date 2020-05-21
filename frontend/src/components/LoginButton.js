import React, { Component } from "react";
import styled from 'styled-components';

 
export default class Button extends Component {
 render() {
     return <ButtonContainer>
         <Title>Login</Title>
     </ButtonContainer>;
   }
 };

const ButtonContainer = styled.button`
  height: 35px;
  width: 100px;
  backgroun-color: #00b300;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;
