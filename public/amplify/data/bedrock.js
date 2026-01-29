export function request(ctx) {
const { ingredients = [] } = ctx.args;
const prompt = `Suggest a recipe idea using these ingredients: ${ingredient
s.join(", ")}.`;
return {
resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
method: "POST",
params: {
heade