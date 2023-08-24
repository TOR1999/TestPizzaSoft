import { styled } from "styled-components";
import { CardUser } from "./CardUser";

const CardUsersContainer = styled.div`
  width: 100%;
  padding: 5px;
`;

export const CardsUsers = ({ handleChange, handleDelete, dataUsers }) => {
  return (
    <CardUsersContainer>
      {dataUsers.map((user) => {
        return (
          <CardUser
            key={user.id}
            user={user}
            onClick={handleChange(user)}
            onDelete={handleDelete(user)}
          />
        );
      })}
    </CardUsersContainer>
  );
};
