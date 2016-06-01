#!/bin/bash

set -e

score="python3 score.py"

for team in In-House Lisbon Minsk Peking Riga Turku; do
    for language in en cs cz; do
	for setup in id ood; do
	    for track in closed gold open; do
		for format in dm pas psd; do
		    for run in 1 2; do
			for file in $team/$language.$setup.$track.$format.$run.sdp; do
			    if [ -f $file ]; then
				tgt=$(echo $file | sed s/.sdp$//).score
				if $score ../test/$language.$setup.$format.sdp $file representation=$format > $tgt 2>&1; then
				    echo "$tgt ... ok"
				else
				    echo "$tgt ... error"
				    exit 1
				fi
			    fi
			done
		    done
		done
	    done
	done
    done
done
