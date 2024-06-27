export const standardSizes = {
  xs: 2,
  sm: 5,
  md: 10,
  lg: 15,
  xl: 25,
} as const;

export const colors = {
  primary: '#000',
  secondary: '#fff',
  accent: '#f00',
  background: '#fff',
  text: '#000',
} as const;

export const standardShadows = {
  0: '0 0 0 rgba(0,0,0,0.12), 0 0 0 rgba(0,0,0,0.24)',
  1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
} as const;

export const transitionTimes = {
  fast: '0.2s',
  medium: '0.4s',
  slow: '0.6s',
  debug: '5s',
} as const;
