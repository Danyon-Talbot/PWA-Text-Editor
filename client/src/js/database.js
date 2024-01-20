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
  console.log('Actual putDb call - Content being saved/updated:', content);
  if (!content) {
    console.error('Error: Actual putDb call - content is undefined or null');
    return;
  }

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    const storedNotes = { id: 1, text: content }
    const result = await store.put(storedNotes);
    console.log('Actual putDb call - Save/update result:', result);
    await tx.done;
  } catch (error) {
    console.error('Error during actual putDb call:', error);
    // Log the full error object for more detailed information
    console.error(error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from the database');
    const db = await openDB('jate', 1); 
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.get(1); // Get only the entry with id 1
    console.log('Note Retrieved', result);
    return result;
  } catch (error) {
    console.error("Error Retrieving Note", error);
  }
};

initdb();
