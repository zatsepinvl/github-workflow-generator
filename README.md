# GitHub Workflow Generator

:rocket: **GitHub Workflow as Code** :rocket:

## Example

```typescript
import { GithubWorkflow } from "../lib/generator";
import { expr } from "../lib/github";
import { Git } from "../lib/tools/git";
import { Yarn } from "../lib/tools/yarn";
import { NodeJs } from "../lib/tools/nodejs";

GithubWorkflow.generate(
    {
        name: "build",
        on: {
            push: {},
            workflow_dispatch: {},
        },
        jobs: {
            build: {
                "runs-on": "ubuntu-latest",
                "timeout-minutes": 5,
                if: expr("!contains(github.event.head_commit.author.name, 'Bot')"),
                steps: [
                    // Setup
                    Git.checkout(),
                    NodeJs.setup(),
                    Yarn.install({ offline: true }),

                    // Check
                    Yarn.audit(),
                    Yarn.lint(),
                    Yarn.test(),

                    // Build
                    Yarn.build(),
                ],
            },
        },
    },
    {
        outputPath: `${__dirname}/nodejs-build.yaml`,
    },
);
```

is generated into:

```yaml
# This is auto generate file. Do not edit.
name: build
on:
  push: {}
  workflow_dispatch: {}
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    if: ${{ !contains(github.event.head_commit.author.name, 'Bot') }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with: {}
      - name: Setup Nodejs
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Yarn install
        run: yaml install --prefer-offline
      - name: Yarn audit
        run: bash -c 'yarn audit; [[ $? -ge 16 ]] && exit 1 || exit 0'
      - name: Yarn lint
        run: yarn lint
      - name: Yarn test
        run: yarn test
      - name: Yarn build
        run: yarn build
```
