export interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  pivotIndex: number;
  sortedIndices: number[];
  leftBound: number;
  rightBound: number;
  // i18n-friendly message
  messageKey: string; // keys from i18n like 'descInitialArray'
  messageParams?: Record<string, string | number>;
  // semantic kind
  kind: StepKind;
}

export type StepKind =
  | 'init'
  | 'partition-bounds'
  | 'select-pivot'
  | 'move-pivot-end'
  | 'compare'
  | 'swap'
  | 'after-swap'
  | 'place-pivot'
  | 'pivot-correct'
  | 'single-sorted'
  | 'sorted-all';


export interface SortStats {
  comparisons: number;
  swaps: number;
  time: number;
}

export type PivotStrategy = 'last' | 'first' | 'middle' | 'random';

export class QuickSortVisualizer {
  private steps: SortStep[] = [];
  private comparisons: number = 0;
  private swaps: number = 0;
  private pivotStrategy: PivotStrategy = 'last';

  constructor(pivotStrategy: PivotStrategy = 'last') {
    this.pivotStrategy = pivotStrategy;
    this.reset();
  }

  setPivotStrategy(strategy: PivotStrategy) {
    this.pivotStrategy = strategy;
  }

  reset() {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
  }

  getSteps(): SortStep[] {
    return this.steps;
  }

  getStats(): SortStats {
    return {
      comparisons: this.comparisons,
      swaps: this.swaps,
      time: 0,
    };
  }

  private addStep(
    array: number[],
    comparingIndices: number[] = [],
    swappingIndices: number[] = [],
    pivotIndex: number = -1,
    sortedIndices: number[] = [],
    leftBound: number = -1,
    rightBound: number = -1,
    messageKey: string = '',
    messageParams?: Record<string, string | number>,
    kind: StepKind = 'init'
  ) {
    this.steps.push({
      array: [...array],
      comparingIndices: [...comparingIndices],
      swappingIndices: [...swappingIndices],
      pivotIndex,
      sortedIndices: [...sortedIndices],
      leftBound,
      rightBound,
      messageKey,
      messageParams,
      kind,
    });
  }

  sort(inputArray: number[]): void {
    this.reset();
    const array = [...inputArray];
    const sortedIndices: number[] = [];

    // Initial state
  this.addStep(array, [], [], -1, [], -1, -1, 'descInitialArray', {}, 'init');

    // Start QuickSort
    this.quickSort(array, 0, array.length - 1, sortedIndices);

    // Final sorted state
    this.addStep(
      array,
      [],
      [],
      -1,
      Array.from({ length: array.length }, (_, i) => i),
      -1,
      -1,
      'descSortedAll',
      {},
      'sorted-all'
    );
  }

  private quickSort(
    array: number[],
    low: number,
    high: number,
    sortedIndices: number[]
  ): void {
    if (low < high) {
      // Show current partition bounds
      this.addStep(
        array,
        [],
        [],
        -1,
        sortedIndices,
        low,
        high,
        'descPartitionBounds',
        { low, high },
        'partition-bounds'
      );

      const pivotIndex = this.partition(array, low, high, sortedIndices);

      // Mark pivot as sorted
      sortedIndices.push(pivotIndex);
      this.addStep(
        array,
        [],
        [],
        -1,
        sortedIndices,
        -1,
        -1,
        'descPivotCorrect',
        { index: pivotIndex },
        'pivot-correct'
      );

      // Sort left partition
      this.quickSort(array, low, pivotIndex - 1, sortedIndices);

      // Sort right partition
      this.quickSort(array, pivotIndex + 1, high, sortedIndices);
    } else if (low === high) {
      // Single element is already sorted
      sortedIndices.push(low);
      this.addStep(
        array,
        [],
        [],
        -1,
        sortedIndices,
        -1,
        -1,
        'descSingleSorted',
        { index: low },
        'single-sorted'
      );
    }
  }

  private choosePivotIndex(low: number, high: number): number {
    switch (this.pivotStrategy) {
      case 'first':
        return low;
      case 'middle':
        return Math.floor((low + high) / 2);
      case 'random':
        return Math.floor(Math.random() * (high - low + 1)) + low;
      case 'last':
      default:
        return high;
    }
  }

  private partition(
    array: number[],
    low: number,
    high: number,
    sortedIndices: number[]
  ): number {
    // Choose pivot based on strategy
    const pivotIdx = this.choosePivotIndex(low, high);
    
    // Move pivot to end if not already there
    if (pivotIdx !== high) {
      this.swaps++;
      this.addStep(
        array,
        [],
        [pivotIdx, high],
        pivotIdx,
        sortedIndices,
        low,
        high,
        'descMovingPivotToEnd',
        { from: pivotIdx },
        'move-pivot-end'
      );
      [array[pivotIdx], array[high]] = [array[high], array[pivotIdx]];
    }

    const pivot = array[high];
    this.addStep(
      array,
      [],
      [],
      high,
      sortedIndices,
      low,
      high,
      'descSelectedPivot',
      { pivot, index: high },
      'select-pivot'
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      this.comparisons++;
      this.addStep(
        array,
        [j, high],
        [],
        high,
        sortedIndices,
        low,
        high,
        'descComparing',
        { value: array[j], pivot },
        'compare'
      );

      if (array[j] <= pivot) {
        i++;
        if (i !== j) {
          // Swap elements
          this.swaps++;
          this.addStep(
            array,
            [],
            [i, j],
            high,
            sortedIndices,
            low,
            high,
            'descSwapping',
            { a: array[i], b: array[j] },
            'swap'
          );

          [array[i], array[j]] = [array[j], array[i]];

          this.addStep(
            array,
            [],
            [],
            high,
            sortedIndices,
            low,
            high,
            'descAfterSwap',
            { a: array[i], b: array[j] },
            'after-swap'
          );
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      this.swaps++;
      this.addStep(
        array,
        [],
        [i + 1, high],
        high,
        sortedIndices,
        low,
        high,
        'descPlacingPivot',
        { pivot },
        'place-pivot'
      );

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
    }

    return i + 1;
  }
}
