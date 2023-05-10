import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "../backend/modules/api/schemas/schema.graphql",
    "src/api/aws.gql"
  ],
  documents: "src/api/appsync/gql/*.graphql",
  generates: {
    "src/api/appsync/api.generated.ts": {
      config: {
        importBaseApiFrom: "api/appsync/api.base",
        importBaseApiAlternateName: "appsyncApi",
        exportHooks: true,
        scalars: {
          AWSDateTime: "Date",
          AWSEmail: "string",
          AWSJSON: "string",
          AWSURL: "string",
          AWSTimestamp: "string",
        },
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-rtk-query",
      ],
    },
  },
};

export default config;
