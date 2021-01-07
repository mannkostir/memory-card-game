import styled from 'styled-components';

export const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  align-items: center;
`;

export const StyledInput = styled.input`
  position: relative;
  display: inline-block;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 0 0.8em;
  height: 100%;
  width: 100%;
  font-size: 1em;
  letter-spacing: 0.1em;
  font-weight: 600;
  border-radius: 5px;
  &[data-valid='false'] {
    border: 3px solid ${({ theme }) => theme.colors.failure};
    outline: none;
  }
  &[data-valid='true'] {
    border: 3px solid ${({ theme }) => theme.colors.success};
    outline: none;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  height: 2.5em;
  margin-bottom: 4em;
  width: 100%;
`;

export const RevealPasswordIcon = styled.label`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.5em;
  bottom: 0;
  user-select: none;
  cursor: pointer;
`;
