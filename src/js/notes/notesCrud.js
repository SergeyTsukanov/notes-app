import { v4 as uuidv4 } from "uuid";
import {
  notes,
  addNoteItem,
  removeNoteItem,
  updateNoteItem,
  getNoteItemById,
} from "../state";
import parseDates from "../utils/parseDates";
import { renderItem } from "../render";

const createNote = (formData) => {
  const newNote = {
    id: uuidv4(),
    name: formData.get("noteName"),
    created: new Date().toDateString(),
    category: formData.get("noteCategory"),
    content: formData.get("noteContent"),
    isArchive: false,
    dates: parseDates(formData.get("noteContent")),
  };

  addNoteItem(newNote);
  renderItem(newNote);
};

const removeNoteMarkup = (event) => {
  const parentNode = event.target.closest("tr");
  parentNode.remove();
  return parentNode;
};
const removeNote = (event) => {
  const parentNode = removeNoteMarkup(event);
  const noteId = parentNode.dataset.key;
  removeNoteItem(noteId);
  return parentNode;
};
const updateNote = (formData) => {
  const id = formData.get("id");
  const updatedNoteContent = formData.get("updateNoteContent");
  const updatedNoteName = formData.get("updateNoteName");
  const updatedNoteCategory = formData.get("updateNoteCategory");

  const updatedNote = {
    name: updatedNoteName,
    category: updatedNoteCategory,
    content: updatedNoteContent,
    dates: parseDates(updatedNoteContent),
  };

  updateNoteItem(id, updatedNote);
  const note = notes.find((note) => note.id === id);
  renderItem(note);
};

const toggleArchiveNote = (event) => {
  const parentNode = event.target.closest("tr");
  const noteId = parentNode.dataset.key;
  const noteToUpdate = getNoteItemById(noteId);
  updateNoteItem(noteId, { isArchive: !noteToUpdate.isArchive });
  removeNoteMarkup(event);
  const noteToRender = getNoteItemById(noteId);
  renderItem(noteToRender);
};

export {
  removeNote,
  createNote,
  updateNote,
  toggleArchiveNote,
};
