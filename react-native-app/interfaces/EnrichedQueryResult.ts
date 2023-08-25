import {QueryResult} from "@apollo/client";

export type EnrichedQueryResult<MainObject, FieldName extends string, Attributes extends keyof MainObject> = QueryResult<{[K in FieldName]:Pick<MainObject, Attributes>}>
export type EnrichedQueryResults<MainObject, FieldName extends string, Attributes extends keyof MainObject> = QueryResult<{[K in FieldName]:[Pick<MainObject, Attributes>]}>
