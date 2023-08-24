import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { Button, Typography, Checkbox } from "antd";

const CardUserContainer = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 25px;
  background-color: lightgray;
  margin-top: 5px;
  &:first-child {
    margin-top: 0;
  }
`;

const Title = styled(Typography.Title)`
  width: 100%;
  text-align: center;
  padding: 2px 0;
  margin: 0 !important;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 5px;
`;
const RowContainer = styled(Typography.Text)`
  display: flex;
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  &:first-child {
    margin-top: 0;
  }
`;

const OptionTitle = styled.div`
  width: 150px;
  flex-shrink: 0;
`;

const OptionValue = styled.div`
  flex-grow: 1;
`;

export const CardUser = ({ user, onClick, onDelete }) => {
  const { t } = useTranslation();
  const { numeral, name, isArchive, role, phone, birthday } = user;
  return (
    <CardUserContainer onClick={onClick}>
      <Title level={3}>
        {t("numeral")} {numeral}
      </Title>
      <InfoContainer>
        <RowContainer>
          <OptionTitle level={3}>{t("name")}</OptionTitle>
          <OptionValue level={3}>{name}</OptionValue>
        </RowContainer>
        <RowContainer>
          <OptionTitle level={3}>{t("isArchive")}</OptionTitle>
          <OptionValue>
            <Checkbox checked={isArchive} disabled></Checkbox>
          </OptionValue>
        </RowContainer>
        <RowContainer>
          <OptionTitle level={3}>{t("role")}</OptionTitle>
          <OptionValue level={3}>{t(role)}</OptionValue>
        </RowContainer>
        <RowContainer>
          <OptionTitle level={3}>{t("phone")}</OptionTitle>
          <OptionValue level={3}>{phone}</OptionValue>
        </RowContainer>
        <RowContainer>
          <OptionTitle level={3}>{t("birthday")}</OptionTitle>
          <OptionValue level={3}>{birthday}</OptionValue>
        </RowContainer>
      </InfoContainer>
      <ButtonContainer>
        <Button onClick={onDelete}>{t("delete")}</Button>
      </ButtonContainer>
    </CardUserContainer>
  );
};
