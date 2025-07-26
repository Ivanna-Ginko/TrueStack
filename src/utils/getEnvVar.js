import dotenv from 'dotenv';

dotenv.config();

// export function getEnvVar(name, defaultValue) {
//   const value = process.env[name];

//   if (value) return value;

//   if (defaultValue) return defaultValue;

//   throw new Error(`Missing: process.env['${name}'].`);
// }

export function getEnvVar(name) {
  if (!process.env[name]) {
    console.warn(
      `Warning: process.env['${name}'] is missing, returning empty string.`,
    );
    return '';
  }
  return process.env[name];
}
