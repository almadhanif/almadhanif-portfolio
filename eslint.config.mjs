import next from 'eslint-config-next';

const config = [...next, { ignores: ['out/**', '.next/**', 'scripts/**'] }];
export default config;
