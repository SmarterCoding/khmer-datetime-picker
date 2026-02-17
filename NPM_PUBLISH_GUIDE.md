# npm publish guide (khmer-datetimepicker)

## 1) Prepare repo
- Make sure you have:
  - `package.json`
  - `dist/khmer-datetimepicker.js`
  - `dist/khmer-datetimepicker.min.js`
  - `dist/khmer-datetimepicker.css`
- Optional but recommended: `LICENSE`, `README.md`

## 2) Create an npm account + login
```bash
npm adduser
# or
npm login
```

## 3) Check your package locally
```bash
npm pack --dry-run
```
This shows which files will be published (your `files` field is set to publish only `dist/`).

## 4) Publish
```bash
npm publish --access public
```

## 5) Update version later
Use **semver**:
```bash
npm version patch   # 1.0.1
npm version minor   # 1.1.0
npm version major   # 2.0.0
npm publish
```

## 6) Use via CDN (after publish)
```html
<script src="https://cdn.jsdelivr.net/npm/khmer-datetimepicker@1.0.0/dist/khmer-datetimepicker.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/khmer-datetimepicker@1.0.0/dist/khmer-datetimepicker.css">
```
