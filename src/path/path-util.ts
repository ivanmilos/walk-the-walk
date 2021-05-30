import { Chart, ChartPosition } from '../chart';
import { Direction, DirectionMove } from '../direction';
import { Path } from './path';

export class PathUtil {
    public static getDirection(
        chart: Chart,
        position: ChartPosition,
        currentDirection?: DirectionMove
    ): DirectionMove {
        const possibleDirections = currentDirection
            ? Direction.getTurns(currentDirection)
            : Direction.getAll();

        const filtered = possibleDirections.filter(direction =>
            chart.getCharacterAt({
                x: position.x + direction.moveX,
                y: position.y + direction.moveY,
            })
        );

        if (filtered.length === 1) {
            return filtered[0];
        } else {
            if (!currentDirection) {
                throw new Error('Error: Multiple start directions');
            } else if (filtered.length === 0) {
                throw new Error('Error: Fake turn on path');
            } else {
                throw new Error('Error: T fork: Multiple turn directions');
            }
        }
    }

    public static getPosition(
        position: ChartPosition,
        direction: DirectionMove
    ): ChartPosition {
        return {
            x: position.x + direction.moveX,
            y: position.y + direction.moveY,
        };
    }

    public static shouldTurn(path: Path): boolean {
        if (this.isTurnChar(path.character)) {
            return true;
        } else if (this.isUppercaseLetter(path.character)) {
            const nextChar = path.chart.getCharacterAt(
                this.getPosition(path.position, path.direction)
            );

            if (!nextChar) {
                return true;
            }
        }

        return false;
    }

    public static shouldCollectChar(path: Path): boolean {
        return (
            this.isUppercaseLetter(path.character) &&
            !this.wasCollected(path.position, path.history)
        );
    }

    private static isUppercaseLetter(character: string): boolean {
        return !!character?.match(/[A-Z]/)?.length;
    }

    private static wasCollected(
        position: ChartPosition,
        collectedPositions: ChartPosition[]
    ): boolean {
        return collectedPositions.some(
            oldPos => oldPos.x === position.x && oldPos.y === position.y
        );
    }

    private static isTurnChar(character: string): boolean {
        return character === Chart.TURN_CHAR;
    }
}
