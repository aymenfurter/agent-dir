# Agent Directory Template

A Git-based template for creating internal inventories of A2A-compatible AI agents. This project provides a beautiful, searchable interface for documenting and discovering agents within your organization.

**🌟 [View Live Demo](https://aymenfurter.github.io/agent-dir/)**

![Agent Directory Screenshot](https://raw.githubusercontent.com/aymenfurter/agent-dir/main/screenshot.png)

> **Note**: This is a sample implementation and template, not affiliated with the official A2A protocol. It's designed for documentation and team discoverability purposes.

## What Is This?

The Agent Directory Template is a **static site generator** that helps organizations:

- **Document AI agents** using A2A protocol standards.
- **Enable team discovery** of existing agents before building new ones.
- **Maintain a searchable inventory** of agent capabilities and endpoints.
- **Version control** agent documentation through Git.
- **Deploy quickly** to any static hosting service.

This is **not** a runtime agent management system or an official A2A protocol agent discovery implementation—it's purely for documentation and human discoverability.

## ⚙️ How It Works

This template uses a **GitOps workflow** to automatically build and deploy your agent directory. You simply add or update agent JSON files, and a GitHub Action handles the rest.

![Agent Directory Workflow Diagram](https://raw.githubusercontent.com/aymenfurter/agent-dir/main/workflow.png)

1.  **Commit JSON:** Developers add or update agent definitions in the `/agents` directory.
2.  **CI/CD Trigger:** A push to the `main` branch triggers the GitHub Actions workflow.
3.  **Generate & Build:** The workflow runs a script to generate Markdown pages from your JSON files and then builds the static site using Hugo.
4.  **Deploy:** The final static site is automatically deployed to GitHub Pages.

## 🔧 Adding Your Agents

### 1. Create Agent JSON Files

Add your agent configurations as individual `.json` files in the `/agents` directory. You can use `template-agent.json` as a starting point.

```json
{
  "protocolVersion": "0.2.6",
  "name": "Your Agent Name",
  "description": "Detailed description of what your agent does and its main capabilities.",
  "url": "https://your-agent.example.com/a2a",
  "version": "1.0.0",
  "provider": {
    "organization": "Your Organization Name",
    "url": "https://your-organization.com"
  },
  "capabilities": {
    "streaming": true,
    "pushNotifications": false
  },
  "skills": [
    {
      "id": "exampleSkill",
      "name": "exampleSkill",
      "description": "Description of what this skill does and how it helps users.",
      "tags": ["category", "feature", "type"],
      "examples": [
        "How to use this skill - example 1",
        "Another way to use this skill"
      ]
    }
  ]
}
```

### 2. Commit and Push

Commit your new agent file and push it to the `main` branch. The GitHub Action will automatically update the live site.

## 🚀 Local Development

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/aymenfurter/agent-dir.git
    cd agent-dir
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Run the dev server:**
    This script generates the pages and starts the Hugo server with live reloading.
    ```sh
    npm run dev
    ```
4.  Open your browser to `http://localhost:1313`.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
