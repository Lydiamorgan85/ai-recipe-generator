import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
const backend = defineBackend({ auth, data });
const bedrockDataSource = backend.data.resources.graphqlApi.ad