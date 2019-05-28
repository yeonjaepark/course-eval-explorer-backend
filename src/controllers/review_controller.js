/* eslint-disable import/prefer-default-export */
/* eslint-disable array-callback-return */
const DiscoveryV1 = require('ibm-watson/discovery/v1');

const TERMS_MAP = {
  '19W': 'Winter Term 2019',
  '18F': 'Fall Term 2018',
  '18S': 'Spring Term 2018',
  '18W': 'Winter Term 2018',
  '17F': 'Fall Term 2017',
  '17S': 'Spring Term 2017',
  '17W': 'Winter Term 2017',
  '16F': 'Fall Term 2016',
  '16S': 'Spring Term 2016',
  '16W': 'Winter Term 2016',
  '15F': 'Fall Term 2015',
  '15S': 'Spring Term 2015',
  '15W': 'Winter Term 2015',
};

export const getReviews = (req, res) => {
  const { filters } = req.body;
  console.log(filters);
  let query = [];

  if (filters.term && filters.term !== 'All') {
    query.push(`term::"${TERMS_MAP[filters.term]}"`);
  }
  if (filters.professor && filters.term !== 'All') {
    query.push(`professor::"${filters.professor}"`);
  }
  if (filters.question && filters.question !== 'All') {
    query.push(`questionNum::"${filters.question}"`);
  }
  query = query.join();
  console.log(query);
  const discovery = new DiscoveryV1({
    version: '2018-12-03',
    iam_apikey: 'InDDJQ4BR5ubLys7EHsy0t-E0gT4bxQg6bn1uVSY128V',
    url: 'https://gateway.watsonplatform.net/discovery/api',
  });

  const queryParams = {
    environment_id: '5fcc1253-9783-474a-8455-616842787de7',
    collection_id: 'f4d78f0b-5c97-4b93-b508-dd232ba2fb98',
    query,
    count: 1000,
  };

  discovery.query(queryParams)
    .then((queryResponse) => {
      console.log(`Response: found ${(queryResponse.results || []).length} matching results`);
      // const documents = queryResponse.results;
      // // get unique attributes
      // const questionNums = new Set(documents.map((document) => { return (document.questionNum); }));
      // const professors = new Set(documents.map((document) => { return (document.professor); }));
      // const terms = new Set(documents.map((document) => { return (document.term); }));
      // console.log(professors);
      // console.log(terms);


      res.json({ results: queryResponse.results });
      // console.log(JSON.stringify(documents, null, 2));
    })
    .catch((err) => {
      console.log('error:', err);
      res.status(500).json(err);
    });
};


// https://dev.to/vuevixens/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep removing duplicates
