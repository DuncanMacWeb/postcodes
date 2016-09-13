import bulkImport from './bulkImport';

(async function () {
  try {
    const {matches, mismatches} = await bulkImport();
  } catch(err) {
    console.error(err);
  }
})();
