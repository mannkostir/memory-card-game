import React from 'react';
import ReactDOM from 'react-dom';
import TestPresets from '../componentTestPreset';

class FormTests extends TestPresets {
  constructor(Component) {
    super(Component);
  }

  submitForm() {
    test('accepts onSubmit function and executes it, well, on submit', () => {
      let submitted = false;

      ReactDOM.render(
        <this.Component onSubmit={() => (submitted = true)} />,
        this.container
      );

      const form = this.container.getElementsByTagName('form')[0];
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      expect(submitted).toBe(true);
    });
  }
}

export default FormTests;
