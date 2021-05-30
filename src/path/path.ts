import { PathMemories, PathUtil } from '.';
import { Chart, ChartPosition } from '../chart';
import { DirectionMove } from '../direction';

export class Path {
    public static create(chart: Chart): Path {
        if (chart) {
            const startPos = chart.findCharacter(Chart.START_CHAR);
            const startDir = PathUtil.getDirection(chart, startPos);
            if (startDir) {
                return new Path(chart, startPos, startDir);
            }
        }
    }

    public history: ChartPosition[] = [];
    public get character(): string {
        return this.currChar;
    }
    public get position(): ChartPosition {
        return this.currPos;
    }
    public get direction(): DirectionMove {
        return this.currDir;
    }

    private currChar = '@';
    private letters = '';
    private fullPath = '@';
    private isCompleted = false;

    private constructor(
        public readonly chart: Chart,
        private currPos: ChartPosition,
        private currDir: DirectionMove
    ) {}

    public walk(): PathMemories {
        while (this.currDir) {
            this.step();
        }

        if (this.isCompleted) {
            return {
                letters: this.letters,
                fullPath: this.fullPath,
            };
        }

        throw new Error('Error: An unhandled error occured on the path');
    }

    private step(): void {
        this.currPos = PathUtil.getPosition(this.currPos, this.currDir);
        this.currChar = this.chart.getCharacterAt(this.currPos);

        if (this.pathIsBroken()) {
            throw new Error('Error: Broken path or Invalid character on path');
        }

        this.fullPath += this.currChar;

        if (this.isTheEnd()) {
            this.completePath();
            return;
        }

        if (PathUtil.shouldCollectChar(this)) {
            this.letters += this.currChar;
            this.history.push({ ...this.currPos });
        }

        if (PathUtil.shouldTurn(this)) {
            this.currDir = this.getTurnDirection();
        }
    }

    private getTurnDirection(): DirectionMove {
        return PathUtil.getDirection(this.chart, this.currPos, this.currDir);
    }

    private pathIsBroken(): boolean {
        return this.currChar === undefined;
    }

    private isTheEnd(): boolean {
        return this.currChar === Chart.END_CHAR;
    }

    private completePath(): void {
        this.currDir = undefined;
        this.isCompleted = true;
    }
}
