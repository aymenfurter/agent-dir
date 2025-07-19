#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const agentsDir = path.join(__dirname, '../agents');
const contentDir = path.join(__dirname, '../content/agents');
const dataDir = path.join(__dirname, '../data');

// Ensure directories exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Get all agent JSON files
const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.json'));
const agents = [];

// Process each agent
agentFiles.forEach(file => {
  try {
    const filePath = path.join(agentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const agent = JSON.parse(content);
    
    // Add the filename for reference
    agent.filename = file;
    agent.slug = path.basename(file, '.json');
    
    agents.push(agent);

    // Generate markdown file for the agent
    const markdownContent = generateMarkdown(agent);
    const markdownPath = path.join(contentDir, `${agent.slug}.md`);
    fs.writeFileSync(markdownPath, markdownContent);
    
    console.log(`✅ Generated ${agent.slug}.md`);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

// Generate data file for Hugo
const dataContent = {
  agents: agents,
  lastUpdated: new Date().toISOString()
};

fs.writeFileSync(
  path.join(dataDir, 'agents.json'),
  JSON.stringify(dataContent, null, 2)
);

console.log(`\n🎉 Generated ${agents.length} agent pages and data file!`);

function generateMarkdown(agent) {
  const skillsList = agent.skills ? agent.skills.map(skill => 
    `- **${skill.name}**: ${skill.description}`
  ).join('\n') : '';

  const tagsList = agent.skills ? 
    [...new Set(agent.skills.flatMap(s => s.tags || []))].join(', ') : '';

  return `---
title: "${agent.name}"
description: "${agent.description}"
agent_url: "${agent.url}"
version: "${agent.version}"
protocolVersion: "${agent.protocolVersion}"
provider: "${agent.provider?.organization || 'Unknown'}"
capabilities:
  streaming: ${agent.capabilities?.streaming || false}
  pushNotifications: ${agent.capabilities?.pushNotifications || false}
  stateTransitionHistory: ${agent.capabilities?.stateTransitionHistory || false}
tags: [${tagsList}]
date: ${new Date().toISOString()}
type: "agent"
---

## Overview

${agent.description}

## Provider Information

- **Organization**: ${agent.provider?.organization || 'Not specified'}
- **Website**: ${agent.provider?.url || 'Not specified'}

## Capabilities

- **Streaming**: ${agent.capabilities?.streaming ? '✅ Supported' : '❌ Not supported'}
- **Push Notifications**: ${agent.capabilities?.pushNotifications ? '✅ Supported' : '❌ Not supported'}
- **State Transition History**: ${agent.capabilities?.stateTransitionHistory ? '✅ Supported' : '❌ Not supported'}

## Skills

${skillsList}

## Technical Details

- **Protocol Version**: ${agent.protocolVersion}
- **Agent Version**: ${agent.version}
- **Base URL**: \`${agent.url}\`
- **Input Modes**: ${agent.defaultInputModes?.join(', ') || 'Not specified'}
- **Output Modes**: ${agent.defaultOutputModes?.join(', ') || 'Not specified'}

## Usage Examples

${agent.skills ? agent.skills.map(skill => 
  skill.examples ? skill.examples.map(example => `- ${example}`).join('\n') : ''
).filter(Boolean).join('\n') : 'No examples available.'}

## JSON Configuration

\`\`\`json
${JSON.stringify(agent, null, 2)}
\`\`\`
`;
}
