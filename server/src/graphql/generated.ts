import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import type { MercuriusContext } from 'mercurius';
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
  created: Scalars['Date'];
  published?: Maybe<Scalars['Date']>;
  title: Scalars['String'];
  description: Scalars['String'];
  author: User;
  authorId: Scalars['ID'];
  status: ChallengeStatus;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
  solutions: Array<Maybe<Solution>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new code golf Challenge */
  createChallenge: CreateChallengeResult;
  /** Executes a dry run of arbitrary code golf Challenge code */
  testChallenge: Result;
  /** Submits a solution to a published Challenege */
  createSolution: CreateSolutionResult;
  /** Executes a dry run of a solution */
  testSolution: Result;
  /** Upvote a proposed Challenge */
  upvote: Scalars['Boolean'];
  /** Downvote a proposed Challenge with reason */
  downvote: Scalars['Boolean'];
};

export type MutationcreateChallengeArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  referenceSolution: Scalars['String'];
};

export type MutationtestChallengeArgs = {
  setupCode: Scalars['String'];
  testCode: Scalars['String'];
  solution: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getOwnUser?: Maybe<User>;
  getChallenge?: Maybe<Challenge>;
  getChallenges: Array<Maybe<Challenge>>;
  getProposedChallenges: Array<Maybe<Challenge>>;
};

export type QuerygetUserArgs = {
  id: Scalars['ID'];
};

export type QuerygetChallengeArgs = {
  id: Scalars['ID'];
};

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
  challenges?: Maybe<Array<Maybe<Challenge>>>;
  solutions?: Maybe<Array<Maybe<Solution>>>;
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
  ChallengeStatus: ChallengeStatus;
  Challenge: ResolverTypeWrapper<Challenge>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateChallengeResult: ResolverTypeWrapper<CreateChallengeResult>;
  Role: Role;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Result: ResolverTypeWrapper<Result>;
  CreateSolutionResult: ResolverTypeWrapper<CreateSolutionResult>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Solution: ResolverTypeWrapper<Solution>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Challenge: Challenge;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  CreateChallengeResult: CreateChallengeResult;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  Result: Result;
  CreateSolutionResult: CreateSolutionResult;
  Date: Scalars['Date'];
  Solution: Solution;
  User: User;
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

export type ChallengeResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChallengeStatus'], ParentType, ContextType>;
  setupCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<
    Array<Maybe<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  solutions?: Resolver<
    Array<Maybe<ResolversTypes['Solution']>>,
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

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createChallenge?: Resolver<
    ResolversTypes['CreateChallengeResult'],
    ParentType,
    ContextType,
    RequireFields<
      MutationcreateChallengeArgs,
      'title' | 'description' | 'setupCode' | 'testCode' | 'referenceSolution'
    >
  >;
  testChallenge?: Resolver<
    ResolversTypes['Result'],
    ParentType,
    ContextType,
    RequireFields<
      MutationtestChallengeArgs,
      'setupCode' | 'testCode' | 'solution'
    >
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

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserArgs, 'id'>
  >;
  getOwnUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getChallenge?: Resolver<
    Maybe<ResolversTypes['Challenge']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetChallengeArgs, 'id'>
  >;
  getChallenges?: Resolver<
    Array<Maybe<ResolversTypes['Challenge']>>,
    ParentType,
    ContextType
  >;
  getProposedChallenges?: Resolver<
    Array<Maybe<ResolversTypes['Challenge']>>,
    ParentType,
    ContextType
  >;
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

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

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
    Maybe<Array<Maybe<ResolversTypes['Challenge']>>>,
    ParentType,
    ContextType
  >;
  solutions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Solution']>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Challenge?: ChallengeResolvers<ContextType>;
  CreateChallengeResult?: CreateChallengeResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  CreateSolutionResult?: CreateSolutionResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Solution?: SolutionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
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
    created?: LoaderResolver<Scalars['Date'], Challenge, {}, TContext>;
    published?: LoaderResolver<Maybe<Scalars['Date']>, Challenge, {}, TContext>;
    title?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    description?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    author?: LoaderResolver<User, Challenge, {}, TContext>;
    authorId?: LoaderResolver<Scalars['ID'], Challenge, {}, TContext>;
    status?: LoaderResolver<ChallengeStatus, Challenge, {}, TContext>;
    setupCode?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    testCode?: LoaderResolver<Scalars['String'], Challenge, {}, TContext>;
    tags?: LoaderResolver<
      Array<Maybe<Scalars['String']>>,
      Challenge,
      {},
      TContext
    >;
    solutions?: LoaderResolver<Array<Maybe<Solution>>, Challenge, {}, TContext>;
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
    challenges?: LoaderResolver<
      Maybe<Array<Maybe<Challenge>>>,
      User,
      {},
      TContext
    >;
    solutions?: LoaderResolver<
      Maybe<Array<Maybe<Solution>>>,
      User,
      {},
      TContext
    >;
  };
}
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
