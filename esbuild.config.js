const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/services/routing/Routes.js'],
    bundle: true,
    outfile: 'out.js',
    loader: { '.js': 'jsx' }, // Add this line to specify the loader for JS files as JSX
}).catch(() => process.exit(1));