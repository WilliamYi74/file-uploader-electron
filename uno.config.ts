import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
  presetWind
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetTypography(),
    presetUno(),
    presetWind()
    // ...custom presets
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
