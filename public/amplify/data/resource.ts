import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
const schema = a.schema({
BedrockResponse: a.customType({
body: a.string(),
error: a.string(),
}),
askBedrock: a
.query()
.arguments({ ingredients: a.string().array() })
.returns(a.ref("BedrockRespon