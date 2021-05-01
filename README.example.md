# Exploring CI/CD with a Profile README.md

[Profile READMEs](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme) are a fun easter egg on GitHub. If you create a
repository on your personal account with the same name as your username,
the `README.md` in this repository will be displayed on your profile page.

Here's [an example](https://github.com/bcoe/bcoe).

In this hands on workshop, we explore the topic of CI/CD using
[GitHub Actions](https://docs.github.com/en/actions) and your Profile README.md.

## The Workshop

### Prerequisites

**Join the GoogleDeveloperAcademy Organization:**

Instructions will be made available for doing so, reach out to an instructor
if you bump into any issues.

**Configure Node.js:**

Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
(_the Node Version Manager_), and use this to configure the most recent release
of Node 14 on your computer:

```bash
nvm install 14
nvm use 14
```

### Use this repository as a template

Using this repository as a template, create a new repository on your personal
account with the same name as your username:

 <img width="600" src="https://raw.githubusercontent.com/GoogleDeveloperAcademy/profile-readme-template/main/images/template.png">

### Personalize your profile page

Let's personalize your biography:

1. Clone the repository you've just created (_I recommend using [ssh](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)_).
2. Create a branch to commit your changes on,
  `cd [my-user-name]`, `git checkout -b personalize`.
3. Replace the contents of `README.md` with the contents of `README.example.md`.
  > `README.example.md` is meant as a starting point, customize this to match
  > your bio. Make sure to leave a link to `./interests.svg` as this is used
  > in the following steps in the exercise.
4. Edit the contents of `interests.json` to match your interests (_this file is used to generate
  the pie chart on your profile page_).
5. Install the project's dependencies, `npm i`.
6. Generate a new pie chart, `npm run generate`.

### Open a pull request

Having made your changes locally, push them to GitHub and open a pull request:

1. `git commit -a -m 'docs: update bio to reflect myself'`.
2. `git push origin personalize`.
3. Visit GitHub and [create a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). **Don't merge the pull request immediately**.

### Look closely at your pull request

You may notice that at the bottom of your pull request, there are a few failing
checks:

 <img width="600" src="https://raw.githubusercontent.com/GoogleDeveloperAcademy/profile-readme-template/main/images/failing-checks.png">

You may be asking yourself, where did these come from?

When you created your repository, it included the file `.github/workflows/ci.yaml`:

  ```yaml
    on:
    push:
        branches:
        - main
    pull_request:
    name: ci
    jobs:
    test:
        runs-on: ubuntu-latest
        strategy:
        matrix:
            node: [12, 14, 15]
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
            with:
            node-version: ${{ matrix.node }}
        - run: node --version
        - run: npm install
        - run: npm test
  ```

This file describes a GitHub Action workflow which will run unit tests when
a pull request is open. When you edited `interests.json`, you broke some of the unit tests described
in `test.js`.

> Automated tests are an important part of Continuous Integration, because they ensure that the code that lands on the `main` branch is passing.

### Getting tests passing

1. run `npm t` locally, this will show you which tests are currently failing.
2. the most likely culprit for failures is the test case,
    `must only list Ben's interests`. _This feels like it is perhaps overly
    specific!_
3. go ahead and remove this test case, and fix any other tests that are failing.
4. once tests are passing locally, again commit your changes and push to the
  remote branch, `git commit -a -m 'test: fixed failing tests'`, `git push origin personalize`.

### Revisit your pull request

After a minute or two, you should again see all tests have passed:

<img width="600" src="https://raw.githubusercontent.com/GoogleDeveloperAcademy/profile-readme-template/main/images/passing-tests.png">

Go ahead and merge your pull request, and visit your profile page on
GitHub (`github.com/[your-user-name]`).

**You should see your own personalized profile README.md 🎉**

### What's next?

One shortcoming of our profile page generator is that we rely on someone
running `npm run generate` locally to ensure that our pie chart is updated.

`bcoe` has updated their repository with a workflow called [`update-svg.yaml`](https://github.com/bcoe/bcoe/blob/main/.github/workflows/update-svg.yaml), which automatically pushes
an updated version of `interests.svg`, when changes are landed to the `main`
branch.

Use this file as a starting point, and try adding similar functionality to
your repository. Once configured, any updates to `interests.json` should be reflected in an
automated pull request, [like this](https://github.com/bcoe/bcoe/pull/4).

> Pushing code automatically to a branch like this is analogous to Continuous Deployment.

## You're done!

That's the end of the workshop 🥳

But, I encourage you to continue personalizing your `README.md`, and to keep
experimenting with GitHub Actions.

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-secret-manager/blob/master/LICENSE)
