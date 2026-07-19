# Eaglercraft 1.8.9 Custom Client

## 🎮 Features

### Custom Buttons & UI
- Customizable main menu buttons
- Settings panel with organized sections
- Modern, responsive interface
- Dark theme with blue accents

### 🚀 FPS Boosting
- Real-time FPS counter
- Fast Graphics mode for low-end devices
- Adjustable render distance (4-16)
- Target FPS setting (30-120)
- Hardware acceleration enabled
- Particle effects optimization
- Smooth lighting toggle

### 🎨 Texture Pack Manager
- Upload custom texture packs (.zip)
- Multiple texture pack support
- Activate/deactivate packs easily
- Storage-efficient management
- Pack information display (size, name)

### 🖼️ Background Customization
- Three background types: Default gradient, solid color, custom image
- Upload custom background images
- Blur effect control
- Brightness adjustment
- Real-time preview

### ⚔️ PvP Utilities
- **CPS Display** - Real-time clicks per second counter
- **Armor Status** - Display equipped armor durability
- **Target Health Display** - Show enemy health
- **Hitbox Display** - Visualize player hitboxes
- **Nametags** - Show/hide player names
- **Crosshair Customization**
  - Multiple styles (default, dot, plus, custom)
  - Color picker
  - Size adjustment
- **Kill Effects** - Visual feedback for kills
- **Snap Lines** - Draw lines to nearby enemies

## 📋 Getting Started

### Installation

1. Clone this repository or download the files
2. Open `index.html` in a modern web browser
3. The client will load with default settings

### Browser Requirements
- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- LocalStorage support

## ⚙️ Configuration

All settings are automatically saved to your browser's LocalStorage. Configuration includes:

- Graphics settings (brightness, contrast, saturation)
- FPS optimization settings
- PvP utilities configuration
- Background preferences
- Texture pack selections

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── config.js           # Configuration management
│   ├── fps-booster.js      # FPS optimization
│   ├── texture-pack-manager.js  # Texture pack system
│   ├── pvp-utils.js        # PvP utilities
│   ├── background-manager.js    # Background management
│   ├── ui-handler.js       # UI interactions
│   └── main.js             # Application entry point
├── assets/
│   └── icon.png            # Client icon
└── README.md               # This file
```

## 🎮 Keybinds

- **H** - Toggle Hitbox Display
- **K** - Toggle CPS Display

## 💾 Data Storage

The client stores the following in LocalStorage:
- Configuration settings (config.js)
- Installed texture packs (up to browser limit)
- Custom backgrounds
- User preferences

## 🔧 Customization

### Adding Custom Colors

Edit `css/styles.css` and modify the color scheme:
```css
/* Primary color (blue) */
--primary: #4a90e2;

/* Success color (green) */
--success: #4ade80;

/* Danger color (red) */
--danger: #ef4444;
```

### Adding New Settings

1. Add to `CONFIG` object in `config.js`
2. Create getter/setter methods in relevant module
3. Add UI in `ui-handler.js`
4. Settings auto-save to LocalStorage

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 🚨 Known Limitations

1. Texture pack size limited by browser storage
2. Some PvP features are visual only (game integration required)
3. Background images must be under 10MB
4. Max 50 texture packs due to storage limits

## 🎯 Future Improvements

- [ ] Server connection interface
- [ ] Advanced shader system
- [ ] Mod loader integration
- [ ] Custom keybind editor
- [ ] Settings import/export
- [ ] Performance profiler
- [ ] Account management
- [ ] Replay system

## 📝 License

This custom client is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to fork and submit improvements!

## 📞 Support

For issues or suggestions, please create an issue in the repository.

---

**Enjoy your Eaglercraft experience!** 🎮✨