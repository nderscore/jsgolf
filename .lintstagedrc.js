module.exports = {
  '!(generated).{js,mjs,jsx,ts,tsx}': ['eslint --fix --max-warnings 0'],
  '*.{json,html,md,mdx}': ['prettier --write'],
};
