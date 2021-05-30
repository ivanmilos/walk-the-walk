export class ChartValidators {
    public static isUniqueCharacter(
        character: string,
        rawChartString: string
    ): boolean {
        const count = rawChartString.split(character).length - 1;
        if (count !== 1) {
            throw new Error(
                `Error: Invalid chart: '${character}' has a count of ${count}`
            );
        }
        return true;
    }

    public static isAllowedCharacter(character: string): boolean {
        return !!character?.match(/[A-Z@x+|\-]/)?.length;
    }
}
