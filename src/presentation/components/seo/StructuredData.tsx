import React from 'react';
import {
  generateSchemaGraph,
  type SchemaGraphOptions,
  type JsonLdGraph,
} from '@/infrastructure/seo/schemaGraph';

export interface StructuredDataProps extends SchemaGraphOptions {
  customGraph?: JsonLdGraph;
}

/**
 * React Server Component that injects the complete, production-grade
 * Schema.org JSON-LD @graph script into the Server-Side HTML.
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  customGraph,
  ...options
}) => {
  const graph = customGraph || generateSchemaGraph(options);

  // Safe stringify: escape '<' to prevent closing </script> tags in payload
  const jsonLdString = JSON.stringify(graph).replace(/</g, '\\u003c');

  return (
    <script
      id="structured-data-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
};
