import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  label {
    font-size: 20px;
    display: block;
    text-align: left;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 10px;
    width: 95%;
  max-width: 500px;
  }

  input {
  height: 40px;
  width: 100%;
  font-size: 20px;
  padding: 0px 5px;
}


h2 {
  margin: 30px 0px 20px 0px;
}

input[type=submit] {
  margin-top: 10px;
  background-color: #F2A663;
  border: none;
  width: 95%;
  max-width: 500px;
  margin-bottom: 30px;
}

`;
