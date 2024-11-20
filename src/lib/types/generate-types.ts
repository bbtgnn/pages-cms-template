import { parse } from 'yaml';
import fs from 'fs';
import path from 'path';

// Define base types for field configurations
interface BaseField {
    name: string;
    label: string;
    type: string;
}

interface StringField extends BaseField {
    type: 'string';
}

interface ImageField extends BaseField {
    type: 'image';
}

type Field = StringField | ImageField;

interface ContentConfig {
    name: string;
    label: string;
    path: string;
    type: 'file' | 'collection';
    fields: Field[];
}

interface PagesConfig {
    media: {
        input: string;
        output: string;
    };
    content: ContentConfig[];
}

// Function to generate TypeScript interfaces from content config
function generateContentTypes(): string {
    const configPath = path.resolve(process.cwd(), '.pages.yml');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const config = parse(configContent) as PagesConfig;

    let output = '// Auto-generated types from .pages.yml\n\n';

    // Generate interfaces for each content type
    config.content.forEach((content) => {
        const interfaceName = `${toPascalCase(content.name)}Content`;
        output += `export interface ${interfaceName} {\n`;
        
        content.fields.forEach((field) => {
            const fieldType = getTypeForField(field);
            output += `  ${field.name}: ${fieldType};\n`;
        });

        output += '}\n\n';
    });

    return output;
}

// Helper function to convert kebab-case or snake_case to PascalCase
function toPascalCase(str: string): string {
    return str
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

// Helper function to determine TypeScript type from field config
function getTypeForField(field: Field): string {
    switch (field.type) {
        case 'string':
            return 'string';
        case 'image':
            return 'string'; // Image fields store paths as strings
        default:
            return 'any';
    }
}

// Generate the types and write to file
const generatedTypes = generateContentTypes();
const outputPath = path.resolve(process.cwd(), 'src/lib/types/generated-types.ts');
fs.writeFileSync(outputPath, generatedTypes, 'utf-8');
console.log(`Types written to ${outputPath}`);
