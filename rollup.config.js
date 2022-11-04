import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
    input: 'mini-all_for_rollup.js',
    output: {
        file: './build/mini-all.js'
    },
    onwarn(warning) {
        if (warning.code !== 'THIS_IS_UNDEFINED') {
            console.error(`(!) ${warning.message}`);
        }
    },
    plugins: [
        replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
        resolve(),
        terser({
            ecma: 2020,
            module: true,
            warnings: true,
            format: { comments: false },
            mangle: {
                properties: {
                    regex: /^__/,
                },
            },
        }),
        summary(),
    ],
};
