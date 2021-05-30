import { Chart } from './chart';
import { asciiMaps } from './inputs';
import { Path, PathMemories } from './path';

export function walkThePath(rawChart: string): PathMemories {
    const chart = Chart.create(rawChart);
    const path = Path.create(chart);
    return path?.walk();
}

export function init(): void {
    asciiMaps.forEach(rawChart => {
        try {
            console.log(rawChart);
            console.log(walkThePath(rawChart));
        } catch (error) {
            console.error(error.message);
        }
    });
}

init();
