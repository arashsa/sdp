
SemEval 2015 Task 18: Broad-Coverage Semantic Dependency Parsing: Training Data

Version 1.1; November 20, 2014


Overview
========

This directory contains five files, each providing semantic dependency graphs
for training sets of (a) 35657 English sentences (802717 tokens), taken from
the venerable PTB WSJ Corpus, for all target representations (DM, PAS, PSD);
(b) 31113 Chinese sentences (649036 tokens), taken from Release 7.0 of the Penn
Chinese Treebank, for the PAS target representation; and (c) 42076 Czech
sentences (985302 tokens), taken from Version 2.0 of the Prague Czech–English
Dependency Treebank, for the PSD target representation.  All files employ the
SDP 2015 tab-separated format for the description of general directed graphs,
as documented on-line:

  http://sdp.delph-in.net/2015/data.html

Please note that the SDP 2015 format differs from the one used on conjunction
with SemEval 2014 (the first SDP task), in that one additional column has been
added: SENSE (field #7) records semantic sense information for DM and PSD.  To
allow scripts to distinguish the 2014 and 2015 formats, current data indicates
the file format using a ‘comment’ line at the start of the file, i.e.

  #SDP 2015

The three target representations for English have been aligned sentence- and
token-wise, i.e. they annotate the exact same text; there are differences,
however, in the LEMMA and POS fields.

File names are comprised of a two-letter ISO 639-1 language code, an acronym
denoting the specific annotation type, and the common suffix ‘.sdp’ (which we
will use on all data for this task).


Recommended Split
=================

If for system development you want to designate part of the training material
as a development set, we strongly recommend using Section 20 for this purpose.
For the Chinese data, we make no recommdation for how to split.


Known Errors
============

+ Sense identifiers in DM still expose some theory-internal distinctions.


Release History
===============

[Version 1.1; November 20, 2014]

+ Inclusion of new multi-lingual training data: Chinese PAS and Czech PSD;
+ update of DM data, now building on forthcoming release of DeepBank 1.1;
+ revised and improved treatment of contracted (negated) auxiliaries in DM;
+ revised analysis of comparatives, introducing a new ‘than’ dependency type;
+ streamlined sense identifiers in DM, dropping native vs. generic distinction.
+ update of conversion from PCEDT to PSD, now including #Cor (control) links.

[Version 1.0; August 3, 2014]

+ Initial release of the training data for three representations: DM, PAS, PSD.


Contact
=======

For questions or comments, please do not hesitate to email the task organizers
at: ‘sdp-organizers@emmtee.net’.

Dan Flickinger
Jan Hajič
Angelina Ivanova
Marco Kuhlmann
Yusuke Miyao
Stephan Oepen
Daniel Zeman
