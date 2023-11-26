var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;

window.onload = () => {
  document.querySelector("#user_input").select();
  loadSavedNotes();
};

document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#user_input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const text = document.querySelector("#user_input").value;
    if (text.trim() !== "") {
      createStickyNoteAndSave(text);
      document.querySelector("#user_input").value = "";
      document.querySelector("#modal").style.display = "none";
    }
  }
});

createStickyNote = (text) => {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;

  details.appendChild(noteText);
  note.appendChild(details);

  if (index > random_colors.length - 1)
    index = 0;

  note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);

  note.addEventListener("dblclick", () => {
    note.remove();
    saveNotesToLocalStorage();
  });

  document.querySelector("#all_notes").appendChild(note);
}

createStickyNoteAndSave = (text) => {
  createStickyNote(text);
  saveNoteToLocalStorage(text);
};

saveNoteToLocalStorage = (text) => {
  const notes = getStoredNotes();
  notes.push(text);
  saveToLocalStorage(notes);
};

getStoredNotes = () => {
  const notes = localStorage.getItem("stickyNotes");
  return notes ? JSON.parse(notes) : [];
};

saveToLocalStorage = (notes) => {
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
};

loadSavedNotes = () => {
  const savedNotes = localStorage.getItem("stickyNotes");
  if (savedNotes) {
    const notes = JSON.parse(savedNotes);
    notes.forEach((text) => createStickyNote(text));
  }
};
