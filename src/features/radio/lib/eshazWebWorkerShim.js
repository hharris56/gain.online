/**
 * Browser-only stand-in for `@eshaz/web-worker`, aliased in via
 * `next.config.js` → `turbopack.resolveAlias`.
 *
 * Why: `mpg123-decoder`'s worker base class does `import NodeWorker from
 * "@eshaz/web-worker"`, and that package's Node entry runs a dynamic
 * `import(mod)` Turbopack can't statically resolve (`Can't resolve
 * (<dynamic> | 'undefined')`). In a browser the decoder only ever needs the
 * global `Worker`. The dummy `class {}` fallback keeps the decoder module's
 * top-level `class extends getWorker()` from throwing during SSR (it is never
 * instantiated server-side — the spectrum path is client-only and lazy).
 */
export default typeof Worker !== "undefined" ? Worker : class {};
