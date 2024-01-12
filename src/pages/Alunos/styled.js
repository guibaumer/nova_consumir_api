import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  h2 {
    margin-bottom: 30px;
  }

  p {
    /* margin-bottom: 10px; */
  }

  span {
    display: flex;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin: 10px 0;
  }
  div p {
    width: 130px;
    height: 40px;
    margin: 0px;
    padding: 5px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    min-width: 70px;
  }
  div p:nth-child(3) {
    background-color: blanchedalmond;
    justify-content: center;
    width: 60px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 60px;
    padding: 5px;
    border: 1px solid #000;
  }


  @media all and (max-width: 485px) {
    div {
      flex-direction: column;
      width: 98%;

      p {
        width: 100%;
      }
      p:nth-child(3) {
        width: 100%;
      }
      span {
        background-color: red;
        width: 100%;

        button {
          width: 100%;
        }
      }
    }
  }

  @media all and (max-width: 350px) {
    div {
      flex-direction: column;
      width: 98%;

      p {
        width: 100%;
      }
      p:nth-child(3) {
        width: 100%;
      }
    }
  }
`;
