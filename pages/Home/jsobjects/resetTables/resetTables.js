export default {
  resetTables: () => {
    storeValue("deliverables", []);
    storeValue("groupTests", []);
    storeValue("nre", []);
  }
};