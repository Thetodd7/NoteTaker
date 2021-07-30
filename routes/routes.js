const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      let notes = JSON.parse(data);
      let newNote = req.body;
      notes.push(newNote);
      updateDb(notes);
      console.log("Added new note: " + newNote.title);
      res.json({ ok: true });
    });
  });

  app.get("/api/notes/:id", function (req, res) {
    res.json(notes[req.params.id]);
  });
  // READ THE FILE AND GET IT BACK
  // MATCHES SPLICE IT OUT
  app.delete("/api/notes/:id", function (req, res) {
    notes.splice(req.params.id, 1);
    updateDb();
    console.log("Deleted note with id " + req.params.id);
  });

  function updateDb(notes) {
    fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
      if (err) throw err;
      return true;
    });
  }
};

