# Styling Approach 🧑‍🎨

This template is designed to work with a mix of global CSS for commonly needed styles (like layout primitives or utilities) and CSS Modules for component styles.

To give you full control over the CSS, no external CSS is included (like sanitize or normalize, etc). This template comes with an opinionated reset, some base styles and a suggested file structure to keep your variables, breakpoints, web-fonts and theme information—all of which you can change if you prefer things to be setup differently.

[PostCSS](https://postcss.org/) is setup and preconfigured with [`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env).

## Utility CSS

This template provides a handful of opinionated utility CSS classes powered by a custom [UnoCSS](https://unocss.dev/) preset. UnoCSS is an on-demand atomic CSS engine, that generates the CSS for utility styles as they are used. This means you don't need to worry about bundle sizes, as unused utility classes won’t end up in your bundle.

The goal of the utility classes is to provide just enough to help move fast, without getting in your way by providing by coming with too much of a learning curve or interfering with the way you want to author your styles too much. Think of the utilities of something you can opt into, but don’t have to use at all.

The utility classes provided are driven by the design tokens defined in `variable.css`and the breakpoints defined in `breakpoints.css`. See below for an overview of available utility classes.

### Spacing

Spacing utilities give you quick access to use the named spacings (everything starting with `--space-*`) for padding and margin.

```css
.m-xl     // margin: var(--space-xl);
.mt-l     // margin-top: var(--space-l);
.mb-m     // margin-bottom: var(--space-m);
.ml-xs    // margin-left: var(--space-xs);
.mr-l     // margin-right: var(--space-l);
.mx-l     // margin-right: var(--space-l); margin-left: var(--space-l);
.my-s     // margin-top: var(--space-l); margin-bottom: var(--space-l);

.p-xl     // padding: var(--space-xl);
.pt-l     // padding-top: var(--space-l);
.pb-m     // padding-bottom: var(--space-m);
.pl-xs    // padding-left: var(--space-xs);
.pr-l     // padding-right: var(--space-l);
.px-l     // padding-right: var(--space-l); padding-left: var(--space-l);
.py-s     // padding-top: var(--space-l); padding-bottom: var(--space-l);
```

To achieve horizontal or vertical rhythm quickly, you can also use one of the stack utilities.

```css
.stack-x-xl   // > * + * { margin-left: var(--space-xl) }
.stack-y-l    // > * + * { margin-top: var(--space-l) }
```

### Color

Quickly set the text or background color to one of the named colors (everything starting in `--color-*`).

```css
.color-text-primary     // color: var(--color-text-priamry);
.c-text-primary         // color: var(--color-text-primary);

.bg-background-default  // background-color: var(--color-background-default);
```

### Grid Utilities

To make working with traditional column grids simple and fast the utility styles come with a built-in flex-box based grid system, that you can use out of the box. The grid systems consists of `row`, `col-n/x` and `push-n/x` classes as shown below.

```jsx
<div className="row">
  <div className="col-6/12 lg:col-8/12">
    half column and two thirds at lg breakpoint
  </div>
  <div className="col-6/12 lg:col-2/12 lg:push-2/12">
    half column and one sixth pushed all the way to the right at lg breakpoint 
  </div>
</div>
```

You don’t need to define the number of columns, as both `col-` and `push-` will just work with a fraction `span/total` as shown above.

The `row` will look for a global CSS Variable `--layout-grid-gutter` to set the spacing between columns. You can overwrite this by passing a `--grid-gutter` variable to the instance of row.

```jsx
<div
  className="row"
  style={{
    '--grid-gutter': 'var(--space-xl)',
  }}
>
  ...
</div>
```

Consider this grid a starting point to scaffold your grid based layout quickly, as it’s a very simple grid. The further you progress setting up your layouts the more likely you’ll want to roll your own custom grid CSS.

## Visibility Utilities

To quickly show and hide elements (both accessible and non-accessible) some static utility classes are provided.

```css
.hide       // display: none;
.show       // display: initial;
.visible    // visibility: visible;
.invisible  // visibility: hidden;
.sr-only    // visually hides element, but keeps it accessible for screen readers
```

### Responsive Modifiers

Any utility class can be prefixed with a breakpoint name, to only apply it from a certain viewport upwards.

```
.lg:mt-xl       // @media (--lg) { margin-top: var(--space-xl); }
.md:col-12/24   // @media (--md) { width: calc(100% / 24 * 12); }
...
```

### Removing utilities

If you don't use any of the utility classes, none should end up in your CSS bundle. It’s that simple 🎉

To remove utility styles from this template completely, you’ll need to do the following.

1. Remove `uno.config.js` from project root
2. Remove `unoCssPreset` from `/lib` 
3. Remove `unocss` dependency from `package.json`
4. Remove `UnoCSS` plugin from `vite.config.js`
5. Remove `import 'virtual:uno.css'` from `./src/App.jsx`

That’s it, all gone.
