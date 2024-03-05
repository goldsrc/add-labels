# Add Labels

A GitHub Action to add labels on PR / Issues.

## Inputs

### `labels`

**Required** Labels to add.

### `issue_number`

**Optional** Issue/Pull Request number

## Example usage

```yaml
name: Add Label
on:
  pull_request:
    branches:
      - main
    types:
      - opened

jobs:
  add-label:
    name: Add Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: christianvuerings/add-labels@v1
        with:
          labels: |
            minor release
            bug
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Update compiled files

```bash
pnpm i
npm i -g @vercel/ncc
ncc build src/index.ts
```

## Acknowledgements

forked from [christianvuerings/add-labels](https://github.com/christianvuerings/add-labels)
