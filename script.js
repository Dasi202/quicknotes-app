/* ============================================================
   STATE
   ============================================================ */
const notes = [];
const MAX_LENGTH = 200;


/* ============================================================
   DOM REFERENCES
   ============================================================ */
const form          = document.getElementById("note-form");
const noteInput     = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const errorMessage  = document.getElementById("error-message");
const notesList     = document.getElementById("notes-list");
const notesCount    = document.getElementById("notes-count");
const searchInput   = document.getElementById("search-input");

/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Returns a readable date & time string, e.g. "4 Oct 2026, 14:32".
 */
function formatDate(date) {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Maps a category name to its CSS class.
 */
function categoryClass(category) {
  return "category-" + category.toLowerCase();
}
/**
   * Updates the #notes-count paragraph with a grammatically
   * correct message.
   */
  function updateCount() {
    const total = notes.length;

    if (total === 0) {
      notesCount.textContent = "You have no notes yet.";
    } else if (total === 1) {
      notesCount.textContent = "You have 1 note.";
    } else {
      notesCount.textContent = `You have ${total} notes.`;
    }
  }

/* ============================================================
   RENDER
   ============================================================ */
function renderNotes() {
  // Clear the list
  notesList.innerHTML = "";

  // Update count
  const total = notes.length;
  notesCount.textContent = total === 1 ? "1 note" : `${total} notes`;

  // Empty state (optional but nice)
  if (total === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No notes yet. Add your first one above!";
    notesList.appendChild(empty);
    return;
  }

  // Build a card for each note
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = categoryClass(note.category);
    li.dataset.id = note.id;

    // --- Text ---
    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    // --- Meta (category label + date) ---
    const meta = document.createElement("div");
    meta.className = "note-meta";

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "note-category";
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("span");
    dateLabel.className = "note-date";
    dateLabel.textContent = note.createdAt;

    meta.append(categoryLabel, dateLabel);
    content.append(text, meta);

    // --- Delete button ---
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete note: ${note.text}`);
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    // --- Wrap text + meta in a left column ---
    const content = document.createElement("div");
    content.className = "note-content";
    content.append(text, meta);

    li.append(content, deleteBtn);
    notesList.appendChild(li);
  });
}

/* ============================================================
   ADD NOTE
   ============================================================ */
function addNote(text, category) {
  const note = {
    id: Date.now().toString(),        // simple unique id
    text: text.trim(),
    category: category,
    createdAt: formatDate(new Date()),
  };

  notes.push(note);
  renderNotes();
}

/* ============================================================
   DELETE NOTE (bonus — needed for the Delete button)
   ============================================================ */
function deleteNote(id) {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    renderNotes();
  }
}

/* ============================================================
   FORM SUBMIT HANDLER
   ============================================================ */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  /* -- empty or whitespace-only--*/
  if (text.length === 0) {
    errorMessage.textContent = "Please enter a note before adding.";
    noteInput.focus();
    return;
  } 

  /* -- exceeds max length -- */
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = `Note cannot exceed ${MAX_LENGTH} characters.`;
    noteInput.focus();
    return;
  }
  // Basic validation
  if (!text) {
    errorMessage.textContent = "Please enter a note before adding.";
    noteInput.focus();
    return;
  }

  // Clear any previous error
  errorMessage.textContent = "";

  // Create the note
  addNote(text, category);

  // Reset the form
  noteInput.value = "";
  categorySelect.value = "Personal";
  noteInput.focus();
});

/* ============================================================
   INITIAL RENDER
   ============================================================ */
renderNotes();