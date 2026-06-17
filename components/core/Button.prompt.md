Primary CTA button with fill-wipe + magnetic hover; use for any call-to-action.

```jsx
<Button variant="primary" iconRight={<span>→</span>} magnetic>Teklif Al</Button>
<Button variant="secondary" size="lg">İncele</Button>
<Button variant="ghost" iconRight={<span>→</span>}>Tümünü Gör</Button>
```

Variants: primary (filled green), secondary (ink outline, green fill-wipe up), ghost (text). Sizes sm/md/lg. `href` renders an <a>. `magnetic` opts into the page-level magnetic cursor JS.