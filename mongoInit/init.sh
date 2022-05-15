#!/bin/bash
mongoimport --host db --db Test --collection videos --type json --file /videos.json --jsonArray