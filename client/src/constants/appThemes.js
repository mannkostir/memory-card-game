function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  [r, g, b] = [r, g, b].map((color) =>
    color <= 15 ? `0${color.toString(16)}` : color.toString(16)
  );

  return (usePound ? '#' : '') + r + b + g;
}

class ThemeBuilder {
  constructor() {
    this.theme = {
      colors: {
        background: '#ffffff',
        onBackground: '#000000',
        surface: '#ffffff',
        onSurface: '#000000',
        error: '#B00020',
        onError: '#ffffff',
      },
      ref: '',
      icon: null,
      title: { EN: '', RU: '' },
    };
  }

  darkenColor(color = '') {
    return LightenDarkenColor(color, -56);
  }

  lightenColor(color = '') {
    return LightenDarkenColor(color, 86);
  }

  addPrimaryColor({
    main = '#ffffff',
    light = this.lightenColor(main),
    dark = this.darkenColor(main),
    onPrimary = '#000000',
  }) {
    // // Possibly need to check if HEX
    // if (!main) {
    //   throw new Error('Color needs to be specified');
    // }

    this.theme.colors = {
      ...this.theme.colors,
      primary: { main, dark, light },
      onPrimary,
    };

    return this;
  }

  addSecondaryColor({
    main = '#000000',
    light = this.lightenColor(main),
    dark = this.darkenColor(main),
    onSecondary = '#ffffff',
  }) {
    // Possibly need to check if HEX
    if (!main) {
      throw new Error('Color needs to be specified');
    }

    this.theme.colors = {
      ...this.theme.colors,
      secondary: { main, dark, light },
      onSecondary,
    };

    return this;
  }

  addBackgroundColor(background = '#ffffff', onBackground = '#000000') {
    this.theme.colors = {
      ...this.theme.colors,
      background,
      onBackground,
    };

    return this;
  }

  addSurfaceColor(surface = '#ffffff', onSurface = '#000000') {
    this.theme.colors = {
      ...this.theme.colors,
      surface,
      onSurface,
    };

    return this;
  }

  addErrorColor(error = '#B00020', onError = '#ffffff') {
    this.theme.colors = {
      ...this.theme.colors,
      error,
      onError,
    };

    return this;
  }

  addIcon(icon = null) {
    this.theme.icon = icon;

    return this;
  }

  addWhatever(whatever = {}, key = '') {
    if (key && Object.keys(this.theme).includes(key)) {
      this.theme[key] = {
        ...this.theme[key],
        ...whatever,
      };
    } else {
      this.theme = {
        ...this.theme,
        ...whatever,
      };
    }

    return this;
  }

  build() {
    return this.theme;
  }
}

const COLORS = {
  black: '#000000',
  white: '#ffffff',
  success: '#008000	',
  failure: '#FF0000',
  gold: '#daa520',
  silver: '#c0c0c0',
  bronze: '#cd7f32',
};

const testTheme = new ThemeBuilder()
  .addPrimaryColor({ main: '#FFC632', onPrimary: '#505050' })
  .addSecondaryColor({ main: '#2C2C2C', onSecondary: '#e0e0e0' })
  .addBackgroundColor(
    'linear-gradient(180deg, #FFC121 40%, #FFF854 100%)',
    '#2C2C2C'
  )
  .addSurfaceColor('#e0e0e0', '#232323')
  .addWhatever(COLORS, 'colors')
  .addWhatever({
    ref: 'testTheme',
    title: { EN: 'Original Theme', RU: 'Оригинальная Тема' },
  })
  .addWhatever({ cardWidth: '' }, 'misc')
  .build();

const lightTheme = new ThemeBuilder()
  .addPrimaryColor({ main: '#e4e4e4', onPrimary: '#232323' })
  .addSecondaryColor({ main: '#505050', onSecondary: '#e5e5e5' })
  .addBackgroundColor('linear-gradient(0deg, #F0F0F0, #F0F0F0)', '#505050')
  .addSurfaceColor('#e4e4e4', '#232323')
  .addWhatever(COLORS, 'colors')
  .addWhatever({
    ref: 'lightTheme',
    title: { EN: 'Light Theme', RU: 'Светлая Тема' },
  })
  .addWhatever({ cardWidth: '' }, 'misc')
  .build();

const darkTheme = new ThemeBuilder()
  .addPrimaryColor({ main: '#232323', onPrimary: '#CACACA' })
  .addSecondaryColor({ main: '#CACACA', onSecondary: '#232323' })
  .addBackgroundColor(
    'linear-gradient(180deg, #2C2C2C 0%, #727272 100%)',
    '#e0e0e0'
  )
  .addSurfaceColor('#232323', '#CACACA')
  .addWhatever(COLORS, 'colors')
  .addWhatever({
    ref: 'darkTheme',
    title: { EN: 'Dark Theme', RU: 'Тёмная Тема' },
  })
  .addWhatever({ cardWidth: '' }, 'misc')
  .build();

export default { lightTheme, testTheme, darkTheme };
