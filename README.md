# Godspeed You! Blocked Developer

GYBD is a simple planning tool. Teams can use it as a dashboard to coordinate a day's work. Individuals can use it to make sense of a complicated job.

In this tool, you:

*   Create plans and add tasks
*   Connect tasks to those they depend on
*   See which tasks can be worked on and which are still blocked
*   Mark off tasks as you complete them

## Usage

### Plans

A plan consists of a set of tasks and their relationships.

*   To create a new plan, type in the plan title field at the right. Then add a task.
*   To switch to an existing plan, type its name or select it from the list box.
*   To delete a plan, remove all its tasks.

### Tasks

*   To add a task, drag one out from the bin under the plan title and drop it in the canvas.
*   You can drag tasks to reposition them. You'll want to arrange tasks chronologically left to right.
*   To remove a task, drag it back to the bin.

Each task can have any number of prerequisite tasks.

*   A task is _blocked_ if any of its prerequisites are not done yet.
*   A task is _doable_ if its prerequisites are all done.
*   A task is _done_ if you've marked it done.

### Relationships

*   To add a relationship between tasks, drag the handle from the prerequisite's right edge and drop it on the task that depends on it.
*   To change a relationship, drag handle at the line's right side. You can drop it on another task to redirect it, or drop it in the canvas to remove it.

### Saving

*   GYBD uses your browser's [local storage](https://en.wikipedia.org/wiki/Web_storage) to keep your data. Data can be lost when you clear your browser cache.
*   At present there is no way to import, export, or share your data.

## Contributing

I built GYBD tool while learning some web technologies, so it does not have a mature feature set.

Contributions are welcome! Please send me a pull request. To discuss a feature before you build, please make a GitHub issue. Be sure you're happy with the [license](LICENSE).

## Documentation

*   [Architecture decisions](docs/architecture)

## Workflow

### Setup

Install Docker from the [Docker website](https://docs.docker.com/docker-for-mac/install/).

Install NVM [as directed](https://github.com/creationix/nvm#installation).

```bash
# Install AWS-CLI
brew install awscli

# Configure an AWS profile with your access key ID, secret access key, and region
aws configure --profile <profile>

# Install Yarn for use with NVM's Node
brew install yarn --without-node

# Install Node packages for local compilation
cd api
nvm install
nvm use
yarn

cd site
nvm install
nvm use
yarn
```

### API build

```bash
# Launch a container and use bash
./run-api-container.sh bash --region <region> --profile <profile>

# Build TypeScript files
yarn build

# Build, package, and archive the API artifact
yarn shipit

# Launch a container, then build, package, and archive the API artifact
./run-api-container.sh shipit --region <region> --profile <profile>
```

### Deployment

```bash
# Launch a container and use bash
./run-terraform-container.sh bash --region <region> --profile <profile> --stage <stage>

# Inspect the deployed state
terraform show
terraform output

# Plan a deployment
terraform plan -out=<file>

# Verify a planned deployment
terraform show <file>

# Apply a planned deployment
terraform apply <file>

# Plan and apply interactively
terraform apply

# Run the post-apply script
cd terraform
./post-apply.sh

# Launch container, then plan and apply interactively, then run the post-apply script
./run-terraform-container.sh deploy --region <region> --profile <profile> --stage <stage>
```
