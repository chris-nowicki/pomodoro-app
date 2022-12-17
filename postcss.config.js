import postcssPresetEnv from 'postcss-preset-env'
import precss from 'precss'
import postcssImport from 'postcss-import'

export default {
    plugins: [
        postcssPresetEnv({
            stage: 1,
        }),
        precss(),
        postcssImport(),
    ],
}
