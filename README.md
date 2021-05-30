# Walk the Walk: A Path following algorithm

Run this code in the terminal. There is no UI.

Inputs are hardcoded ASCII maps. I decided not to provide a UI to focus on solving the algorithm. That said, I am a visually oriented UI/UX guy and I hope this excercise shows I have the other half of the brain as well.

I provided just the basic tests that check if the algorithm meets the expected behavior requirements for the map examples given below.

Allowed characters on the map are UPPERCASE letters, '@' (start sign), 'x' (stop sign), '+' (turn sign), '-' and '|'. If while walking the path the algorithm steps on any other character it will throw an error.

## Usage

- gather dependencies: `yarn`
- build: `yarn build`
- lint: `yarn lint`
- test: `yarn test`
- start: `yarn start`


## Valid maps

### Map 1 - a basic example

```
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: 
- Letters ```ACB```
- Path as characters ```@---A---+|C|+---+|+-B-x```

### Map 2 - go straight through intersections

```
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
```

Expected result: 
- Letters ```ABCD```
- Path as characters ```@|A+---B--+|+--C-+|-||+---D--+|x```

### Map 3 - letters may be found on turns

```
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
```

Expected result: 
- Letters ```ACB```
- Path as characters ```@---A---+|||C---+|+-B-x```

### Map 4 - do not collect a letter from the same location twice

```
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
```

Expected result: 
- Letters ```GOONIES```
- Path as characters ```@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x```

### Map 5 - keep direction, even in a compact space

```
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
```

Expected result: 
- Letters ```BLAH```
- Path as characters ```@B+++B|+-L-+A+++A-+Hx```

## Invalid maps:

### Map 6 - no start

```
     -A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: Error

### Map 7 - no end

```
   @--A---+
          |
    B-+   C
      |   |
      +---+
```

Expected result: Error

### Map 8 - multiple starts

```
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: Error

### Map 9 - multiple ends

```
   @--A---+
          |
  x-Bx+   C
      |   |
      +---+
```

Expected result: Error

### Map 10 - T forks

```
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
```

Expected result: Error

### Map 11 - broken path

```
   @--A-+
        |
         
        B-x
```

Expected result: Error

### Map 12 - multiple starting paths

```
  -B-@-A-x
```

Expected result: Error

### Map 13 - fake turn

```
  @-A-+-B-x
```

Expected result: Error
