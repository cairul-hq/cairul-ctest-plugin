import { join } from 'node:path';
import { option, repeat, report, selectors, value, list } from '@cairul/pdk/runner';
import { junit } from '@cairul/pdk/reports';

export default {
  command: ['ctest'],
  select: selectors({ buildDirectory: value, namePattern: value, labels: list, configuration: value }, [
    'namePattern',
    'labels',
  ]),
  build({ buildDirectory = '.', namePattern, labels, configuration }, temp) {
    return {
      args: [
        '--test-dir',
        buildDirectory,
        '--output-on-failure',
        '--output-junit',
        join(temp, 'result.xml'),
        ...option('-R', namePattern),
        ...repeat('-L', labels),
        ...option('-C', configuration),
      ],
      read: report('result.xml', junit),
    };
  },
};
