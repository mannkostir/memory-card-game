import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

export const initContainer = (container) => {
  container = document.createElement('div');
  document.body.appendChild(container);
  return container;
};

export const clearContainer = (container) => {
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
  return container;
};

class TestPresets {
  constructor(Component) {
    this.Component = Component;

    beforeEach(() => {
      this.container = initContainer(this.container);
    });

    afterEach(() => {
      this.container = clearContainer(this.container);
    });
  }

  testComponent(tests = () => {}) {
    tests();
  }

  renderWithoutChildren() {
    test('renders without content', () => {
      const tree = renderer.create(<this.Component />);
      const treeJSON = tree.toJSON();

      expect(treeJSON.children).toBeNull();
      expect(tree).toMatchSnapshot();

      // ReactDOM.render(<this.Component />, this.container);
      // expect(this.container.textContent).toBe('');
    });
  }

  renderWithChildren() {
    test('renders with content (string)', () => {
      const tree = renderer.create(<this.Component>{'Text'}</this.Component>);
      const treeJSON = tree.toJSON();

      expect(treeJSON.children[0]).toBe('Text');
      expect(tree).toMatchSnapshot();

      // ReactDOM.render(
      //   <this.Component>{'Text'}</this.Component>,
      //   this.container
      // );
      // expect(this.container.textContent).toBe('Text');
    });
    test('renders with content (html tags)', () => {
      const tree = renderer.create(
        <this.Component>
          <span>{'Text inside tag'}</span>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </this.Component>
      );
      const treeJSON = tree.toJSON();

      expect(tree).toMatchSnapshot();
      expect(treeJSON.children[0].type).toBe('span');
      expect(treeJSON.children[1].type).toBe('ul');
      expect(treeJSON.children[0].children[0]).toBe('Text inside tag');
      expect(treeJSON.children[1].type).toBe('ul');
      expect(treeJSON.children[1].children).toHaveLength(3);

      // ReactDOM.render(
      //   <this.Component>
      //     <span>{'Text inside tag'}</span>
      //     <ul>
      //       <li></li>
      //       <li></li>
      //       <li></li>
      //       <li></li>
      //     </ul>
      //   </this.Component>,
      //   this.container
      // );
      // const button = this.container.getElementsByTagName('button')[0];
      // expect(this.container.textContent).toBe('Text inside tag');
      // expect(button.childNodes[0].nodeName.toLowerCase()).toBe('span');
      // expect(button.childNodes[1].nodeName.toLowerCase()).toBe('ul');
    });
  }

  passProps() {
    test('accepts passed props', () => {
      let clicked = false;

      ReactDOM.render(
        <this.Component
          onClick={() => (clicked = true)}
          data-role={'button'}
        />,
        this.container
      );

      const button = this.container.getElementsByTagName('button')[0];

      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(clicked).toBe(true);

      expect(button.getAttribute('data-role')).toBe('button');
    });
  }
}

export default TestPresets;
