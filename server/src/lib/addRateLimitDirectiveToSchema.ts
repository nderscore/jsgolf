import type { GraphQLSchema } from 'graphql';
import { getGraphQLRateLimiter } from 'graphql-rate-limit';
import { defaultFieldResolver } from 'graphql';
import { mapSchema, MapperKind, getDirectives } from '@graphql-tools/utils';

export const addRateLimitDirectiveToSchema =
  (rateLimiter: ReturnType<typeof getGraphQLRateLimiter>) =>
  (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: fieldConfig => {
        const newFieldConfig = { ...fieldConfig };

        const directives = getDirectives(schema, fieldConfig);
        const rateLimitArgs = directives.rateLimit;

        if (rateLimitArgs) {
          const originalResolver =
            newFieldConfig.resolve != null
              ? newFieldConfig.resolve
              : defaultFieldResolver;

          newFieldConfig.resolve = async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              rateLimitArgs,
            );

            if (errorMessage) throw new Error(errorMessage);

            return originalResolver(parent, args, context, info);
          };
        }

        return newFieldConfig;
      },
    });
  };
