# 📦 Build and Packaging Guide

Complete guide for building and packaging the Tube Joint Visualizer application.

## Prerequisites

Before building, ensure you have:
- **Node.js** v16 or higher
- **npm** v7 or higher
- **Git** for version control

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/1234-ad/tube-joint-visualizer.git
cd tube-joint-visualizer
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- Electron (v28.0.0)
- Three.js (v0.160.0)
- electron-builder (v24.9.1)

## Development

### Run in Development Mode
```bash
npm start
```

This launches the Electron app in development mode with:
- Hot reload capabilities
- DevTools access (uncomment in main.js)
- Full debugging support

## Building for Production

### Build for Current Platform
```bash
npm run build
```

### Platform-Specific Builds

#### Windows
```bash
npm run build:win
```
**Output**: `dist/Tube Joint Visualizer Setup.exe`
- NSIS installer
- ~100-150 MB
- Supports Windows 10/11

#### macOS
```bash
npm run build:mac
```
**Output**: `dist/Tube Joint Visualizer.dmg`
- DMG disk image
- ~120-170 MB
- Supports macOS 10.13+

#### Linux
```bash
npm run build:linux
```
**Output**: `dist/Tube Joint Visualizer.AppImage`
- Portable AppImage
- ~110-160 MB
- Works on most Linux distributions

## Build Configuration

The build is configured in `package.json` under the `build` section:

```json
{
  "build": {
    "appId": "com.tubejoint.visualizer",
    "productName": "Tube Joint Visualizer",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!**/*.md",
      "!docs/**/*"
    ]
  }
}
```

## Extracting the Executable

### After Building

1. Navigate to the `dist/` directory
2. Locate the platform-specific file:
   - **Windows**: `Tube Joint Visualizer Setup.exe`
   - **macOS**: `Tube Joint Visualizer.dmg`
   - **Linux**: `Tube Joint Visualizer.AppImage`

### File Sizes
- Windows: ~100-150 MB
- macOS: ~120-170 MB
- Linux: ~110-160 MB

## Distribution

### Upload to Google Drive

1. Build the application for your target platform
2. Locate the executable in `dist/`
3. Upload to Google Drive
4. Set sharing permissions to "Anyone with the link"
5. Copy the shareable link

### Creating a Release

For GitHub releases:
```bash
# Tag the version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Upload the built executable to GitHub Releases
```

## Troubleshooting

### Build Fails

**Issue**: Missing dependencies
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Platform-specific build tools missing
- **Windows**: Install Windows Build Tools
- **macOS**: Install Xcode Command Line Tools
- **Linux**: Install build-essential

### Large File Size

The application includes:
- Electron runtime (~50-80 MB)
- Chromium engine (~40-60 MB)
- Three.js library (~1-2 MB)
- Application code (~1 MB)

This is normal for Electron applications.

### Slow Build Time

First build takes 5-10 minutes. Subsequent builds are faster due to caching.

## Advanced Configuration

### Custom Icon

Replace `assets/icon.png` with your custom icon:
- **Windows**: 256x256 PNG
- **macOS**: 512x512 PNG
- **Linux**: 512x512 PNG

### Code Signing (Optional)

For production releases, consider code signing:

**Windows**:
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

**macOS**:
```json
"mac": {
  "identity": "Developer ID Application: Your Name"
}
```

## Optimization

### Reduce Bundle Size

1. Remove unused dependencies
2. Minify code (production builds do this automatically)
3. Compress assets

### Performance

- Use production builds for distribution
- Enable hardware acceleration
- Optimize Three.js scene complexity

## Verification

### Test the Build

1. Install/run the executable
2. Verify all features work:
   - Tube creation
   - Joint visualization
   - Controls (rotate, pan, zoom)
   - Undo/redo
   - View toggles

### Cross-Platform Testing

Test on multiple platforms if possible:
- Windows 10/11
- macOS 10.13+
- Ubuntu/Debian Linux

## Continuous Integration (Optional)

For automated builds, consider:
- GitHub Actions
- Travis CI
- CircleCI

Example GitHub Actions workflow:
```yaml
name: Build
on: [push]
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
```

## Support

For build issues:
1. Check the [Electron Builder docs](https://www.electron.build/)
2. Review the [Electron docs](https://www.electronjs.org/docs)
3. Open an issue on GitHub

---

**Happy Building! 🚀**
