export type Language = 'en' | 'ro';

export const translations = {
  en: {
    title: 'QuickSort Visualizer',
    description: 'Visualize the QuickSort algorithm step by step',
    
    // Input section
    inputLabel: 'Enter numbers (comma or space separated)',
    inputPlaceholder: '5, 2, 8, 1, 9, 3, 7',
    generateRandom: 'Generate Random',
    arraySize: 'Array Size',
    
    // Controls
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    nextStep: 'Next Step',
    prevStep: 'Previous Step',
    reset: 'Reset',
    autoPlay: 'Auto Play',
    
    // Settings
    speed: 'Speed',
    speedSlow: 'Slow',
    speedMedium: 'Medium',
    speedFast: 'Fast',
    settings: 'Settings',
    pivotStrategy: 'Pivot Selection',
    pivotLast: 'Last Element',
    pivotFirst: 'First Element',
    pivotMiddle: 'Middle Element',
    pivotRandom: 'Random Element',
    animationSpeed: 'Animation Speed',
    advanced: 'Advanced Settings',
    
    // Status
    status: 'Status',
    statusReady: 'Ready',
    statusSorting: 'Sorting...',
    statusPaused: 'Paused',
    statusComplete: 'Complete!',
    
    // Algorithm info
    currentStep: 'Step',
    of: 'of',
    pivot: 'Pivot',
    comparing: 'Comparing',
    swapping: 'Swapping',
    partitioning: 'Partitioning',
    sorted: 'Sorted',
    
    // Stats
    comparisons: 'Comparisons',
    swaps: 'Swaps',
    time: 'Time',
    
    // Legend
    legendPartition: 'Partition',
    legendPivot: 'Pivot',
    legendComparing: 'Comparing',
    legendSwapping: 'Swapping',
    legendSorted: 'Sorted',
    
    // Errors
    errorInvalidInput: 'Please enter valid numbers',
    errorMinValues: 'Please enter at least 2 numbers',
    errorMaxValues: 'Maximum 50 numbers allowed',
    
    // Footer
    footerText: 'Understand sorting algorithms visually',
  logs: 'Logs',

    // Descriptions (algorithm messages)
    descInitialArray: 'Initial array',
    descPartitionBounds: 'Partitioning subarray from index {low} to {high}',
    descSelectedPivot: 'Selected pivot: {pivot} at index {index}',
    descMovingPivotToEnd: 'Moving pivot from index {from} to end',
    descComparing: 'Comparing {value} with pivot {pivot}',
    descSwapping: 'Swapping {a} and {b}',
    descAfterSwap: 'After swap: {a} and {b}',
    descPlacingPivot: 'Placing pivot {pivot} in correct position',
    descPivotCorrect: 'Pivot at index {index} is now in correct position',
    descSingleSorted: 'Single element at index {index} is sorted',
    descSortedAll: 'Array is fully sorted!',
  },
  ro: {
    title: 'Vizualizator QuickSort',
    description: 'Vizualizează algoritmul QuickSort pas cu pas',
    
    // Input section
    inputLabel: 'Introduceți numere (separate prin virgulă sau spațiu)',
    inputPlaceholder: '5, 2, 8, 1, 9, 3, 7',
    generateRandom: 'Generează',
    arraySize: 'Dimensiune',
    
    // Controls
    start: 'Start',
    pause: 'Pauză',
    resume: 'Continuă',
    nextStep: 'Următorul',
    prevStep: 'Anteriorul',
    reset: 'Resetează',
    autoPlay: 'Auto',
    
    // Settings
    speed: 'Viteză',
    speedSlow: 'Încet',
    speedMedium: 'Mediu',
    speedFast: 'Rapid',
    settings: 'Setări',
    pivotStrategy: 'Selectare Pivot',
    pivotLast: 'Ultimul Element',
    pivotFirst: 'Primul Element',
    pivotMiddle: 'Elementul din Mijloc',
    pivotRandom: 'Element Aleatoriu',
    animationSpeed: 'Viteză Animație',
    advanced: 'Setări Avansate',
    
    // Status
    status: 'Stare',
    statusReady: 'Pregătit',
    statusSorting: 'Sortare...',
    statusPaused: 'Pauzat',
    statusComplete: 'Complet!',
    
    // Algorithm info
    currentStep: 'Pasul',
    of: 'din',
    pivot: 'Pivot',
    comparing: 'Comparare',
    swapping: 'Schimbare',
    partitioning: 'Partiționare',
    sorted: 'Sortat',
    
    // Stats
    comparisons: 'Comparații',
    swaps: 'Schimbări',
    time: 'Timp',
    
    // Legend
    legendPartition: 'Partiție',
    legendPivot: 'Pivot',
    legendComparing: 'Comparare',
    legendSwapping: 'Schimbare',
    legendSorted: 'Sortat',
    
    // Errors
    errorInvalidInput: 'Introduceți numere valide',
    errorMinValues: 'Introduceți cel puțin 2 numere',
    errorMaxValues: 'Maxim 50 de numere',
    
    // Footer
    footerText: 'Înțelege algoritmii de sortare vizual',
  logs: 'Jurnal',

    // Descriptions (algorithm messages)
    descInitialArray: 'Array inițial',
    descPartitionBounds: 'Partiționare subarray de la index {low} la {high}',
    descSelectedPivot: 'Pivot selectat: {pivot} la indexul {index}',
    descMovingPivotToEnd: 'Mut pivotul de la indexul {from} la final',
    descComparing: 'Comparare {value} cu pivotul {pivot}',
    descSwapping: 'Schimb {a} cu {b}',
    descAfterSwap: 'După schimb: {a} și {b}',
    descPlacingPivot: 'Plasez pivotul {pivot} în poziția corectă',
    descPivotCorrect: 'Pivotul la indexul {index} este acum în poziția corectă',
    descSingleSorted: 'Elementul singular la indexul {index} este sortat',
    descSortedAll: 'Array-ul este complet sortat!',
  },
};

export type TranslationKey = keyof typeof translations.en;
