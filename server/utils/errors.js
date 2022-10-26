import { GraphQLError } from "graphql";

export class UniquenessError extends GraphQLError {
  constructor(argName) {
    super(`An account with that ${argName} already exists`, {
      extensions: { code: "UNIQUENESS_ERROR", argName },
    });
  }
}
