Media frame with hover-zoom inner + neutral placeholder fallback; use inside cards/heros.

```jsx
<Media src={url} ratio="16/9" alt="..." />
<Media ratio="4/3" label="GÖRSEL ALANI" />
```

No `src` → renders a placeholder with optional `label` (never fake imagery).