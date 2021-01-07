import React from 'react';

const createResource = (asyncFn = () => Promise) => {
  let status = 'pending';
  let result;

  const promise = asyncFn().then(
    (payload) => {
      status = 'success';
      result = payload;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      switch (status) {
        case 'pending': {
          throw promise;
        }
        case 'error': {
          throw result;
        }
        case 'success': {
          return result;
        }
        default: {
          return null;
        }
      }
    },
  };
};

const imgCache = new Map();

const loadImage = (src = '') => {
  let resource = imgCache.get(src);

  if (resource) return resource;

  resource = createResource(() => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();

      img.src = src;

      img.addEventListener('load', () => resolve(src));

      img.addEventListener('error', () =>
        reject(new Error(`Failed to load an image ${src}`))
      );
    });
  });

  imgCache.set(src, resource);

  return resource;
};

const SuspendedImage = ({ ...args }) => {
  loadImage(args.src).read();
  return <img alt="" {...args} />;
};

export default SuspendedImage;
