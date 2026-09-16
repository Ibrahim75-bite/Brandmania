import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function getAllSourceFiles(dirPath: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dirPath)) return files;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllSourceFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractImports(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importLines: string[] = [];
  const regex = /(?:import|export)\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    importLines.push(match[1]);
  }
  return importLines;
}

describe('Architectural Boundary Enforcement Tests', () => {
  const domainDir = path.resolve(__dirname, '../../src/domain');
  const applicationDir = path.resolve(__dirname, '../../src/application');

  it('DOMAIN LAYER: Must not import infrastructure, presentation, React, Next, or database modules', () => {
    const domainFiles = getAllSourceFiles(domainDir);
    expect(domainFiles.length).toBeGreaterThan(0);

    const violations: { file: string; imported: string }[] = [];

    for (const file of domainFiles) {
      const imports = extractImports(file);
      for (const imp of imports) {
        if (
          imp.startsWith('@/infrastructure') ||
          imp.startsWith('../infrastructure') ||
          imp.startsWith('../../infrastructure') ||
          imp.startsWith('@/presentation') ||
          imp.startsWith('../presentation') ||
          imp.startsWith('@/app') ||
          imp.startsWith('react') ||
          imp.startsWith('next')
        ) {
          violations.push({ file: path.relative(domainDir, file), imported: imp });
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('APPLICATION LAYER: Must not import Next.js HTTP server primitives or presentation components', () => {
    const appFiles = getAllSourceFiles(applicationDir);
    expect(appFiles.length).toBeGreaterThan(0);

    const violations: { file: string; imported: string }[] = [];

    for (const file of appFiles) {
      const imports = extractImports(file);
      for (const imp of imports) {
        if (
          imp.startsWith('next/server') ||
          imp.startsWith('next/router') ||
          imp.startsWith('@/presentation') ||
          imp.startsWith('../presentation')
        ) {
          violations.push({ file: path.relative(applicationDir, file), imported: imp });
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
