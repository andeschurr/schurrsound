#!/bin/sh
# Bump the ?v= on site.css and site.js across every page.
# The whole site depends on one stylesheet, so a browser holding an old copy
# breaks every page at once rather than one component. Run this after any
# change to assets/site.css or assets/site.js, before committing.
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
for f in *.html notes/*.html wild-track/*.html; do
  [ "$f" = "wild-track/ep1-email.html" ] && continue
  sed -i '' -E "s#(href=\"/assets/site\.css)(\?v=[0-9]+)?\"#\1?v=$V\"#g; s#(src=\"/assets/site\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g" "$f"
done
echo "assets bumped to v=$V"
