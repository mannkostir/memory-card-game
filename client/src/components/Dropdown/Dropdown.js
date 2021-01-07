import { useMount } from 'hooks/useMount';
import React, { createContext, useState, useContext, useRef } from 'react';
import { useEffect } from 'react';
import {
  DropdownWrapper,
  StyledDropdownContent,
  StyledToggleTrigger,
} from './Dropdown.styles';

const DropdownContext = createContext();

const Dropdown = ({
  children,
  initialState = false,
  toggleOnClick = true,
  toggleOnMouseOver = false,
  ...args
}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const dropdown = useRef();

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    isOpen
      ? dropdown.current.classList.add('dropdown_opened')
      : dropdown.current.classList.remove('dropdown_opened');
  }, [isOpen]);

  useMount(() => {
    document.body.addEventListener('click', (event) => {
      if (!dropdown.current) return;

      if (
        dropdown.current.classList.contains('dropdown_opened') &&
        !dropdown.current.contains(event.target)
      )
        toggle();
    });
  });

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, toggle, toggleOnClick, toggleOnMouseOver }}
    >
      <DropdownWrapper ref={dropdown} className="dropdown" {...args}>
        {children}
      </DropdownWrapper>
    </DropdownContext.Provider>
  );
};

const ToggleTrigger = ({ children, ...args }) => {
  const { toggle, toggleOnClick, toggleOnMouseOver, isOpen } = useContext(
    DropdownContext
  );

  return (
    <StyledToggleTrigger
      onClick={toggleOnClick ? toggle : null}
      onMouseOver={toggleOnMouseOver ? toggle : null}
      aria-label={isOpen ? 'collapse' : 'expand'}
      {...args}
    >
      {children}
    </StyledToggleTrigger>
  );
};

const Content = ({ children, style, ...args }) => {
  const { isOpen, toggleOnMouseOver, toggle } = useContext(DropdownContext);

  return (
    <StyledDropdownContent
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
        ...style,
      }}
      onClick={toggle}
      onMouseLeave={toggleOnMouseOver ? toggle : null}
      {...args}
    >
      {isOpen && children}
    </StyledDropdownContent>
  );
};

Dropdown.ToggleTrigger = ToggleTrigger;
Dropdown.Content = Content;

export default Dropdown;
