import { useEffect } from 'react';

// If you pass an empty array of dependencies to useEffect, ESLint will start
// bitching about it. Warnings are scary, hence this hook exists.

export const useMount = (func) => useEffect(func, []);
