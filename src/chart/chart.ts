import { ChartPosition, ChartValidators } from '.';

export class Chart {
    public static readonly START_CHAR = '@';
    public static readonly END_CHAR = 'x';
    public static readonly TURN_CHAR = '+';

    public static create(rawChart: string): Chart {
        if (
            ChartValidators.isUniqueCharacter(this.START_CHAR, rawChart) &&
            ChartValidators.isUniqueCharacter(this.END_CHAR, rawChart)
        ) {
            return new Chart(rawChart.split('\n'));
        }
    }

    private constructor(private readonly chartRows: string[]) {}

    public findCharacter(character: string): ChartPosition {
        let pos: ChartPosition;

        this.chartRows.find((row, y) => {
            const x = row.indexOf(character);
            if (x > -1) {
                pos = { x, y };
                return true;
            }
        });

        return pos;
    }

    public getCharacterAt({ x, y }: ChartPosition): string {
        const char = this.chartRows[y]?.charAt(x).trim();
        return ChartValidators.isAllowedCharacter(char) ? char : undefined;
    }
}
