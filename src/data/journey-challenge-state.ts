/** Pure quiz cursor rules: checking an answer never accidentally freezes the following question.
 * The saved answer IDs are authoritative; feedback belongs to ONE question only.
 */
export function activeQuestionIndex(ids:readonly string[],done:ReadonlySet<string>,cursor:number,
 pendingCorrectId?:string):number{
 if(cursor>=0&&cursor<ids.length&&pendingCorrectId===ids[cursor])return cursor;
 if(cursor>=0&&cursor<ids.length&&!done.has(ids[cursor]))return cursor;
 return ids.findIndex(id=>!done.has(id));
}
export function nextUnansweredIndex(ids:readonly string[],done:ReadonlySet<string>):number{
 return ids.findIndex(id=>!done.has(id));
}
