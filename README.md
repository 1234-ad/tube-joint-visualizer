# 🧩 Tube Joint Visualizer

Interactive desktop application for creating, visualizing, and manipulating joints between rectangular/square tubes at various angles.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-000000.svg)

## 🎯 Features

### Part 1: Tube Joint Visualization
- ✅ **Tube Types**: Rectangular and Square tubes
- ✅ **Customizable Parameters**: Width, height, thickness, and length
- ✅ **Joint Angles**: 30°, 45°, 90°, 135°, or custom angles
- ✅ **Interactive Controls**: Drag, rotate, and position tubes
- ✅ **Joint Preview**: Visual joint indicators at intersections
- ✅ **Angle Snapping**: Quick presets for standard angles
- ✅ **Multiple Tubes**: Build complex assemblies
- ✅ **3D Navigation**: Zoom, pan, and rotate workspace

### Visualization Options
- ✅ **Wireframe/Solid Toggle**: Switch between view modes
- ✅ **Joint Highlighting**: Visual markers at tube connections
- ✅ **Undo/Redo**: Full history management
- ✅ **Modern UI**: Dark theme with intuitive controls

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/1234-ad/tube-joint-visualizer.git
cd tube-joint-visualizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

## 📦 Building the Application

### Build for All Platforms
```bash
npm run build
```

### Platform-Specific Builds

**Windows:**
```bash
npm run build:win
```

**macOS:**
```bash
npm run build:mac
```

**Linux:**
```bash
npm run build:linux
```

### Locating the Executable

After building, find your executable in the `dist/` directory:
- **Windows**: `dist/Tube Joint Visualizer Setup.exe`
- **macOS**: `dist/Tube Joint Visualizer.dmg`
- **Linux**: `dist/Tube Joint Visualizer.AppImage`

## 🎮 Usage Guide

### Controls

**Mouse Controls:**
- **Left Click + Drag**: Rotate the 3D view
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in/out

### Creating Tubes

1. Select tube type (Rectangular or Square)
2. Set dimensions (width, height, thickness, length)
3. Choose joint angle or use presets
4. Click "Add Tube" to place in scene
5. Repeat to build assemblies

### View Options

- **Wireframe Mode**: Toggle to see tube structure
- **Show Joints**: Display connection points
- **Show Dimensions**: View measurements (optional)

### History

- **Undo**: Revert last action
- **Redo**: Restore undone action
- **Clear All**: Remove all tubes from scene

## 🏗️ Project Structure

```
tube-joint-visualizer/
├── src/
│   ├── index.html          # Main HTML interface
│   ├── styles.css          # Application styling
│   └── app.js              # Three.js application logic
├── assets/
│   └── icon.png            # Application icon
├── docs/
│   └── CHANGELOG.md        # Version history
├── main.js                 # Electron main process
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Technology Stack

- **Electron**: Desktop application framework
- **Three.js**: 3D graphics and visualization
- **JavaScript**: Application logic
- **HTML/CSS**: User interface

## 📋 Development Workflow

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code formatting
- `refactor:` Code restructuring

### Version Control
All changes are tracked with meaningful commits following best practices.

## 🔧 Packaging Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```
This creates platform-specific executables in the `dist/` folder.

### 3. Extract the Executable
Navigate to `dist/` and locate:
- Windows: `.exe` installer
- macOS: `.dmg` disk image
- Linux: `.AppImage` executable

### 4. Distribute
Upload the executable to Google Drive or your preferred platform for distribution.

## 📝 Requirements Met

### ✅ Part 1: Visualization Feature
- Rectangular and square tube support
- Full parameter customization
- Interactive joint creation
- Angle snapping and presets
- Multiple tube assemblies
- 3D workspace navigation

### ✅ Part 2: Code Quality
- Clean, organized code structure
- Meaningful commit messages
- Comprehensive README
- Clear folder organization
- Progress tracking

### ✅ Part 3: Application Packaging
- Electron-based standalone app
- Cross-platform build support
- All dependencies bundled
- Build scripts included
- Clear packaging documentation

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and commit conventions.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🐛 Known Issues

- Complex tube intersections may require manual adjustment
- Performance may vary with large assemblies (50+ tubes)

## 🔮 Future Enhancements

- Export to CAD formats (STL, OBJ)
- Advanced joint types (T-joints, cross-joints)
- Measurement tools
- Material presets
- Save/load project files

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the Technical Challenge**
