// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

console.log('Imported Header', header);

export default class {
  constructor() {
    const localData = localStorage.getItem('content');
    console.log('Locally Stored Content', localData);

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
    
      let contentToDisplay;
    
      if (data && data.text) {
        // Data is present in IndexedDB
        contentToDisplay = data.text;
      } else {
        // No data in IndexedDB, check localStorage
        const localData = localStorage.getItem('content');
        if (localData) {
          contentToDisplay = localData;
        } else {
          // No data in localStorage either, use the header
          contentToDisplay = header;
        }
      }
    
      this.editor.setValue(contentToDisplay);
    }).catch(error => {
      console.error("Error loading data from IndexedDB:", error);
      // In case of an error, fallback to localStorage or header
      const localData = localStorage.getItem('content');
      this.editor.setValue(localData || header);
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      const currentContent = this.editor.getValue();
      putDb(currentContent);
    });
  }
}
