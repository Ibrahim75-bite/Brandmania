import React from 'react';
import {
  generateSchemaGraph,
  type SchemaGraphOptions,
  type JsonLdGraph,
} from '@/infrastructure/seo/schemaGraph';

export interface StructuredDataProps extends SchemaGraphOptions {
  customGraph?: JsonLdGraph;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  customGraph,
  ...options
}) => {
  const graph = customGraph || generateSchemaGraph(options);

  const jsonLdString = JSON.stringify(graph).replace(/</g, '\\u003c');

  return (
    <script
      id="structured-data-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
};
