import { HistoryItem } from './HistoryList';

let mongoId = localStorage.getItem('mongo_id') || '';

// of course in real life I should not store apiKey on client, and use cross-env for example
const getMongoLabUrl = () => `https://api.mongolab.com/api/1/databases/sonnenhaft2/collections/accedo-movies_test-task3/${mongoId}?apiKey=PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe`;

let canUseNodeBackend = true;
// docker case - extra server
const getNodeUrl = () => `/api/memory/${mongoId}`;

export async function saveToMemory(memory: HistoryItem[]): Promise<void> {
  // remember in Mongo db here
  localStorage.setItem('memory', JSON.stringify(memory));

  const params = {
    method: mongoId ? 'PUT' : 'POST',
    // mode: 'cors', // no-cors, cors, *same-origin
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memory: memory })
  };

  let fetchSavePromise;

  try {
    fetchSavePromise = await fetch(getNodeUrl(), params);
  } catch(e) {
    canUseNodeBackend = false;
    fetchSavePromise = await fetch(getMongoLabUrl(), params);
  }

  if (!mongoId) {
    const response = await fetchSavePromise.json();
    mongoId = canUseNodeBackend ? response._id : response._id.$oid;
    localStorage.setItem('mongo_id', mongoId);
  }
}

export async function readFromMemory(): Promise<HistoryItem[]> {
  try {
    if (mongoId) {
      try {
        return (await (await fetch(getNodeUrl())).json()).memory;
      } catch (e) {
        canUseNodeBackend = false;
        return (await (await fetch(getMongoLabUrl())).json()).memory;
      }
    } else {
      throw Error('no id found, potentially MongoLab not reachable in this network');
    }
  } catch (e) {
    return JSON.parse(localStorage.getItem('memory') || '[]');
  }
}
