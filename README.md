# Agent Directory Template

A Git-based template for creating internal inventories of A2A-compatible AI agents. This project provides a beautiful, searchable interface for documenting and discovering agents within your organization.

**🌟 [View Live Demo](https://aymenfurter.github.io/agent-directory/)**

> **Note**: This is a sample implementation and template, not affiliated with the official A2A protocol. It's designed for documentation and team discoverability purposes.

## 🎯 What Is This?

The Agent Directory Template is a **static site generator** that helps organizations:

- **Document AI agents** using A2A protocol standards
- **Enable team discovery** of existing agents before building new ones
- **Maintain a searchable inventory** of agent capabilities and endpoints
- **Version control** agent documentation through Git
- **Deploy quickly** to any static hosting service

This is **not** a runtime agent management system or official A2A protocol agent discovery implementation - it's purely for documentation and human discoverability.

## 🔧 Adding Your Agents

### 1. Create Agent JSON Files

Add your agent configurations to `data/agents/` following the A2A protocol schema:

```json
{
  "name": "Your Agent Name",
  "description": "What your agent does",
  "url": "https://your-agent.company.com/a2a",
  "version": "1.0.0",
  "protocolVersion": "0.2.5",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false
  },
  "skills": [
    {
      "name": "skillName",
      "description": "What this skill does",
      "input": {
        "type": "object",
        "properties": {
          "query": { "type": "string" }
        }
      },
      "output": {
        "type": "object",
        "properties": {
          "result": { "type": "string" }
        }
      }
    }
  ],
  "contact": {
    "name": "Your Team",
    "email": "team@company.com"
  },
  "tags": ["category", "type", "purpose"]
}
```