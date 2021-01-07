let timer;

const debounce = (cb) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    console.log('TIMER');
    return cb();
  }, 500);
};

export default debounce;
