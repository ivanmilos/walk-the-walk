import { walkThePath } from '.';
import { PathMemories } from './path';

interface TestSample extends PathMemories {
    rawChart: string;
}

const validTestSamples: TestSample[] = [
    {
        rawChart: `
@---A---+
        |
x-B-+   C
    |   |
    +---+
`,
        letters: 'ACB',
        fullPath: '@---A---+|C|+---+|+-B-x',
    },
    {
        rawChart: `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
`,
        letters: 'ABCD',
        fullPath: '@|A+---B--+|+--C-+|-||+---D--+|x',
    },
    {
        rawChart: `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
`,
        letters: 'ACB',
        fullPath: '@---A---+|||C---+|+-B-x',
    },
    {
        rawChart: `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
`,
        letters: 'GOONIES',
        fullPath: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
    },
    {
        rawChart: `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
`,
        letters: 'BLAH',
        fullPath: '@B+++B|+-L-+A+++A-+Hx',
    },
];

const invalidMaps = [
    `
     -A---+
          |
  x-B-+   C
      |   |
      +---+
`,
    `
   @--A---+
          |
    B-+   C
      |   |
      +---+
`,
    `
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
`,
    `
   @--A---+
          |
  x-Bx+   C
      |   |
      +---+
`,
    `
        x-B
          |
   @--A---+
          |
      +   C
      |   |
      +---+
`,
    `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
`,
    `
   @--A-+
        |
         
        B-x
`,
    `
    -B-@-A-x
`,
    `
    @-A-+-B-x
`,
];

validTestSamples.forEach((sample, ix) => {
    describe(`Walks the path on test sample ${ix}`, () => {
        const pathMemories = walkThePath(sample.rawChart);
        it('remembers letters on the path', () => {
            expect(pathMemories?.letters).toBe(sample.letters);
        });
        it('remebers the whole path as a string', () => {
            expect(pathMemories?.fullPath).toBe(sample.fullPath);
        });
    });
});

invalidMaps.forEach((rawChart, ix) => {
    describe(`Walks the path on invalid map ${ix}`, () => {
        test('expects to see an Error thrown', () => {
            expect(() => walkThePath(rawChart)).toThrow();
        });
    });
});
