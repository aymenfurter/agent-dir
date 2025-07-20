<h1 align="center">Agent Directory Template</h1>

<p align="center">
A Git-based template for creating internal inventories of A2A-compatible AI agents. This project provides a beautiful, searchable interface for documenting and discovering agents within your organization.
</p>

<p align="center">
  <a href="https://aymenfurter.github.io/agent-dir/">🔗 View Live Demo</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/aymenfurter/agent-dir/main/screenshot.png" alt="Agent Directory Screenshot" width="700"/>
</p>

<blockquote>
<b>Note</b>: This is a sample implementation and template, not affiliated with the official A2A protocol. It's designed for documentation and team discoverability purposes.
</blockquote>

<hr/>

<h2>What Is This?</h2>

<p>The Agent Directory Template is a <b>static site generator</b> that helps organizations:</p>

<ul>
  <li>Document AI agents using A2A protocol standards</li>
  <li>Enable team discovery of existing agents before building new ones</li>
  <li>Maintain a searchable inventory of agent capabilities and endpoints</li>
  <li>Version control agent documentation through Git</li>
  <li>Deploy quickly to any static hosting service</li>
</ul>

<p><b>This is not</b> a runtime agent management system or an official A2A protocol agent discovery implementation. It's purely for documentation and human discoverability.</p>

<hr/>

<h2>How It Works</h2>

<p>This template uses a <b>GitOps workflow</b> to automatically build and deploy your agent directory. You simply add or update agent JSON files, and a GitHub Action handles the rest.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/aymenfurter/agent-dir/main/workflow.png" alt="Agent Directory Workflow" width="700"/>
</p>

<ol>
  <li><b>Commit JSON:</b> Developers add or update agent definitions in the <code>/agents</code> directory.</li>
  <li><b>CI/CD Trigger:</b> A push to the <code>main</code> branch triggers the GitHub Actions workflow.</li>
  <li><b>Generate & Build:</b> The workflow runs a script to generate Markdown pages from your JSON files and then builds the static site using Hugo.</li>
  <li><b>Deploy:</b> The final static site is automatically deployed to GitHub Pages.</li>
</ol>

<hr/>

<h2>Adding Your Agents</h2>

<h3>1. Create Agent JSON Files</h3>

<p>Add your agent configurations as individual <code>.json</code> files in the <code>/agents</code> directory. You can use <code>template-agent.json</code> as a starting point.</p>

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

<h3>2. Commit and Push</h3>

<p>Commit your new agent file and push it to the <code>main</code> branch. The GitHub Action will automatically update the live site.</p>

<hr/>

<h2>Local Development</h2>

<ol>
  <li><b>Clone the repository:</b></li>

  <pre><code>git clone https://github.com/aymenfurter/agent-dir.git
cd agent-dir</code></pre>

  <li><b>Install dependencies:</b></li>

  <pre><code>npm install</code></pre>

  <li><b>Run the dev server:</b></li>

  <pre><code>npm run dev</code></pre>

  <li>Open your browser to <code>http://localhost:1313</code></li>
</ol>

<hr/>

<h2>License</h2>

<p>This project is licensed under the <b>MIT License</b>. See the <a href="./LICENSE">LICENSE</a> file for details.</p>
