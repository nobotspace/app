import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { appsyncApi } from 'api/appsync/api.base';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDateTime: Date;
  AWSEmail: string;
  AWSIPAddress: any;
  AWSJSON: string;
  AWSPhone: any;
  AWSTime: any;
  AWSTimestamp: string;
  AWSURL: string;
  BigInt: any;
  Double: any;
};

export enum ModelAttributeTypes {
  Null = '_null',
  Binary = 'binary',
  BinarySet = 'binarySet',
  Bool = 'bool',
  List = 'list',
  Map = 'map',
  Number = 'number',
  NumberSet = 'numberSet',
  String = 'string',
  StringSet = 'stringSet'
}

export type ModelIntInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
};

export type ModelNobotConnection = {
  __typename?: 'ModelNobotConnection';
  items: Array<UserNobot>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelNobotFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelNobotFilterInput>>>;
  not?: InputMaybe<ModelNobotFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelNobotFilterInput>>>;
  projectId?: InputMaybe<ModelStringInput>;
  studyId?: InputMaybe<ModelStringInput>;
  workspaceId?: InputMaybe<ModelStringInput>;
};

export type ModelSizeInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
};

export type ModelStringInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<ModelSizeInput>;
};

export type NobotAsset = {
  __typename?: 'NobotAsset';
  icon: S3Object;
  model: S3Object;
};

export type NobotColors = {
  __typename?: 'NobotColors';
  accent: Array<Scalars['Int']>;
  accentShades: Array<Array<Scalars['Int']>>;
  base: Array<Scalars['Int']>;
  main: Array<Scalars['Int']>;
  mainShades: Array<Array<Scalars['Int']>>;
};

export type NobotProportions = {
  __typename?: 'NobotProportions';
  armLength: Scalars['Float'];
  body: Array<Scalars['Float']>;
  face: Array<Scalars['Float']>;
  head: Array<Scalars['Float']>;
  headScale: Scalars['Float'];
  legLength: Scalars['Float'];
  mouth: Array<Scalars['Float']>;
  neckLength: Scalars['Float'];
  nose: Array<Scalars['Float']>;
  scale: Scalars['Float'];
};

export type NobotResources = {
  __typename?: 'NobotResources';
  body: NobotAsset;
  head: NobotAsset;
};

export type Query = {
  __typename?: 'Query';
  getNobot: UserNobot;
  getUser: User;
  listNobots: ModelNobotConnection;
};


export type QueryGetNobotArgs = {
  id: Scalars['String'];
  user_id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryListNobotsArgs = {
  filter?: InputMaybe<ModelNobotFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};

export type S3Object = {
  __typename?: 'S3Object';
  bucket: Scalars['String'];
  key: Scalars['String'];
  region: Scalars['String'];
};

export type S3ObjectInput = {
  bucket: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  localUri?: InputMaybe<Scalars['String']>;
  mimeType?: InputMaybe<Scalars['String']>;
  region: Scalars['String'];
  visibility?: InputMaybe<Visibility>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['AWSDateTime'];
  id: Scalars['String'];
  owner: Scalars['String'];
  updated_at: Scalars['AWSDateTime'];
  username: Scalars['String'];
};

export type UserNobot = {
  __typename?: 'UserNobot';
  colors: NobotColors;
  created_at: Scalars['AWSDateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  proportions: NobotProportions;
  resources?: Maybe<NobotResources>;
  updated_at: Scalars['AWSDateTime'];
  user_id: Scalars['String'];
};

export enum Visibility {
  Private = 'private',
  Public = 'public'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']>;
  AWSEmail: ResolverTypeWrapper<Scalars['AWSEmail']>;
  AWSIPAddress: ResolverTypeWrapper<Scalars['AWSIPAddress']>;
  AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']>;
  AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']>;
  AWSTime: ResolverTypeWrapper<Scalars['AWSTime']>;
  AWSTimestamp: ResolverTypeWrapper<Scalars['AWSTimestamp']>;
  AWSURL: ResolverTypeWrapper<Scalars['AWSURL']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Double: ResolverTypeWrapper<Scalars['Double']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ModelAttributeTypes: ModelAttributeTypes;
  ModelIntInput: ModelIntInput;
  ModelNobotConnection: ResolverTypeWrapper<ModelNobotConnection>;
  ModelNobotFilterInput: ModelNobotFilterInput;
  ModelSizeInput: ModelSizeInput;
  ModelStringInput: ModelStringInput;
  NobotAsset: ResolverTypeWrapper<NobotAsset>;
  NobotColors: ResolverTypeWrapper<NobotColors>;
  NobotProportions: ResolverTypeWrapper<NobotProportions>;
  NobotResources: ResolverTypeWrapper<NobotResources>;
  Query: ResolverTypeWrapper<{}>;
  S3Object: ResolverTypeWrapper<S3Object>;
  S3ObjectInput: S3ObjectInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserNobot: ResolverTypeWrapper<UserNobot>;
  Visibility: Visibility;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AWSDateTime: Scalars['AWSDateTime'];
  AWSEmail: Scalars['AWSEmail'];
  AWSIPAddress: Scalars['AWSIPAddress'];
  AWSJSON: Scalars['AWSJSON'];
  AWSPhone: Scalars['AWSPhone'];
  AWSTime: Scalars['AWSTime'];
  AWSTimestamp: Scalars['AWSTimestamp'];
  AWSURL: Scalars['AWSURL'];
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Double: Scalars['Double'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  ModelIntInput: ModelIntInput;
  ModelNobotConnection: ModelNobotConnection;
  ModelNobotFilterInput: ModelNobotFilterInput;
  ModelSizeInput: ModelSizeInput;
  ModelStringInput: ModelStringInput;
  NobotAsset: NobotAsset;
  NobotColors: NobotColors;
  NobotProportions: NobotProportions;
  NobotResources: NobotResources;
  Query: {};
  S3Object: S3Object;
  S3ObjectInput: S3ObjectInput;
  String: Scalars['String'];
  User: User;
  UserNobot: UserNobot;
};

export type Aws_Api_KeyDirectiveArgs = { };

export type Aws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Api_KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_AuthDirectiveArgs = {
  cognito_groups: Array<Scalars['String']>;
};

export type Aws_AuthDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_Cognito_User_PoolsDirectiveArgs = {
  cognito_groups?: Maybe<Array<Scalars['String']>>;
};

export type Aws_Cognito_User_PoolsDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Cognito_User_PoolsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_IamDirectiveArgs = { };

export type Aws_IamDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_IamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_OidcDirectiveArgs = { };

export type Aws_OidcDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_OidcDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_SubscribeDirectiveArgs = {
  mutations: Array<Scalars['String']>;
};

export type Aws_SubscribeDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_SubscribeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface AwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDateTime'], any> {
  name: 'AWSDateTime';
}

export interface AwsEmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSEmail'], any> {
  name: 'AWSEmail';
}

export interface AwsipAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSIPAddress'], any> {
  name: 'AWSIPAddress';
}

export interface AwsjsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSJSON'], any> {
  name: 'AWSJSON';
}

export interface AwsPhoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSPhone'], any> {
  name: 'AWSPhone';
}

export interface AwsTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTime'], any> {
  name: 'AWSTime';
}

export interface AwsTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTimestamp'], any> {
  name: 'AWSTimestamp';
}

export interface AwsurlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSURL'], any> {
  name: 'AWSURL';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DoubleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Double'], any> {
  name: 'Double';
}

export type ModelNobotConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModelNobotConnection'] = ResolversParentTypes['ModelNobotConnection']> = {
  items?: Resolver<Array<ResolversTypes['UserNobot']>, ParentType, ContextType>;
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NobotAssetResolvers<ContextType = any, ParentType extends ResolversParentTypes['NobotAsset'] = ResolversParentTypes['NobotAsset']> = {
  icon?: Resolver<ResolversTypes['S3Object'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['S3Object'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NobotColorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['NobotColors'] = ResolversParentTypes['NobotColors']> = {
  accent?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  accentShades?: Resolver<Array<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  base?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  main?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  mainShades?: Resolver<Array<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NobotProportionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['NobotProportions'] = ResolversParentTypes['NobotProportions']> = {
  armLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  body?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  face?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  head?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  headScale?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  legLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  mouth?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  neckLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  nose?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  scale?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NobotResourcesResolvers<ContextType = any, ParentType extends ResolversParentTypes['NobotResources'] = ResolversParentTypes['NobotResources']> = {
  body?: Resolver<ResolversTypes['NobotAsset'], ParentType, ContextType>;
  head?: Resolver<ResolversTypes['NobotAsset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getNobot?: Resolver<ResolversTypes['UserNobot'], ParentType, ContextType, RequireFields<QueryGetNobotArgs, 'id' | 'user_id'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  listNobots?: Resolver<ResolversTypes['ModelNobotConnection'], ParentType, ContextType, Partial<QueryListNobotsArgs>>;
};

export type S3ObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['S3Object'] = ResolversParentTypes['S3Object']> = {
  bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created_at?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNobotResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNobot'] = ResolversParentTypes['UserNobot']> = {
  colors?: Resolver<ResolversTypes['NobotColors'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proportions?: Resolver<ResolversTypes['NobotProportions'], ParentType, ContextType>;
  resources?: Resolver<Maybe<ResolversTypes['NobotResources']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AWSDateTime?: GraphQLScalarType;
  AWSEmail?: GraphQLScalarType;
  AWSIPAddress?: GraphQLScalarType;
  AWSJSON?: GraphQLScalarType;
  AWSPhone?: GraphQLScalarType;
  AWSTime?: GraphQLScalarType;
  AWSTimestamp?: GraphQLScalarType;
  AWSURL?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Double?: GraphQLScalarType;
  ModelNobotConnection?: ModelNobotConnectionResolvers<ContextType>;
  NobotAsset?: NobotAssetResolvers<ContextType>;
  NobotColors?: NobotColorsResolvers<ContextType>;
  NobotProportions?: NobotProportionsResolvers<ContextType>;
  NobotResources?: NobotResourcesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  S3Object?: S3ObjectResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserNobot?: UserNobotResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  aws_api_key?: Aws_Api_KeyDirectiveResolver<any, any, ContextType>;
  aws_auth?: Aws_AuthDirectiveResolver<any, any, ContextType>;
  aws_cognito_user_pools?: Aws_Cognito_User_PoolsDirectiveResolver<any, any, ContextType>;
  aws_iam?: Aws_IamDirectiveResolver<any, any, ContextType>;
  aws_oidc?: Aws_OidcDirectiveResolver<any, any, ContextType>;
  aws_subscribe?: Aws_SubscribeDirectiveResolver<any, any, ContextType>;
};

export type GetNobotQueryVariables = Exact<{
  id: Scalars['String'];
  user_id: Scalars['String'];
}>;


export type GetNobotQuery = { __typename?: 'Query', getNobot: { __typename?: 'UserNobot', id: string, user_id: string, name?: string | null, created_at: Date, updated_at: Date, owner: string, colors: { __typename?: 'NobotColors', base: Array<number>, accent: Array<number>, main: Array<number>, accentShades: Array<Array<number>>, mainShades: Array<Array<number>> }, resources?: { __typename?: 'NobotResources', head: { __typename?: 'NobotAsset', icon: { __typename?: 'S3Object', bucket: string, key: string } }, body: { __typename?: 'NobotAsset', model: { __typename?: 'S3Object', bucket: string, key: string } } } | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, username: string, created_at: Date, updated_at: Date } };

export type ListNobotsQueryVariables = Exact<{
  filter?: InputMaybe<ModelNobotFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
}>;


export type ListNobotsQuery = { __typename?: 'Query', listNobots: { __typename?: 'ModelNobotConnection', nextToken?: string | null, items: Array<{ __typename?: 'UserNobot', id: string, user_id: string, name?: string | null, created_at: Date, updated_at: Date, owner: string, colors: { __typename?: 'NobotColors', base: Array<number>, accent: Array<number>, main: Array<number>, accentShades: Array<Array<number>>, mainShades: Array<Array<number>> }, resources?: { __typename?: 'NobotResources', head: { __typename?: 'NobotAsset', icon: { __typename?: 'S3Object', bucket: string, key: string } }, body: { __typename?: 'NobotAsset', model: { __typename?: 'S3Object', bucket: string, key: string } } } | null }> } };


export const GetNobotDocument = `
    query GetNobot($id: String!, $user_id: String!) {
  getNobot(id: $id, user_id: $user_id) {
    id
    user_id
    name
    colors {
      base
      accent
      main
      accentShades
      mainShades
    }
    resources {
      head {
        icon {
          bucket
          key
        }
      }
      body {
        model {
          bucket
          key
        }
      }
    }
    created_at
    updated_at
    owner
  }
}
    `;
export const GetUserDocument = `
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    username
    created_at
    updated_at
  }
}
    `;
export const ListNobotsDocument = `
    query ListNobots($filter: ModelNobotFilterInput, $limit: Int, $nextToken: String) {
  listNobots(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user_id
      name
      colors {
        base
        accent
        main
        accentShades
        mainShades
      }
      resources {
        head {
          icon {
            bucket
            key
          }
        }
        body {
          model {
            bucket
            key
          }
        }
      }
      created_at
      updated_at
      owner
    }
    nextToken
  }
}
    `;

const injectedRtkApi = appsyncApi.injectEndpoints({
  endpoints: (build) => ({
    GetNobot: build.query<GetNobotQuery, GetNobotQueryVariables>({
      query: (variables) => ({ document: GetNobotDocument, variables })
    }),
    GetUser: build.query<GetUserQuery, GetUserQueryVariables>({
      query: (variables) => ({ document: GetUserDocument, variables })
    }),
    ListNobots: build.query<ListNobotsQuery, ListNobotsQueryVariables | void>({
      query: (variables) => ({ document: ListNobotsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetNobotQuery, useLazyGetNobotQuery, useGetUserQuery, useLazyGetUserQuery, useListNobotsQuery, useLazyListNobotsQuery } = injectedRtkApi;

