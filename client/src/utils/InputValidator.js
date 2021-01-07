const errorTextMessages = {
  hasLength: {
    min: (minLength) => ({
      EN: `Should be more than or equal to ${minLength} symbols`,
      RU: `Количество символов должно быть больше или равно ${minLength}`,
    }),
    max: (maxLength) => ({
      EN: `Should be no more than ${maxLength} symbols`,
      RU: `Количество символов не должно превышать ${maxLength}`,
    }),
    exact: (exactLength) => ({
      EN: `Should be exactly ${exactLength} symbols`,
      RU: `Количество символов должно точно равняться ${exactLength}`,
    }),
  },
  isAlpha: () => ({ EN: `Should contain only alphabetic letters`, RU: `` }),
  isEmail: () => ({
    EN: `Incorrect email address`,
    RU: `Неверный адрес электронной почты`,
  }),
};

// Mainly used for autocomplete
export const inputValidatorRules = Object.freeze({
  hasLength: {
    min: 0,
    max: 0,
    exact: 0,
  },
  isAlpha: false,
  isEmail: false,
});

export const inputValidatorHandlers = Object.freeze({
  onValidationFinish: (errors = [{ checkName: '', message: '' }]) => {},
});

export const inputValidatorSettings = Object.freeze({
  currentLanguage: 'EN',
});

// TODO: Refactor the class with the Interface pattern
// TODO: Add support for different languages

export default class InputValidator {
  constructor(
    input,
    validatorRules = inputValidatorRules,
    validatorHandlers = inputValidatorHandlers,
    validatorSettings = inputValidatorSettings
  ) {
    this.state = {
      input,
      errors: [],
    };

    this.validatorRules = { ...inputValidatorRules, ...validatorRules };
    this.validatorHandlers = {
      ...inputValidatorHandlers,
      ...validatorHandlers,
    };
    this.validatorSettings = {
      ...inputValidatorSettings,
      ...validatorSettings,
    };
  }

  get isValid() {
    return !this.state.errors.length;
  }

  get errors() {
    return this.state.errors;
  }

  _addError(checkName = '', message = '') {
    this.state.errors.push({ checkName, message });
  }

  _validateCheck(checkName = '') {
    this.state.errors = this.state.errors.filter(
      (error) => error.checkName !== checkName
    );
  }

  hasLength() {
    if (typeof this.state.input.value !== 'string') {
      throw new Error('Input value must be type of string');
    }

    const methodName = this.hasLength.name;

    if (this.state.input.value.length < this.validatorRules.hasLength.min) {
      this._addError(
        methodName,
        errorTextMessages.hasLength.min(this.validatorRules.hasLength.min)[
          this.validatorSettings.currentLanguage
        ]
      );
    } else if (
      !!+this.validatorRules.hasLength.max &&
      this.state.input.value.length > this.validatorRules.hasLength.max
    ) {
      this._addError(
        methodName,
        `Should be no more than ${this.validatorRules.hasLength.max} symbols`
      );
    } else if (
      !!+this.validatorRules.hasLength.exact &&
      this.state.input.value.length !== this.validatorRules.hasLength.exact
    ) {
      this._addError(
        methodName,
        `Should be exactly ${this.validatorRules.hasLength.exact} symbols`
      );
    } else {
      this._validateCheck(methodName);
    }
  }

  isAlpha() {
    if (typeof this.state.input.value !== 'string') {
      throw new Error('Input value must be type of string');
    }

    const methodName = this.isAlpha.name;

    if (!/^[a-z]*$/gi.test(this.state.input.value)) {
      this._addError(methodName, `Should contain only alphabetic letters`);
    } else {
      this._validateCheck(methodName);
    }
  }

  isEmail() {
    if (typeof this.state.input.value !== 'string') {
      throw new Error('Input value must be type of string');
    }

    const methodName = this.isEmail.name;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.input.value)) {
      this._addError(methodName, `Incorrect email address`);
    } else {
      this._validateCheck(methodName);
    }
  }

  customCheck(
    fn = (inputValue = '') => true,
    checkName = '',
    errorMessage = ''
  ) {
    if (typeof this.state.input.value !== 'string') {
      throw new Error('Input value must be type of string');
    }

    if (!checkName) {
      throw new Error('Name for validation check must be specified');
    }

    if (fn(this.state.input.value) !== true) {
      this._addError(checkName, errorMessage || `${checkName} check failed`);
    } else {
      this._validateCheck(checkName);
    }
  }

  validate() {
    Object.entries(this.validatorRules).forEach(([methodName, methodValue]) => {
      if (!methodValue) return;
      this[methodName]();
    });

    this.state.input.dataset.valid = this.isValid;

    this.validatorHandlers.onValidationFinish(this.errors);
  }
}
