import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security & Secrets Audit Test Suite', () => {
  const rootDir = path.resolve(__dirname, '../../../../');
  const srcDir = path.join(rootDir, 'src');

  const FORBIDDEN_SERVER_KEYS = [
    'API_SECRET_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SERVICE_ROLE_KEY',
    'DATABASE_URL',
    'DATABASE_PASSWORD',
    'POSTGRES_PASSWORD',
    'PRIVATE_KEY',
    'JWT_SECRET',
    'STRIPE_SECRET_KEY',
  ];

  let cachedSrcFiles: string[] = [];

  function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== '.next') {
          getFilesRecursively(fullPath, fileList);
        }
      } else if (/\.(tsx|ts|js|mjs)$/.test(file) && !file.includes('.test.')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  beforeAll(() => {
    cachedSrcFiles = getFilesRecursively(srcDir);
  }, 15000);

  it('ensures zero server secret keys are prefixed with NEXT_PUBLIC_ anywhere in repository', () => {
    const envExamplePath = path.join(rootDir, '.env.example');
    const filesToCheck = [...cachedSrcFiles];
    if (fs.existsSync(envExamplePath)) {
      filesToCheck.push(envExamplePath);
    }

    const violations: { file: string; line: string }[] = [];

    for (const filePath of filesToCheck) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        for (const secret of FORBIDDEN_SERVER_KEYS) {
          if (line.includes(`NEXT_PUBLIC_${secret}`)) {
            violations.push({
              file: path.relative(rootDir, filePath),
              line: `Line ${index + 1}: ${line.trim()}`,
            });
          }
        }
      });
    }

    expect(
      violations,
      `Found forbidden NEXT_PUBLIC_ secret prefixes:\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  }, 15000);

  it('ensures no "use client" components import or reference private server environment variables', () => {
    const presentationFiles = cachedSrcFiles.filter((f) =>
      f.includes(`${path.sep}presentation${path.sep}`)
    );

    const violations: { file: string; secret: string; line: string }[] = [];

    for (const filePath of presentationFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const isClientComponent =
        content.includes("'use client'") || content.includes('"use client"');

      if (isClientComponent) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          for (const secret of FORBIDDEN_SERVER_KEYS) {
            if (line.includes(`process.env.${secret}`) || line.includes(`env.${secret}`)) {
              violations.push({
                file: path.relative(rootDir, filePath),
                secret,
                line: `Line ${index + 1}: ${line.trim()}`,
              });
            }
          }
        });
      }
    }

    expect(
      violations,
      `Found client components referencing server-only secrets:\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  }, 15000);

  it('ensures next.config.ts does not leak server secrets into public env block', () => {
    const nextConfigPath = path.join(rootDir, 'next.config.ts');
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf-8');
      for (const secret of FORBIDDEN_SERVER_KEYS) {
        expect(content).not.toContain(secret);
      }
    }
  }, 15000);
});
