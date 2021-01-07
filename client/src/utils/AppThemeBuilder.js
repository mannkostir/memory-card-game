export default class AppThemeBuilder {
  constructor() {
    this.defaultStyles = {
      backgroundColor: 'transparent',
      fontColor: 'inherit',
      borderColor: 'transparent',
      boxShadowColor: 'inherit',
    };

    this.theme = {};
  }

  addHeroStyles(styles = this.defaultStyles) {
    if (this.theme.hero) return this;

    this.theme.hero = { ...this.defaultStyles, ...styles };

    return this;
  }

  addPrimaryBlockStyles(styles = this.defaultStyles) {
    if (this.theme.primaryBlock) return this;

    // let mods = {};

    // const baseStyles = Object.entries(styles).reduce((acc, [el, style]) => {
    //   if (typeof curr === 'object') {
    //     mods[el] = style;
    //   }

    //   acc[el] = style;

    //   return acc;
    // }, {});

    const { hover, ...baseStyles } = styles;

    this.theme.primaryBlock = {
      ...this.defaultStyles,
      ...baseStyles,
      hover: { ...baseStyles, ...hover },
    };

    return this;
  }

  addButtonStyles(styles = this.defaultStyles) {
    if (this.theme.button) return this;

    const { hover, active, disabled, ...baseStyles } = styles;

    this.theme.button = {
      ...this.defaultStyles,
      ...baseStyles,
      hover: { ...baseStyles, ...hover },
      active: { ...baseStyles, ...active },
      disabled: { ...baseStyles, ...disabled },
    };

    return this;
  }

  addNavLinkStyles(styles = this.defaultStyles) {
    if (this.theme.navLink) return this;

    const { hover, active, ...baseStyles } = styles;

    this.theme.navLink = {
      ...this.defaultStyles,
      ...baseStyles,
      hover: { ...baseStyles, ...hover },
      active: { ...baseStyles, ...active },
    };

    return this;
  }

  addInputStyles(styles = this.defaultStyles) {
    if (this.theme.input) return this;

    const { focus, ...baseStyles } = styles;

    this.theme.input = {
      ...this.defaultStyles,
      ...baseStyles,
      focus: { ...baseStyles, ...focus },
    };

    return this;
  }

  addCardStyles(styles = this.defaultStyles) {
    if (this.theme.card) return this;

    this.theme.card = { ...this.defaultStyles, ...styles };

    return this;
  }

  addCustomField(fieldKey = '', styles = this.defaultStyles) {
    if (this.theme[fieldKey]) return this;

    this.theme[fieldKey] = { ...styles };

    return this;
  }

  build() {
    return this.theme;
  }
}
