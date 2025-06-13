import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@ui-kit$': '<rootDir>/projects/ui-kit/src/public-api.ts',
    '^@ui-kit/(.*)$': '<rootDir>/projects/ui-kit/src/lib/$1',
    '^@styles$': '<rootDir>/projects/styles/src/public-api.ts',
    '^@styles/(.*)$': '<rootDir>/projects/styles/src/lib/$1',
  },
} satisfies Config;
