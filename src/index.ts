import { setFailed, info, getInput } from "@actions/core";
import { getOctokit, context } from "@actions/github";

(async () => {
  try {
    const githubToken = process.env["GITHUB_TOKEN"];
    if (!githubToken) {
      setFailed("GITHUB_TOKEN does not exist.");
      return;
    }

    const octokit = getOctokit(githubToken);
    const { owner, repo } = context.repo;

    const labels = getInput("labels")
      .split("\n")
      .filter((x) => x !== "");

    const issueNumber = context.payload.number;

    info(`Add labels: ${labels} to ${owner}/${repo}#${issueNumber}`);

    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels,
    });
  } catch (error) {
    setFailed(error.message);
  }
})();
