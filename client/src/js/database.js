import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const transaction = db.transaction('jate', 'readwrite');
    const noteStore = transaction.objectStore('notes');
    await noteStore.add(note);
    console.log('Note Added');
  } catch (error) {
    console.error('Error Adding Notes', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const transaction = db.transaction('notes', 'readonly');
    const noteStore = transaction.objectStore('notes');
    const allNotes = await noteStore.getAll();
    console.log('All Notes Retrieved');
    return allNotes;
  } catch (error) {
    console.error("Error Retrieving All Notes", error);
    return [];
  }
};

initdb();
