// uno.config.ts
import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: '#4f46e5',
      'primary-light': '#818cf8',
      success: '#10b981',
      'success-light': '#d1fae5',
      danger: '#ef4444',
      'danger-light': '#fee2e2',
      surface: '#f8fafc',
      'surface-dark': '#f1f5f9',
    },
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'transition-default': 'transition-all duration-300 ease-in-out',
  },
})
