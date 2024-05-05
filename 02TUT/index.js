// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    // "unlink" deletes a file, available with fs as well
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promieWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promieWrite.txt"),
      "\n\n Nice to meet you."
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promieWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promsieComplete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// The 'utf8' attribute allows for the Buffer data to be converted to text
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

//  "writeFile" creates a file and writes what you input
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you.",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     //  "appendFile" updates the specified file and can also create a file
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\n Pleasure to meet you.",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");
//         //  "rename" does just that renames the file
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename complete");
//           }
//         );
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
