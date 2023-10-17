import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiCalendar2Fill } from 'react-icons/ri';

import {
  StyledPicker,
  DropdownIndicator,
  CustomSelect,
  CustomStyles,
  StyledPlusMin,
  StyledSpanExpenses,
  StyledSpanIncome,
  StyledWrap,
  StyledWrapper,
  StyledForm,
  StyledInput,
  StyledDiv,
  InputContainer,
  ButtonContainer,
} from './AddTransactionForm.styled';
import Switch from 'react-switch';

import Button from 'ui/components/shared/Button';
import { selectCategories } from 'redux/transactions/selectors';
import { fetchCategories } from 'redux/transactions/operations';
import { useMyContext } from 'context/useMyContext';

export const AddTransactionForm = () => {
  const [checked, setChecked] = useState(true);
  const categories = useSelector(selectCategories);
  const [selectCategory, setSelectCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now);
  const { close } = useMyContext();
  const dispatch = useDispatch();

  const formattedCategories = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };

  const onChangeCategory = val => {
    setSelectCategory(val);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <h2>Add transaction</h2>
      <StyledWrap>
        <StyledSpanIncome checked={checked}>Income</StyledSpanIncome>
        <Switch
          title="Select your type of transaction"
          className="switch"
          onChange={handleChange}
          checked={checked}
          width={80}
          height={40}
          onHandleColor="#FF868D"
          offHandleColor="#FFB627"
          uncheckedIcon={false}
          checkedIcon={false}
          offColor="#FFFFFF"
          onColor="#FFFFFF"
          handleDiameter={44}
          uncheckedHandleIcon={<StyledPlusMin>+</StyledPlusMin>}
          checkedHandleIcon={<StyledPlusMin>-</StyledPlusMin>}
        />
        <StyledSpanExpenses checked={checked}>Expense</StyledSpanExpenses>
      </StyledWrap>
      <StyledForm>
        <StyledDiv>
          {checked ? (
            <CustomSelect
              options={formattedCategories}
              value={selectCategory}
              onChange={onChangeCategory}
              classNamePrefix="my-select"
              aria-label={'Select category'}
              components={{ DropdownIndicator }}
              placeholder="Select category"
              menuIsOpen={isDropdownOpen}
              styles={CustomStyles}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              title="Choose your category"
            />
          ) : null}
          <InputContainer>
            <StyledInput
              title="Enter your amount"
              type="text"
              placeholder="0.00"
            />
            <StyledPicker
              name="date"
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
              shouldCloseOnSelect={true}
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              showIcon={false}
              title="Choose the date"
            />
            <RiCalendar2Fill
              className="calendar-icon"
              style={{
                width: '24',
                height: '24',
              }}
            />
          </InputContainer>
          <StyledInput
            title="You can leave your comment here"
            placeholder="Comment"
            type="text"
          />
        </StyledDiv>
      </StyledForm>
      <ButtonContainer>
        <Button title="to add your transaction" variant="login">
          Add
        </Button>
        <Button title="Cancel the operation" variant="cancel" onClick={close}>
          Cancel
        </Button>
      </ButtonContainer>
    </StyledWrapper>
  );
};
