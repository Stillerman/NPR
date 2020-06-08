const { AutoComplete } = require("enquirer");
import npm from 'npm'
import fs from "fs";


try {
  let packageJSON = JSON.parse(
    fs.readFileSync(process.cwd() + "/package.json").toString()
  );
  const scripts = Object.keys(packageJSON.scripts);

  const prompt = new AutoComplete({
    name: "script",
    message: "Pick a script",
    limit: 10,
    initial: 0,
    choices: scripts,
  });

  prompt
    .run()
    .then((answer) => {
      console.log("Running script:", answer)
      npm.load(() => npm.run(answer));
    })
    .catch(console.error);
} catch (err) {
  if (err.code === "ENOENT") {
    console.log("No package.json found");
  } else {
    throw err;
  }
}