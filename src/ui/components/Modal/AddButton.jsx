import plus from 'ui/icons/plus.svg';
import styled from 'styled-components';
import { useModal } from 'ui/hooks/useModal';
const StyledDiv = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--gradient);
  border-radius: 50%;
`;

export const AddButton = () => {
  const { open, isOpen } = useModal();

  const handleOpen = () => {
    open();
    console.log(isOpen);
  };
  return (
    <StyledDiv onClick={handleOpen}>
      <img src={plus} alt="add" />
    </StyledDiv>
  );
};
