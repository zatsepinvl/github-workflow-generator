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
