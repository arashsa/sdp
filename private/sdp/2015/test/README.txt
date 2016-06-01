
SemEval 2015 Task 18: Broad-Coverage Semantic Dependency Parsing: Test Data

Version 1.5; February 8, 2015


Overview
========

This directory contains the test data and companion syntactic analyses for Task
18 at SemEval 2015: Broad-Coverage Semantic Dependency Parsing.  For additional
instructions on preparing system outputs for evaluation, please consult the web
site for the task, and in particular:

  http://sdp.delph-in.net/2015/dates.html

Note that system outputs must be uploaded for evaluation within five days (or
120 hours) after retrieval of the test data (i.e. the time stamp of the first
download of the full archive).


General Information
===================

The English in-domain test data for the task draws on Section 21 of (the Penn
Treebank section of) the venerable Wall Street Journal (WSJ) Corpus.  Thus,
participants must make sure not to use any tools or resources that encompass
knowledge of gold-standard syntactic or semantic analyses of this data, i.e.
are directly or indirectly trained or otherwise derived from WSJ Section 21.

Systems participating in the ‘open’ track may use additional resources, such as
a syntactic parser.  Note however that the use of WSJ Section 21 as test data
implies that many parsers cannot be used off-the-shelf as they include this
data in their default training set-up.  To simplify participation, together
with the training data, we have released syntactic analyses from the parser of
Bohnet and Nivre (2012), re-trained without use of WSJ Section 21, as optional
‘companion’ data files.  The same range of companion analyses is available for
the test data.

English out-of-domain test data draws on parts of the (PTB annotation of) the
Brown Corpus, viz. the following samples: cf04, cf06, cf10, cf21, cg07, cg11,
cg21, cg25, cg32, cg35, ck11, ck17, cl05, cl14, cm04, cn03, cn10, cp15, cp26,
cr09.  Again, in the ‘open’ track participants must make sure that additional
resources used do not include any knowledge of these gold-standard annotations.

Finally, Chinese in-domain test data reflects the standard development section
from Release 7.0 of the Penn Chinese Treebank (CTB), and obviously the same
constraints apply for participation inthe ‘open’ track.

The purpose of the ‘gold’ track is to gauge the utility of different syntactic
analyses to the SDP task, and participants who submit to the ‘open’ track are
encouraged to re-run their systems with training and testing companions drawing
on the three different types of gold-standard syntactic dependencies available:

* DELPH-IN Derivation Tree–Derived Dependencies (DT): DeepBank
* Enju HPSG Dependencies (EH): Enju Treebank
* Stanford Basic Dependencies: Penn Treebank


Parser Inputs
=============

For English (EN), the archive contains in-domain (ID) and out-of-domain (OOD)
test data for all three target representations (DM, PAS, PSD):

* en.id.dm.tt (1410 sentences; 31948 tokens)
* en.id.pas.tt (1410 sentences; 31948 tokens)
* en.id.psd.tt (1410 sentences; 31948 tokens)
* en.ood.dm.tt (1849 sentences; 31583 tokens)
* en.ood.pas.tt (1849 sentences; 31583 tokens)
* en.ood.psd.tt (1849 sentences; 31583 tokens)

Also for Czech (CS), there is in-domain and out-of-domain test data for the PSD
representation.  For Chinese (CZ), we provide in-domain test data for the PAS
representation:

* cs.id.psd.tt (1670 sentences; 38397 tokens)
* cs.ood.psd.tt (5226 sentences; 87927 tokens)
* cz.id.pas.tt (8976 sentences; 214454 tokens)

All parser input files use the extension ‘.tt’ because they only provie the 
first four columns of the SDP tab-separated file format, viz.

  (1) running identifier
  (2) token surface form
  (3) format-specific lemma
  (4) PTB-style part of speech

It is expected that participating systems use the ‘.tt’ files as input files,
effectively adding to each non-empty line columns (5), (6), (7), and upwards.
Thus, system outputs must be submitted in the official SDP file format (and
using the common suffix ‘.sdp’), one file per target format, as documented
on-line:

  http://sdp.delph-in.net/2015/data.html

The three annotation formats have been aligned sentence- and token-wise, i.e.
they annotate the exact same text; however, there are differences in LEMMA and
POS fields.  Nevertheless, for each format the conventions used in these fields
are exactly the same as were used in the corresponding training data.


Companion Data
==============

For the ‘open’ and ‘gold’ tracks, the archive contains the same range of
companion syntactic analyses as are provided for the training data: DELPH-IN
Derivation Tree-Derived Dependencies (DT), Enju HPSG dependencies (EH), and
Stanford Basic Dependencies (SB).

* open/en.id.sb.bn.cpn
* open/en.ood.sb.bn.cpn

* gold/en.id.dt.deepbank.cpn
* gold/en.id.eh.enju.cpn
* gold/en.id.sb.ptb.cpn
* gold/en.ood.dt.deepbank.cpn
* gold/en.ood.eh.enju.cpn
* gold/en.ood.sb.ptb.cpn
* gold/cz.id.eh.enju.cpn

The only difference in the ‘open’ companion test data provided as part of this
archive (when compared to the syntactic companions for the SDP training data)
is the training data used: our companion syntactic analyses for the SDP test
data result from parsing the pre-tokenized text with parser models trained on
the complete set of sentences from WSJ Sections 00–20 used as training data in
the SDP context.


Known Errors
============

None, for the time being.


Release History
===============

[Version 1.5; February 8, 2015]

+ actually preserve original (non-gold) TAG value in those DM ‘.tt’ files.

[Version 1.4; January 24, 2015]

+ Remove (spurious) empty graphs in Chinese and Czech ‘.sdp’ and ‘.tt’ files;

+ add missing (empty) SENSE column (for SDP 2015 format) to ‘cz.id.pas.sdp’;

+ force TAG values in English DM graphs (but not ‘.tt’ files) to gold standard.

[Version 1.3; January 17, 2015]

+ Re-release of all test data, now including gold-standard semantic graphs.

[Version 1.2; January 07, 2015]

+ Add missing header (‘#SDP 2015’) as first line of Chinese PAS test data.

[Version 1.1; January 07, 2015]

+ Remove spurious trailing tabulator characters on comment lines (with ‘#’).

[Version 1.0; January 04, 2015]

+ Initial release of test and companion data in three formats: DM, PAS, and PSD.


Contact
=======

For questions or comments, please do not hesitate to email the task organizers
at: ‘sdp-organizers@emmtee.net’.

Dan Flickinger
Jan Hajič
Marco Kuhlmann
Angelina Ivanova
Yusuke Miyao
Stephan Oepen
Daniel Zeman
