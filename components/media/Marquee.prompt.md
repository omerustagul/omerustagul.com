Seamless infinite marquee; use for partner logos / tickers. Pauses on hover.

```jsx
<Marquee speed={28}>{brands.map(b => <span key={b}>{b}</span>)}</Marquee>
```

Children are auto-duplicated for the loop.