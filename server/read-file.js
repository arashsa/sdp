import { Parser } from '/imports/dependency-parser/parser'

function createGraph(path) {
  let syncAssets = Meteor.wrapAsync(Assets.getText);
  let text = syncAssets(path);
  let graph = new Parser({ text: text });
  return graph;
}

let test = createGraph('sdp/2015/test_gold.sdp');
// let gold = createGraph('sdp/2015/test/en.id.dm.sdp');
// let inHouseDM1 = createGraph('sdp/2015/submissions/In-House/en.id.open.dm.1.sdp');
// inHouseDM1.compareArg(gold, 'In-House dm1', '_or_c');
