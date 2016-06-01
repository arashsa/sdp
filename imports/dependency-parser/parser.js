var Graph = require('graph.js/dist/graph.full.js')


class Parser {

  /**
   * [constructor description]
   * @param  {[type]} option [description]
   * @return {[type]}        [description]
   */
  constructor(option) {
    let lines = option.text.replace(/\n/g, ' ').split(' ');
    this.currentGraph = new Graph();
    this.computedGraphs = [];
    this.currentPredicates = [];
    this.fromPredicateToNode = [];
    this.args = new Set();
    this.parseFile(lines);

    // scores
    // labeled
    this.LP = [0, 0];
    this.LR = [0, 0];
    this.LF = [0, 0];
    this.LM = [0, 0];

    //unlabeled
    this.UP = [0, 0];
    this.UR = [0, 0];
    this.UF = [0, 0];
    this.UM = [0, 0];
  }


  /**
   * Reads the CoNLL data from an array of lines.
   * @return {undefined}
   */
  parseFile(lines) {
    // map each line to parseSentence
    lines.map((line) => {
      let lineAsArray = line.split('\t');

      if (lineAsArray.length > 6) {
        this.parseSentence(lineAsArray);
      } else {
        if (this.currentGraph.vertexCount() > 0) {
          this.addEdges();
          this.computedGraphs.push(this.currentGraph);
          this.currentGraph = new Graph();
          this.currentPredicates = [];
        }
      }
    });
  }


  /**
   * Parse each CoNLL line and end up with a graph
   * @return {undefined}
   */
  parseSentence(lineAsArray) {
    let _id = lineAsArray[0],
      _form = lineAsArray[1],
      _lemma = lineAsArray[2],
      _pos = lineAsArray[3],
      _top = lineAsArray[4],
      _pred = lineAsArray[5],
      _frame = lineAsArray[6];

    // create a vertex and add information
    this.currentGraph.addNewVertex(_id, {
      form: _form,
      lemma: _lemma,
      pos: _pos,
      frame: _frame,
      pred: _pred === '+' ? true : false
    })

    // current word is top node
    if (_top === '+') {
      let value = this.currentGraph.vertexValue(_id);
      value['top'] = true;
      this.currentGraph.setVertex(_id, value);
      this.currentGraph.addNewEdge(_id, _id, 'top');
    }

    // the current node is a predicate
    if (_pred === '+') {
      this.currentPredicates.push(_id);
    }

    // going through the arguments and saving edges
    for (let i = 7, len = lineAsArray.length; i < len; i++) {
      if (lineAsArray[i] !== '_') {
        // subtract 7 to inline with predicate array
        this.fromPredicateToNode.push([i - 7, _id, lineAsArray[i]]);
        this.args.add(lineAsArray[i]);
      }
    }
  }


  /**
   * Add edges for each dependency
   */
  addEdges() {
    for (let i = 0, len = this.fromPredicateToNode.length; i < len; i++) {
      let from = this.currentPredicates[this.fromPredicateToNode[i][0]],
        to = this.fromPredicateToNode[i][1],
        value = this.fromPredicateToNode[i][2];
      this.currentGraph.addNewEdge(from + '', to + '', value);
    }
    // empty store
    this.fromPredicateToNode = [];
  }


  /**
   * Returns the computed graphs
   * @return {[type]} [description]
   */
  getGraphs() {
    return this.computedGraphs;
  }

  /**
   * Print a graph from the computed store
   * @param  { integer } which graph number in store
   * @return {[type]}       [description]
   */
  static printGraph(graph, which) {
    for (let [from, to, value] of graph[which].edges()) {
      console.log(from, to, value);
    }

    for (let [key, value] of graph[which].vertices()) {
      console.log(key, value);
    }
  }

  /**
   * Compare two graphs
   * Including and excluding top node
   * (Un)Labeled scores (nr of edges in system, output and common, LP, LR, LF, LM)
   * Complete predications
   * Semantic frames
   * Senses
   * @param  {Graph} g1 [graph1]
   * @param  {Graph} g2 [graph2]
   * @return {number}    [precision]
   */
  compareGraphsPrecisionRecallF1(gold, test) {
    let goldEdgeCount = gold.edgeCount();
    let testEdgeCount = test.edgeCount();
    let foundWithLabel = 0;
    let foundWithoutLabel = 0;
    let notFound = 0;
    for (let [from, to, value] of gold.edges()) {
      if (test.hasEdge(from, to)) {
        if (value === test.edgeValue(from, to)) {
          foundWithLabel += 1;
        } else {
          foundWithoutLabel += 1;
        }
      } else {
        notFound += 1;
      }
    }

    // labeled
    this.LP[0] += foundWithLabel;
    this.LP[1] += testEdgeCount;
    this.LR[0] += foundWithLabel;
    this.LR[1] += goldEdgeCount;

    // unlabeled
    this.UP[0] += foundWithLabel + foundWithoutLabel;
    this.UR[0] += foundWithLabel + foundWithoutLabel;

    // for (let [key, value] of g1.vertices()) {
    //   console.log(key, value);
    // }
    //
  }

  /**
   * Compare graph to gold standard
   * @param  { string } g [gold standard]
   * @param { string } name of graph
   * @return {[type]}   [undefind]
   */
  compareWith(g, name) {
    let gold = g.getGraphs();
    let test = this.getGraphs();
    for (var i = 0; i < gold.length; i++) {
      this.compareGraphsPrecisionRecallF1(gold[i], test[i]);
    }

    console.log('#### Scores for ' + name);
    this.printScores(true);
  }

  compareGraphsarg(gold, test, argType) {
    let goldEdgeCount = 0;
    let testEdgeCount = 0;
    let foundWithLabel = 0;
    let foundWithoutLabel = 0;
    let notFound = 0;

    for (let [from, to, value] of gold.edges()) {
      if (value === argType) {
        goldEdgeCount += 1;
        if (test.hasEdge(from, to)) {
          testEdgeCount += 1;
          if (value === test.edgeValue(from, to)) {
            foundWithLabel += 1;
          } else {
            foundWithoutLabel += 1;
          }
        } else {
          notFound += 1;
        }
      }
    }

    // labeled
    this.LP[0] += foundWithLabel;
    this.LP[1] += testEdgeCount;
    this.LR[0] += foundWithLabel;
    this.LR[1] += goldEdgeCount;
  }

  compareArg(g, name, argType) {
    let gold = g.getGraphs();
    let test = this.getGraphs();
    for (var i = 0; i < gold.length; i++) {
      this.compareGraphsarg(gold[i], test[i], argType);
    }

    console.log('#### Scores for ' + name);
    console.log('#### Looking at particular argument type ' + argType);
    this.printScores(false);
  }

  printScores(unlabeled) {
    // labeled scores:
    let LP = this.LP[0] / this.LP[1];
    let LR = this.LR[0] / this.LR[1];
    let LF1 = 2 * ((LP * LR) / (LP + LR));
    console.log('#### Labeled scores');
    console.log('LP: ' + LP);
    console.log('LR: ' + LR);
    console.log('LF: ' + LF1);

    // unlabeled scores:
    if (unlabeled) {
      let UP = this.UP[0] / this.LP[1];
      let UR = this.UR[0] / this.LR[1];
      let ULF1 = 2 * ((UP * UR) / (UP + UR));
      console.log('#### Unlabeled scores');
      console.log('LP: ' + UP);
      console.log('LR: ' + UR);
      console.log('LF: ' + ULF1);
    }
  }
}


export { Parser };
