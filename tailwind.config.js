const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: false,
    theme: {
        screen: {
            'xs': '480px',
        },
        extend: {
            screens: {
                '3xl': '1441px',
            },
            cursor: {
                'ew-resize': 'ew-resize',
                'ns-resize': 'ns-resize',
                'nesw-resize': 'nesw-resize',
                'nwse-resize': 'nwse-resize',
            }
        },
        colors
    },
    variants: {
        extend: {
            borderStyle: ['important', 'hover'],
            borderColor: ['important', 'hover'],
            borderWidth: ['important', 'hover'],
            borderRadius: ['important', 'hover'],
            textColor: ['important'],
            height: ['important'],
            width: ['important'],
            backgroundColor: ['important'],
            padding: ['important'],
            position: ['important'],
            display: ['hover', 'important'],
            cursor: ['hover', 'important'],
            pointerEvents: ['important']
        }
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('important', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.\\!${rule.selector.slice(1)}`
                    rule.walkDecls(decl => {
                        decl.important = true
                    })
                })
            })
        })
    ]
}