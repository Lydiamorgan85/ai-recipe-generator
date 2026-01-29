import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
const client = generateClient();
function App() {
const [ingredients, setIngredients] = useState("");
const [recipe, setRecipe] = useState("");
c