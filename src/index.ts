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
      .split(/[\n,]/)
      .filter((x) => x !== "");

    const issueNumber = Number(
      getInput("issue_number", { required: false }) ||
        context.payload.pull_request?.number ||
        context.payload.number
    );

    if (isNaN(issueNumber)) {
      setFailed("cannot find issue/PR number!");
      return;
    }

    if (issueNumber <= 0) {
      setFailed("issue/PR number should be greater than 0!");
      return;
    }

    info(
      `Adding labels: ${labels.join(", ")} to ${owner}/${repo}#${issueNumber}`
    );

    await octokit.rest.issues.addLabels({
      owner,
      repo,
      labels,
      issue_number: issueNumber,
    });
  } catch (error) {
    setFailed(error.message);
  }
})();
