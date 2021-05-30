import { DirectionMove } from '.';

export class Direction {
    public static readonly UP: DirectionMove = { moveX: 0, moveY: -1 };
    public static readonly DOWN: DirectionMove = { moveX: 0, moveY: 1 };
    public static readonly LEFT: DirectionMove = { moveX: -1, moveY: 0 };
    public static readonly RIGHT: DirectionMove = { moveX: 1, moveY: 0 };

    public static getAll(): DirectionMove[] {
        return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
    }

    public static getTurns(currentDirection: DirectionMove): DirectionMove[] {
        if (currentDirection.moveX === 0) {
            // if currentDirection is UP or DOWN
            return [Direction.LEFT, Direction.RIGHT];
        }
        return [Direction.UP, Direction.DOWN];
    }
}
