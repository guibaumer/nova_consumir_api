import styled from 'styled-components';

export const Header = styled.header`
  background-color: #730202;
  color: #fff;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
  }
  li {
    margin: 5px;
    text-align: center;
  }
  button {
    padding: 3px 5px;
    font-size: 18px;
    text-transform: uppercase;
    border: none;
    background-color: #fff;
    color: #000;
    border-radius: 2px;
  }
  h1:hover {
    text-shadow: 0px 0px 3px #fff;
  }

  @media all and (max-width: 325px) {
    h1 {
      font-size: 30px;
    }
    padding: 15px;
  }

`;
