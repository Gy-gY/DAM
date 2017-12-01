#!/bin/bash
npm run build
git add ../dist/*
git commit -m 'update dist'