import logoImg from "../../assets/logo.svg";

import { Container, Content } from "./styles";

type HeaderProps = {
  handleOpenNewTransactionModal(): void;
};

export const Header = ({ handleOpenNewTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
