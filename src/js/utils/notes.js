import { v4 as uuidv4 } from "uuid";
import {
  notes,
  addNoteItem,
  removeNoteItem,
  updateNoteItem,
  getNoteItemById,
} from "./state";
console.log(notes);

const renderItem = (item) => {
  const noteHTML = `<tr data-key=${item.id}>
        <th scope="row">${item.name}</th>
        <td>${item.created}</td>
        <td>${item.category}</td>
        <td>${item.content}</td>
        <td>${item.dates}</td>
        <td>
            <button class="btn" data-action="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-trash-fill pointerNone" viewBox="0 0 16 16">
                    <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
            </button>
            <button class="btn" data-action="archive">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-archive-fill pointerNone"  viewBox="0 0 16 16">
                    <path
                        d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                </svg>
            </button>
            <button class="btn" data-action="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil-fill pointerNone" viewBox="0 0 16 16">
                    <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
            </button>
        </td>
    </tr>`;

  //check if note already exist
  const note = document.querySelector(`[data-key="${item.id}"]`);
  console.log(note);

  if (note) {
    note.innerHTML = noteHTML;
  } else {
    let notes;
    if (!item.isArchive) {
      notes = document.getElementById("#notes");
    } else {
      notes = document.getElementById("#archivedNotes");
    }
    notes.insertAdjacentHTML("beforeend", noteHTML);
  }
};

const createNote = (formData) => {
  const newNote = {
    id: uuidv4(),
    name: formData.get("noteName"),
    created: new Date().toDateString(),
    category: formData.get("noteCategory"),
    content: formData.get("noteContent"),
    isArchive: false,
    dates: [],
  };

  addNoteItem(newNote);
  console.log(notes);
  renderItem(newNote);
};
const removeNoteMarkup = (event) => {
  const parentNode = event.target.closest("tr");
  console.log(parentNode);
  parentNode.remove();
  return parentNode;
};
const removeNote = (event) => {
  const parentNode = removeNoteMarkup(event);
  console.log(parentNode);
  const noteId = parentNode.dataset.key;
  removeNoteItem(noteId);
  return parentNode;
};
const updateNote = (formData) => {
  const id = formData.get("id");
  console.log(notes);
  console.log(id);
  const updatedNoteContent = formData.get("updateNoteContent");
  const updatedNoteName = formData.get("updateNoteName");
  const updatedNoteCategory = formData.get("updateNoteCategory");

  const updatedNote = {
    name: updatedNoteName,
    category: updatedNoteCategory,
    content: updatedNoteContent,
  };
  console.log("BeforeUpdate", notes);
  updateNoteItem(id, updatedNote);

  console.log("AfterUpdate", notes);
  const note = notes.find((note) => note.id === id);
  console.log(note);
  renderItem(note);
};

const onOpenUpdateForm = (event) => {
  const parentNode = event.target.closest("tr");
  const noteId = parentNode.dataset.key;
  const noteToUpdate = notes.find((note) => note.id === noteId);

  //set updateForm values
  const noteToUpdateId = document.getElementById("noteId");
  const noteName = document.getElementById("updateNoteName");
  const noteContent = document.getElementById("updateNoteContent");
  const noteCategory = document.getElementById("updateNoteCategory");
  noteToUpdateId.value = noteToUpdate.id;
  noteName.value = noteToUpdate.name;
  noteContent.value = noteToUpdate.content;
  noteCategory.value = noteToUpdate.category;
};
const onCloseUpdateForm = () => {
  //set updateForm values
  const updateNoteName = document.getElementById("updateNoteName");
  const updateNoteContent = document.getElementById("updateNoteContent");
  const updateNoteCategory = document.getElementById("updateNoteCategory");
  updateNoteName.value = "";
  updateNoteContent.value = "";
  updateNoteCategory.value = "";
};
const toggleArchiveNote = (event) => {
  const parentNode = event.target.closest("tr");
  const noteId = parentNode.dataset.key;
  const noteToUpdate = getNoteItemById(noteId);
  console.log("Before update", noteToUpdate);
  updateNoteItem(noteId, { isArchive: !noteToUpdate.isArchive });
  console.log("After update", noteToUpdate);
  removeNoteMarkup(event);
  const noteToRender = getNoteItemById(noteId);
  renderItem(noteToRender);
};

export default {
  removeNote,
  createNote,
  updateNote,
  toggleArchiveNote,
  onOpenUpdateForm,
  onCloseUpdateForm,
};
