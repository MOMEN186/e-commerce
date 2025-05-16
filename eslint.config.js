//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,

  {
    rules: {
      'sort-imports': ['error', {
        ignoreDeclarationSort: true,  // still sort your import *lines*
        ignoreMemberSort: true,        // but don’t enforce { A, B, C } ordering
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      }],
    },
  },
];
