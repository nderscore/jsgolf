import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import type { MercuriusContext } from 'mercurius';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) =>
  | Promise<import('mercurius-codegen').DeepPartial<TResult>>
  | import('mercurius-codegen').DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  _FieldSet: any;
};

export type Query = {
  __typename?: 'Query';
  /** Get a challenge by ID */
  getChallenge?: Maybe<Challenge>;
  /** Get list of published challenges */
  getChallenges: Array<Challenge>;
  /** Get list of proposed challenges */
  getProposedChallenges: Array<Challenge>;
  /** Get a user profile by ID */
  getUser?: Maybe<User>;
  /** Get the currently authenticated user's profile */
  getOwnUser?: Maybe<User>;
  /** Get all votes for a proposed challenge */
  getVotes: Array<Vote>;
};

export type QuerygetChallengeArgs = {
  id: Scalars['ID'];
};

export type QuerygetUserArgs = {
  id: Scalars['ID'];
};

export type QuerygetVotesArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Executes a dry run of arbitrary code golf Challenge code */
  testChallenge: Result;
  /** Creates a new code golf Challenge */
  createChallenge: CreateChallengeResult;
  /** Modifies a draft code golf Challenge */
  editDraftChallenge: CreateChallengeResult;
  /** Submits a draft Challenge publicly for voting */
  proposeChallenge: Result;
  /** Delete a draft or rejected Challenge */
  deleteOwnChallenge: Scalars['Boolean'];
  /** Publishes a proposed Challenge */
  publishChallenge: Scalars['Boolean'];
  /** Rejects a proposed Challenge */
  rejectChallenge: Scalars['Boolean'];
  /** Submits a solution to a published Challenege */
  createSolution: CreateSolutionResult;
  /** Executes a dry run of a solution */
  testSolution: Result;
  /** Upvote a proposed Challenge */
  upvote: Scalars['Boolean'];
  /** Downvote a proposed Challenge with reason */
  downvote: Scalars['Boolean'];
};

export type MutationtestChallengeArgs = {
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
};

export type MutationcreateChallengeArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
};

export type MutationeditDraftChallengeArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
};

export type MutationproposeChallengeArgs = {
  id: Scalars['ID'];
};

export type MutationdeleteOwnChallengeArgs = {
  id: Scalars['ID'];
};

export type MutationpublishChallengeArgs = {
  id: Scalars['ID'];
};

export type MutationrejectChallengeArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};

export type MutationcreateSolutionArgs = {
  challenge: Scalars['ID'];
  solutionCode: Scalars['String'];
};

export type MutationtestSolutionArgs = {
  challenge: Scalars['ID'];
  solutionCode: Scalars['String'];
};

export type MutationupvoteArgs = {
  challenge: Scalars['ID'];
};

export type MutationdownvoteArgs = {
  challenge: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};

export enum ChallengeStatus {
  DRAFT = 'DRAFT',
  PROPOSED = 'PROPOSED',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}

export type Challenge = {
  __typename?: 'Challenge';
  id: Scalars['ID'];
  updated: Scalars['Date'];
  published?: Maybe<Scalars['Date']>;
  title: Scalars['String'];
  description: Scalars['String'];
  author: User;
  authorId: Scalars['ID'];
  status: ChallengeStatus;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  draftSolution?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  solutions?: Maybe<Array<Solution>>;
  upvotes?: Maybe<Scalars['Int']>;
  downvotes?: Maybe<Scalars['Int']>;
  rejectionReason?: Maybe<Scalars['String']>;
};

export type CreateChallengeResult = {
  __typename?: 'CreateChallengeResult';
  challenge?: Maybe<Challenge>;
  result: Result;
};

export enum Role {
  USER = 'USER',
  CREATOR = 'CREATOR',
  PUBLISHER = 'PUBLISHER',
  MODERATOR = 'MODERATOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export type Result = {
  __typename?: 'Result';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateSolutionResult = {
  __typename?: 'CreateSolutionResult';
  solution?: Maybe<Solution>;
  result: Result;
};

export type Solution = {
  __typename?: 'Solution';
  authorId: Scalars['ID'];
  author: User;
  timestamp: Scalars['Date'];
  size: Scalars['Int'];
  code?: Maybe<Scalars['String']>;
  challengeId: Scalars['ID'];
  challenge: Challenge;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  githubId: Scalars['Int'];
  name: Scalars['String'];
  challenges: Array<Challenge>;
  solutions: Array<Solution>;
};

export enum VoteValue {
  UP = 'UP',
  DOWN = 'DOWN',
}

export type Vote = {
  __typename?: 'Vote';
  userId: Scalars['ID'];
  user: User;
  value: VoteValue;
  reason?: Maybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChallengeStatus: ChallengeStatus;
  Challenge: ResolverTypeWrapper<Challenge>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateChallengeResult: ResolverTypeWrapper<CreateChallengeResult>;
  Role: Role;
  Result: ResolverTypeWrapper<Result>;
  CreateSolutionResult: ResolverTypeWrapper<CreateSolutionResult>;
  Solution: ResolverTypeWrapper<Solution>;
  User: ResolverTypeWrapper<User>;
  VoteValue: VoteValue;
  Vote: ResolverTypeWrapper<Vote>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Query: {};
  ID: Scalars['ID'];
  Mutation: {};
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Challenge: Challenge;
  Int: Scalars['Int'];
  CreateChallengeResult: CreateChallengeResult;
  Result: Result;
  CreateSolutionResult: CreateSolutionResult;
  Solution: Solution;
  User: User;
  Vote: Vote;
};

export type authDirectiveArgs = { role?: Maybe<Role> };

export type authDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = authDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type rateLimitDirectiveArgs = {
  max?: Maybe<Scalars['Int']>;
  window?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  identityArgs?: Maybe<Array<Maybe<Scalars['String']>>>;
  arrayLengthField?: Maybe<Scalars['String']>;
};

export type rateLimitDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = rateLimitDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getChallenge?: Resolver<
    Maybe<ResolversTypes['Challenge']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetChallengeArgs, 'id'>
  >;
  getChallenges?: Resolver<
    Array<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >;
  getProposedChallenges?: Resolver<
    Array<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >;
  getUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserArgs, 'id'>
  >;
  getOwnUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getVotes?: Resolver<
    Array<ResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetVotesArgs, 'id'>
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  testChallenge?: Resolver<
    ResolversTypes['Result'],
    ParentType,
    ContextType,
    RequireFields<
      MutationtestChallengeArgs,
      'setupCode' | 'testCode' | 'solutionCode'
    >
  >;
  createChallenge?: Resolver<
    ResolversTypes['CreateChallengeResult'],
    ParentType,
    ContextType,
    RequireFields<
      MutationcreateChallengeArgs,
      'title' | 'description' | 'setupCode' | 'testCode' | 'solutionCode'
    >
  >;
  editDraftChallenge?: Resolver<
    ResolversTypes['CreateChallengeResult'],
    ParentType,
    ContextType,
    RequireFields<
      MutationeditDraftChallengeArgs,
      'id' | 'title' | 'description' | 'setupCode' | 'testCode' | 'solutionCode'
    >
  >;
  proposeChallenge?: Resolver<
    ResolversTypes['Result'],
    ParentType,
    ContextType,
    RequireFields<MutationproposeChallengeArgs, 'id'>
  >;
  deleteOwnChallenge?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteOwnChallengeArgs, 'id'>
  >;
  publishChallenge?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationpublishChallengeArgs, 'id'>
  >;
  rejectChallenge?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationrejectChallengeArgs, 'id' | 'reason'>
  >;
  createSolution?: Resolver<
    ResolversTypes['CreateSolutionResult'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateSolutionArgs, 'challenge' | 'solutionCode'>
  >;
  testSolution?: Resolver<
    ResolversTypes['Result'],
    ParentType,
    ContextType,
    RequireFields<MutationtestSolutionArgs, 'challenge' | 'solutionCode'>
  >;
  upvote?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationupvoteArgs, 'challenge'>
  >;
  downvote?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationdownvoteArgs, 'challenge'>
  >;
};

export type ChallengeResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChallengeStatus'], ParentType, ContextType>;
  setupCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  draftSolution?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  solutions?: Resolver<
    Maybe<Array<ResolversTypes['Solution']>>,
    ParentType,
    ContextType
  >;
  upvotes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  downvotes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rejectionReason?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateChallengeResultResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['CreateChallengeResult'] = ResolversParentTypes['CreateChallengeResult'],
> = {
  challenge?: Resolver<
    Maybe<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result'],
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateSolutionResultResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['CreateSolutionResult'] = ResolversParentTypes['CreateSolutionResult'],
> = {
  solution?: Resolver<
    Maybe<ResolversTypes['Solution']>,
    ParentType,
    ContextType
  >;
  result?: Resolver<ResolversTypes['Result'], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SolutionResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Solution'] = ResolversParentTypes['Solution'],
> = {
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  challengeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  challenge?: Resolver<ResolversTypes['Challenge'], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  githubId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  challenges?: Resolver<
    Array<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >;
  solutions?: Resolver<
    Array<ResolversTypes['Solution']>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote'],
> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['VoteValue'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Challenge?: ChallengeResolvers<ContextType>;
  CreateChallengeResult?: CreateChallengeResultResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  CreateSolutionResult?: CreateSolutionResultResolvers<ContextType>;
  Solution?: SolutionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MercuriusContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = MercuriusContext> = {
  auth?: authDirectiveResolver<any, any, ContextType>;
  rateLimit?: rateLimitDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = MercuriusContext> =
  DirectiveResolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply;
  },
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import('mercurius').MercuriusContext & {
    reply: import('fastify').FastifyReply;
  },
> {
  Challenge?: {
    id?: LoaderResolver<Scalars['ID'], Challenge, {}, TContext>;
    updated?: LoaderResolver<Scalars['Date'], Challenge, {}, TContext>;
    published?: LoaderResolver<Maybe<Scalars['Date']>, Challenge, {}, TContext>;
    title?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    description?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    author?: LoaderResolver<User, Challenge, {}, TContext>;
    authorId?: LoaderResolver<Scalars['ID'], Challenge, {}, TContext>;
    status?: LoaderResolver<ChallengeStatus, Challenge, {}, TContext>;
    setupCode?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    testCode?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    draftSolution?: LoaderResolver<
      Maybe<Scalars['String']>,
      Challenge,
      {},
      TContext
    >;
    tags?: LoaderResolver<Array<Scalars['String']>, Challenge, {}, TContext>;
    solutions?: LoaderResolver<Maybe<Array<Solution>>, Challenge, {}, TContext>;
    upvotes?: LoaderResolver<Maybe<Scalars['Int']>, Challenge, {}, TContext>;
    downvotes?: LoaderResolver<Maybe<Scalars['Int']>, Challenge, {}, TContext>;
    rejectionReason?: LoaderResolver<
      Maybe<Scalars['String']>,
      Challenge,
      {},
      TContext
    >;
  };

  CreateChallengeResult?: {
    challenge?: LoaderResolver<
      Maybe<Challenge>,
      CreateChallengeResult,
      {},
      TContext
    >;
    result?: LoaderResolver<Result, CreateChallengeResult, {}, TContext>;
  };

  Result?: {
    success?: LoaderResolver<Scalars['Boolean'], Result, {}, TContext>;
    errors?: LoaderResolver<
      Maybe<Array<Maybe<Scalars['String']>>>,
      Result,
      {},
      TContext
    >;
  };

  CreateSolutionResult?: {
    solution?: LoaderResolver<
      Maybe<Solution>,
      CreateSolutionResult,
      {},
      TContext
    >;
    result?: LoaderResolver<Result, CreateSolutionResult, {}, TContext>;
  };

  Solution?: {
    authorId?: LoaderResolver<Scalars['ID'], Solution, {}, TContext>;
    author?: LoaderResolver<User, Solution, {}, TContext>;
    timestamp?: LoaderResolver<Scalars['Date'], Solution, {}, TContext>;
    size?: LoaderResolver<Scalars['Int'], Solution, {}, TContext>;
    code?: LoaderResolver<Maybe<Scalars['String']>, Solution, {}, TContext>;
    challengeId?: LoaderResolver<Scalars['ID'], Solution, {}, TContext>;
    challenge?: LoaderResolver<Challenge, Solution, {}, TContext>;
  };

  User?: {
    id?: LoaderResolver<Scalars['ID'], User, {}, TContext>;
    githubId?: LoaderResolver<Scalars['Int'], User, {}, TContext>;
    name?: LoaderResolver<Scalars['String'], User, {}, TContext>;
    challenges?: LoaderResolver<Array<Challenge>, User, {}, TContext>;
    solutions?: LoaderResolver<Array<Solution>, User, {}, TContext>;
  };

  Vote?: {
    userId?: LoaderResolver<Scalars['ID'], Vote, {}, TContext>;
    user?: LoaderResolver<User, Vote, {}, TContext>;
    value?: LoaderResolver<VoteValue, Vote, {}, TContext>;
    reason?: LoaderResolver<Maybe<Scalars['String']>, Vote, {}, TContext>;
  };
}
export type testChallengeMutationVariables = Exact<{
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
}>;

export type testChallengeMutation = { __typename?: 'Mutation' } & {
  testChallenge: { __typename?: 'Result' } & Pick<Result, 'success' | 'errors'>;
};

export type createChallengeMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
}>;

export type createChallengeMutation = { __typename?: 'Mutation' } & {
  createChallenge: { __typename?: 'CreateChallengeResult' } & {
    result: { __typename?: 'Result' } & Pick<Result, 'success' | 'errors'>;
    challenge?: Maybe<{ __typename?: 'Challenge' } & Pick<Challenge, 'id'>>;
  };
};

export type editDraftChallengeMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solutionCode: Scalars['String'];
}>;

export type editDraftChallengeMutation = { __typename?: 'Mutation' } & {
  editDraftChallenge: { __typename?: 'CreateChallengeResult' } & {
    result: { __typename?: 'Result' } & Pick<Result, 'success' | 'errors'>;
    challenge?: Maybe<{ __typename?: 'Challenge' } & Pick<Challenge, 'id'>>;
  };
};

export type proposeChallengeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type proposeChallengeMutation = { __typename?: 'Mutation' } & {
  proposeChallenge: { __typename?: 'Result' } & Pick<
    Result,
    'success' | 'errors'
  >;
};

export type deleteOwnChallengeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type deleteOwnChallengeMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteOwnChallenge'
>;

export type publishChallengeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type publishChallengeMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'publishChallenge'
>;

export type rejectChallengeMutationVariables = Exact<{
  id: Scalars['ID'];
  reason: Scalars['String'];
}>;

export type rejectChallengeMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'rejectChallenge'
>;

export type testSolutionMutationVariables = Exact<{
  challenge: Scalars['ID'];
  solutionCode: Scalars['String'];
}>;

export type testSolutionMutation = { __typename?: 'Mutation' } & {
  testSolution: { __typename?: 'Result' } & Pick<Result, 'success' | 'errors'>;
};

export type createSolutionMutationVariables = Exact<{
  challenge: Scalars['ID'];
  solutionCode: Scalars['String'];
}>;

export type createSolutionMutation = { __typename?: 'Mutation' } & {
  createSolution: { __typename?: 'CreateSolutionResult' } & {
    result: { __typename?: 'Result' } & Pick<Result, 'success' | 'errors'>;
    solution?: Maybe<{ __typename?: 'Solution' } & Pick<Solution, 'size'>>;
  };
};

export type upvoteMutationVariables = Exact<{
  challenge: Scalars['ID'];
}>;

export type upvoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'upvote'
>;

export type downvoteMutationVariables = Exact<{
  challenge: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
}>;

export type downvoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'downvote'
>;

export type getChallengesQueryVariables = Exact<{ [key: string]: never }>;

export type getChallengesQuery = { __typename?: 'Query' } & {
  getChallenges: Array<
    { __typename?: 'Challenge' } & Pick<
      Challenge,
      'id' | 'title' | 'published' | 'tags'
    > & { author: { __typename?: 'User' } & Pick<User, 'name'> }
  >;
};

export type getProposedChallengesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type getProposedChallengesQuery = { __typename?: 'Query' } & {
  getProposedChallenges: Array<
    { __typename?: 'Challenge' } & Pick<
      Challenge,
      'id' | 'title' | 'updated' | 'tags' | 'upvotes' | 'downvotes'
    > & { author: { __typename?: 'User' } & Pick<User, 'name'> }
  >;
};

export type getChallengeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getChallengeQuery = { __typename?: 'Query' } & {
  getChallenge?: Maybe<
    { __typename?: 'Challenge' } & Pick<
      Challenge,
      | 'id'
      | 'title'
      | 'published'
      | 'status'
      | 'tags'
      | 'description'
      | 'setupCode'
      | 'testCode'
    > & {
        author: { __typename?: 'User' } & Pick<
          User,
          'id' | 'githubId' | 'name'
        >;
        solutions?: Maybe<
          Array<
            { __typename?: 'Solution' } & Pick<
              Solution,
              'timestamp' | 'size'
            > & { author: { __typename?: 'User' } & Pick<User, 'name'> }
          >
        >;
      }
  >;
};

export type getOwnUserQueryVariables = Exact<{ [key: string]: never }>;

export type getOwnUserQuery = { __typename?: 'Query' } & {
  getOwnUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'githubId' | 'name'>
  >;
};

export type getUserProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getUserProfileQuery = { __typename?: 'Query' } & {
  getUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'githubId' | 'name'> & {
        challenges: Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'title' | 'published'>
        >;
        solutions: Array<
          { __typename?: 'Solution' } & Pick<Solution, 'size' | 'timestamp'> & {
              challenge: { __typename?: 'Challenge' } & Pick<
                Challenge,
                'title'
              >;
            }
        >;
      }
  >;
};

export type getVotesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type getVotesQuery = { __typename?: 'Query' } & {
  getVotes: Array<
    { __typename?: 'Vote' } & Pick<Vote, 'value' | 'reason'> & {
        user: { __typename?: 'User' } & Pick<User, 'id' | 'githubId' | 'name'>;
      }
  >;
};

export const testChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'testChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'setupCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'testCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'solutionCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'testChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'setupCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'setupCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'testCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'testCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'solutionCode' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  testChallengeMutation,
  testChallengeMutationVariables
>;
export const createChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'description' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tags' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'setupCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'testCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'solutionCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'description' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tags' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tags' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'setupCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'setupCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'testCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'testCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'solutionCode' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'success' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'errors' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'challenge' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  createChallengeMutation,
  createChallengeMutationVariables
>;
export const editDraftChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editDraftChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'description' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tags' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'setupCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'testCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'solutionCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editDraftChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'description' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tags' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tags' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'setupCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'setupCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'testCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'testCode' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'solutionCode' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'success' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'errors' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'challenge' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  editDraftChallengeMutation,
  editDraftChallengeMutationVariables
>;
export const proposeChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'proposeChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposeChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  proposeChallengeMutation,
  proposeChallengeMutationVariables
>;
export const deleteOwnChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteOwnChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteOwnChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  deleteOwnChallengeMutation,
  deleteOwnChallengeMutationVariables
>;
export const publishChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'publishChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  publishChallengeMutation,
  publishChallengeMutationVariables
>;
export const rejectChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'rejectChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reason' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rejectChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reason' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  rejectChallengeMutation,
  rejectChallengeMutationVariables
>;
export const testSolutionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'testSolution' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'challenge' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'solutionCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'testSolution' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'challenge' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'challenge' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'solutionCode' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  testSolutionMutation,
  testSolutionMutationVariables
>;
export const createSolutionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createSolution' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'challenge' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'solutionCode' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createSolution' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'challenge' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'challenge' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionCode' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'solutionCode' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'success' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'errors' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'solution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  createSolutionMutation,
  createSolutionMutationVariables
>;
export const upvoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'upvote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'challenge' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'upvote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'challenge' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'challenge' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<upvoteMutation, upvoteMutationVariables>;
export const downvoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'downvote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'challenge' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reason' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'downvote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'challenge' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'challenge' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reason' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<downvoteMutation, downvoteMutationVariables>;
export const getChallengesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getChallenges' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getChallenges' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'published' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'author' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<getChallengesQuery, getChallengesQueryVariables>;
export const getProposedChallengesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getProposedChallenges' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProposedChallenges' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'author' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'upvotes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'downvotes' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  getProposedChallengesQuery,
  getProposedChallengesQueryVariables
>;
export const getChallengeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getChallenge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getChallenge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'published' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'author' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'githubId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'setupCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'testCode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'solutions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<getChallengeQuery, getChallengeQueryVariables>;
export const getOwnUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getOwnUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getOwnUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'githubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<getOwnUserQuery, getOwnUserQueryVariables>;
export const getUserProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'githubId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'challenges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'published' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'solutions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'challenge' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<getUserProfileQuery, getUserProfileQueryVariables>;
export const getVotesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getVotes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getVotes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'githubId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<getVotesQuery, getVotesQueryVariables>;
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
