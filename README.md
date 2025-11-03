# 🎯 QuickSort Visualizer

An interactive, real-time visualization tool for understanding the QuickSort algorithm. Watch how QuickSort partitions, compares, and sorts arrays step-by-step with detailed animations and multilingual support.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎬 Visual Algorithm Execution
- **Step-by-step visualization** of the QuickSort algorithm
- **Real-time animations** showing comparisons, swaps, and partitioning
- **Color-coded elements**:
  - 🔵 Blue: Current partition boundaries
  - 🟡 Yellow: Pivot element
  - 🟠 Orange: Elements being compared
  - 🔴 Red: Elements being swapped
  - 🟢 Green: Sorted elements

### 🎮 Interactive Controls
- **Play/Pause**: Start or pause the sorting animation
- **Step Navigation**: Move forward or backward through each step
- **Adjustable Speed**: Control animation speed with a slider (slow to fast)
- **Reset**: Return to the initial state at any time

### ⚙️ Advanced Configuration
- **Multiple Pivot Selection Strategies**:
  - Last Element (default)
  - First Element
  - Middle Element
  - Random Element
- **Custom Array Input**: Enter your own numbers to sort
- **Random Array Generation**: Generate random arrays of customizable size (2-50 elements)

### 📊 Algorithm Statistics
- **Real-time metrics**:
  - Number of comparisons performed
  - Number of swaps executed
  - Current step / Total steps counter

### 🌍 Multilingual Support
- **English** (EN)
- **Romanian** (RO)
- Seamless language switching with preserved state

### 🎨 Theme Support
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Eye-friendly dark theme
- System preference detection
- Persistent theme selection

### 📱 Responsive Design
- Fully responsive layout for desktop, tablet, and mobile
- Optimized visualizations for all screen sizes
- Touch-friendly controls

### 📝 Detailed Logging
- Step-by-step algorithm execution logs
- Descriptions of each operation
- Localized log messages

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/k6w/quicksort-visualizer.git
cd quicksort-visualizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
quicksort-visualizer/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/                   # React components
│   ├── AdvancedSettings.tsx     # Pivot strategy selector
│   ├── ControlPanel.tsx         # Playback controls
│   ├── InputPanel.tsx           # Array input interface
│   ├── LanguageToggle.tsx       # Language switcher
│   ├── LogPanel.tsx             # Algorithm execution logs
│   ├── ThemeToggle.tsx          # Light/dark mode toggle
│   └── Visualizer.tsx           # Main visualization component
├── lib/                         # Utilities and core logic
│   ├── algorithms/
│   │   └── quicksort.ts         # QuickSort implementation
│   ├── contexts/
│   │   ├── LanguageContext.tsx  # i18n context
│   │   └── ThemeContext.tsx     # Theme context
│   ├── i18n.ts                  # Translation definitions
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── [config files]               # TypeScript, ESLint, etc.
```

## 🎓 How to Use

1. **Enter an Array**:
   - Type numbers separated by commas or spaces
   - Or click "Generate Random" for a random array

2. **Configure Settings** (Optional):
   - Choose a pivot selection strategy
   - Adjust animation speed

3. **Start Visualization**:
   - Click "Start" to begin the sorting animation
   - Use "Pause" to stop at any step
   - Navigate with "Next Step" / "Previous Step" for detailed examination

4. **Observe**:
   - Watch the color-coded bars change as the algorithm executes
   - Read the log panel for detailed step descriptions
   - Monitor statistics for algorithm performance

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variants

## 🧠 Algorithm Implementation

The QuickSort implementation features:
- **Configurable pivot selection** (first, last, middle, random)
- **Detailed step tracking** for visualization
- **Performance metrics** (comparisons and swaps)
- **Partition-based sorting** with visual boundaries
- **Type-safe implementation** with full TypeScript support

## 🎨 Customization

### Adding New Languages

Edit `lib/i18n.ts` to add new translations:

```typescript
export const translations = {
  // ... existing languages
  es: {
    title: 'Visualizador QuickSort',
    // ... other translations
  }
};
```

### Modifying Color Scheme

Colors are defined using Tailwind CSS variables in `app/globals.css`. Customize the theme by adjusting CSS variables.

## 📦 Build for Production

```bash
npm run build
npm start
```

The optimized production build will be created in the `.next` directory.

## 🚢 Deployment

This project can be easily deployed to:
- **[Vercel](https://vercel.com/)** (recommended)
- **[Netlify](https://www.netlify.com/)**
- Any platform supporting Next.js

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/k6w/quicksort-visualizer)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**k6w**
- GitHub: [@k6w](https://github.com/k6w)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need to understand sorting algorithms visually
- Educational tool for computer science students and enthusiasts

---

<div align="center">
  <strong>Made with ❤️ for learning algorithms</strong>
</div>
