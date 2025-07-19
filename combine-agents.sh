#!/bin/bash

# Script to combine agent JSON files into a single agents.json file

echo "🔄 Combining agent JSON files..."

# Create temporary file
temp_file=$(mktemp)

# Start JSON array
echo '[' > "$temp_file"

# Add each agent JSON file to the array
first=true
for file in agents/*.json; do
    if [ "$first" = true ]; then
        first=false
    else
        echo ',' >> "$temp_file"
    fi
    cat "$file" >> "$temp_file"
done

# Close JSON array
echo ']' >> "$temp_file"

# Move to data directory
mv "$temp_file" data/agents.json

echo "✅ Combined $(ls agents/*.json | wc -l) agent files into data/agents.json"
